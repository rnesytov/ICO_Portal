# Generated by Django 2.0.7 on 2018-07-17 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_office', '0006_auto_20180711_1710'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='usdc_value',
            field=models.DecimalField(decimal_places=0, default=0, max_digits=65),
        ),
    ]
