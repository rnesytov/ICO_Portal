from web3.utils.filters import LogFilter
from web3.utils.events import get_event_data

from ico_portal.utils.datetime import datetime
from .base import BaseContract


class TokenContract(BaseContract):
    abi = '[{"constant": true, "inputs": [], "name":"totalSupply", "outputs":[{"name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}, ' \
          '{"anonymous": false, "inputs": [{"indexed": true, "name": "from", "type": "address"}, {"indexed": true, "name": "to", "type": "address"}, ' \
          '{"indexed": false, "name": "value", "type": "uint256"}], "name": "Transfer", "type": "event"}]'

    def get_total_supply(self):
        return self.contract.functions.totalSupply().call()

    def get_filter(self, from_block, to_block=None):
        return self.contract.events.Transfer.createFilter(fromBlock=from_block, toBlock=to_block)

    @property
    def transfer_abi(self):
        return self.contract.events.Transfer._get_event_abi()


class TransferEvent:
    def __init__(self, entry):
        self.from_account = entry['args']['from']
        self.to_account = entry['args']['to']
        self.amount = entry['args']['value']
        self.txn_hash = entry['transactionHash'].hex()
        self.contract_address = entry['address']
        self.block_hash = entry['blockHash'].hex()
        self.block_number = entry['blockNumber']
        self.accepted_at = datetime.utcnow()
        self.removed = entry.get('removed', False)

    def __str__(self):
        return f'Transfer event at {self.txn_hash}'

    __repr__ = __str__


class TransfersFilter(LogFilter):
    def log_entry_formatter(self, entry):
        data = get_event_data(TokenContract().transfer_abi, entry)

        return TransferEvent(data)
