# Generated by Django 2.0.7 on 2018-11-12 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_office', '0017_auto_20181004_0024'),
    ]

    operations = [
        migrations.AddField(
            model_name='kyc',
            name='middlename',
            field=models.CharField(blank=True, max_length=30, null=True, verbose_name='Middle Name'),
        ),
    ]