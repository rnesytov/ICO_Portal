# Generated by Django 2.0.7 on 2018-07-21 16:22

from django.db import migrations, models
import user_office.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('user_office', '0006_auto_20180720_1201'),
    ]

    operations = [
        migrations.RenameField(
            model_name='transfer',
            old_name='mint_txn_id',
            new_name='buy_txn_id',
        ),
        migrations.AddField(
            model_name='payment',
            name='bonus_ids',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='payment',
            name='bonus_percent',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='payment',
            name='rate_usdc',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=65),
        ),
        migrations.AlterField(
            model_name='tokensmove',
            name='amount',
            field=user_office.models.fields.TokenField(blank=True, decimal_places=0, max_digits=65, null=True),
        ),
    ]
