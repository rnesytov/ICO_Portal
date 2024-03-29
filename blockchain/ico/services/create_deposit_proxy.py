from blockchain.ico.contracts import DepositProxy
from .create_transaction import CreateTransaction
from ico_portal.utils.service_object import ServiceObject, service_call


class CreateDepositProxy(ServiceObject):
    def create_txn_data(self, context):
        txn_data = DepositProxy.deploy_for_investor(
            investor_address=context.investor.eth_account
        )

        return self.success(txn_data=txn_data)

    def create_transaction(self, context):
        return CreateTransaction()(context.txn_data, txn_type='CREATE_PROXY') | \
            (lambda result: self.success(txn=result.txn))

    @service_call
    def __call__(self, investor):
        return self.success(investor=investor) | \
            self.create_txn_data | \
            self.create_transaction
