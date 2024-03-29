from .auth import KYCAndLoginPermission
from rest_framework.views import APIView
from rest_framework.response import Response

from blockchain.currencies import Currencies
from ico_portal.utils.logger import LoggerMixin


class GetAvailableCurrencies(APIView, LoggerMixin):
    """
    Return list of available cryptocurrencies
    """

    permission_classes = (KYCAndLoginPermission,)

    def get(self, request, *args, **kwargs):
        return Response(
            [
                {"code": c.code,
                 "name": c.name,
                 "contract_address": c.contract_address,
                 "rate": c.exchange_rate}
                for c in Currencies.get_currencies()
            ]
        )
