from oslash import Right, Left
from decimal import Decimal
from uuid import UUID

from ..base import BlockChainTestCase
from blockchain.currencies.DAI.contract import DAIContract
from blockchain.currencies.DAI.services.get_dai_transfers import GetDAITransfers
from blockchain.currencies.DAI.services.process_dai_transfer import ProcessDAITransfer
from blockchain.currencies import Currencies
from blockchain.ico.services.get_events import FilterNotFound
from user_office.models import (
    Transfer,
    Payment,
    Transaction,
    TokensMove
)
from user_office.factories import InvestorFactory


class DAIBlockchainTestCase(BlockChainTestCase):
    setup_eth_tester = True
    constructor_arg = '4441490000000000000000000000000000000000000000000000000000000000'

    @classmethod
    def _setup_dai(cls):
        dai = cls.web3.eth.contract(abi=DAIContract.get_compiled()['abi'],
                                    bytecode=DAIContract.get_compiled()['bin'])
        tx_hash = dai.constructor(cls.constructor_arg).transact({'from': cls.account['address']})
        tx_receipt = cls.web3.eth.getTransactionReceipt(tx_hash)
        cls.dai = cls.web3.eth.contract(address=tx_receipt.contractAddress,
                                        abi=DAIContract.get_compiled()['abi'])
        DAIContract.init({'address': cls.dai.address})

    def push_tokens(self, to, amount):
        return self.dai.functions.push(to, amount).transact({
            'from': self.account['address'],
        }).hex()

    def mint_tokens(self, to, amount):
        return self.dai.functions.mint(to, amount).transact({
            'from': self.account['address'],
        }).hex()

    @property
    def currencie_settings(self):
        return Currencies.get_currency('DAI')

    @property
    def receiver_address(self):
        return self.currencie_settings.receiver_address


class TestingGetDAITransfers(GetDAITransfers):
    def get_new_entries(self, context):
        try:
            return self.success(entries=context.events_filter.get_new_entries())
        except ValueError as e:
            return self.fail_with(FilterNotFound('Filter not found'))
        except Exception as e:
            return self.fail(f'Error while getting new entries {e}')


class DAIGetTransfersTestCase(DAIBlockchainTestCase):
    setup_contracts = ['dai']

    def test_events_getting(self):
        self.mint_tokens(self.account['address'], 10 * 10 ** 18)

        self.push_tokens(self.receiver_address, 5 * 10 ** 18)
        self.push_tokens(self.receiver_address, 5 * 10 ** 18)

        result = GetDAITransfers(self.currencie_settings)()
        self.assertIsInstance(result, Right)

        entries = result.value.entries
        self.assertEqual(len(entries), 2)

        for event in result.value.entries:
            self.assertEqual(event.amount, 5 * 10 ** 18)
            self.assertEqual(event.to_account, self.receiver_address)

    def test_same_filter_using(self):
        self.mint_tokens(self.account['address'], 9 * 10 ** 18)

        result = GetDAITransfers(self.currencie_settings)()
        filter_id_1 = result.value.events_filter.filter_id

        result = GetDAITransfers(self.currencie_settings)()
        filter_id_2 = result.value.events_filter.filter_id

        self.assertEqual(filter_id_1, filter_id_2)

    def test_max_block_getting(self):
        last_block_number_node = self.eth_tester.get_block_by_number('latest')["number"]
        result = GetDAITransfers(self.currencie_settings)()

        last_block_number_db = result.value.events_processing.last_processed_block

        self.assertEqual(last_block_number_db, last_block_number_node)

    def test_filter_recreating(self):
        self.mint_tokens(self.account['address'], 9 * 10 ** 18)
        self.push_tokens(self.receiver_address, 5 * 10 ** 18)

        result = GetDAITransfers(self.currencie_settings)()
        filter_id_1 = result.value.events_filter.filter_id
        self.eth_tester.delete_filter(1)

        result = TestingGetDAITransfers(self.currencie_settings)()
        self.assertIsInstance(result, Right)
        filter_id_2 = result.value.events_filter.filter_id

        self.assertNotEqual(filter_id_1, filter_id_2)


class DAIProcessingTestCase(DAIBlockchainTestCase):
    setup_contracts = ['price_oracle', 'token', 'crowdsale', 'dai']

    def test_successful_processing(self):
        sender_account = self.account['address']
        investor = InvestorFactory(eth_account=sender_account)

        self.mint_tokens(sender_account, 9 * 10 ** 18)

        self.push_tokens(self.receiver_address, 5 * 10 ** 18)

        result = GetDAITransfers(self.currencie_settings)()
        entries = result.value.entries

        self.assertEqual(len(entries), 1)

        result = ProcessDAITransfer(self.currencie_settings)(entries[0])

        self.assertIsInstance(result, Right)

        transactions = Transaction.objects.all()
        self.assertEqual(transactions.count(), 1)

        transaction = transactions.first()

        self.assertIsNone(transaction.nonce)
        self.assertEqual(transaction.value, Decimal('0'))
        self.assertIsNone(transaction.from_account)
        self.assertEqual(transaction.to_account, self.crowdsale_contract.address)
        self.assertEqual(transaction.gas, 150000)
        self.assertIsNone(transaction.gas_price)
        self.assertIsNone(transaction.txn_hash)
        self.assertEqual(transaction.state, 'PREPARED')
        self.assertIsNone(transaction.fail_reason)
        self.assertEqual(transaction.created_at, self.utcnow)
        self.assertIsInstance(transaction.txn_id, UUID)

        transfers = Transfer.objects.all()
        self.assertEqual(transfers.count(), 1)

        transfer = transfers.first()
        self.assertEqual(transfer.state, 'PREPARED')
        self.assertEqual(transfer.buy_txn_id, transaction.txn_id)

        tokens_moves = TokensMove.objects.all()
        self.assertEqual(tokens_moves.count(), 1)

        tokens_move = tokens_moves.first()
        self.assertEqual(tokens_move.investor, investor)
        self.assertIsNone(tokens_move.amount)
        self.assertEqual(tokens_move.transfer, transfer)
        self.assertEqual(tokens_move.state, 'PREPARED')
        self.assertEqual(tokens_move.direction, 'IN')

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)

        payment = payments.first()
        self.assertEqual(payment.currency, 'DAI')
        self.assertEqual(payment.amount, Decimal('5'))
        self.assertEqual(payment.amounti, Decimal(int(5 * 10 ** 18)))
        self.assertEqual(payment.txn_id, str(result.value.event.txn_hash))
        self.assertEqual(payment.received_at, self.utcnow)
        self.assertEqual(payment.tokens_move, tokens_move)
        self.assertEqual(payment.usdc_value, Decimal('500'))
        self.assertEqual(payment.rate_usdc, Decimal('100'))
        self.assertIsNone(payment.bonus_percent)
        self.assertIsNone(payment.bonus_ids)

    def test_same_payment_processing(self):
        sender_account = self.account['address']
        investor = InvestorFactory(eth_account=sender_account)  # noqa: F841

        self.mint_tokens(sender_account, 9 * 10 ** 18)

        self.push_tokens(self.receiver_address, 5 * 10 ** 18)

        result = GetDAITransfers(self.currencie_settings)()
        entries = result.value.entries

        self.assertEqual(len(entries), 1)

        result = ProcessDAITransfer(self.currencie_settings)(entries[0])

        self.assertIsInstance(result, Right)

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)

        result = ProcessDAITransfer(self.currencie_settings)(entries[0])
        self.assertIsInstance(result, Left)

        payments = Payment.objects.all()
        self.assertEqual(payments.count(), 1)
