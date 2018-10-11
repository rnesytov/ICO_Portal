# Generated by Django 2.0.6 on 2018-10-04 00:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_office', '0016_transaction_txn_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventsprocessing',
            name='from_contract',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='kyc',
            name='state',
            field=models.CharField(choices=[('WAITING', 'Waiting for approval'), ('MINING', 'Waiting to be mined'), ('DECLINED', 'Declined'), ('APPROVED', 'Approved')], default='WAITING', max_length=10),
        ),
    ]
