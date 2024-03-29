from django.db import models

from ico_portal.utils.datetime import datetime


class EventsProcessing(models.Model):
    id = models.AutoField(primary_key=True)
    filter_id = models.CharField(max_length=100)

    from_block = models.IntegerField()
    last_processed_block = models.IntegerField(null=True, blank=True)

    last_update_at = models.DateTimeField(default=datetime.utcnow)

    from_contract = models.CharField(max_length=50, null=True, blank=True)

    objects = models.Manager()

    class Meta:
        db_table = 'events_processing'

    def __str__(self):
        return f'ICO info for date {self.last_update_at}'
