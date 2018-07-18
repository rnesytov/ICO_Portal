from django.db import models
from django.db.models.query import QuerySet
from django.db.models.manager import BaseManager

from ico_portal.utils.datetime import datetime
from .fields import CurrencyField


class ExchangeRateQuerySet(QuerySet):
    def get_rate_by_currency(self, currency):
        return self.filter(currency=currency.upper()).last()


class ExchangeRate(models.Model):
    id = models.AutoField(primary_key=True)
    currency = CurrencyField()
    creation_date = models.DateTimeField(default=datetime.utcnow)
    rate = models.DecimalField(max_digits=32, decimal_places=2)
    rate_cents = models.DecimalField(max_digits=32, decimal_places=0)
    timestamp = models.PositiveIntegerField()

    objects = BaseManager.from_queryset(ExchangeRateQuerySet)()

    class Meta:
        ordering = ['creation_date']
        db_table = 'exchange_rates'

    def __str__(self):
        return f'Exchange rate for {self.currency} {self.rate} USD'
