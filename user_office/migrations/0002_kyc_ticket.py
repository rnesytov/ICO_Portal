# Generated by Django 2.0.9 on 2019-01-21 14:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('helpdesk', '0018_auto_20190121_1429'),
        ('user_office', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='kyc',
            name='ticket',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='kyc', to='helpdesk.Ticket'),
        ),
    ]
