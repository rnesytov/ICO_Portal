# Generated by Django 2.0.6 on 2018-07-11 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_office', '0005_auto_20180625_1411'),
    ]

    operations = [
        migrations.AddField(
            model_name='investor',
            name='first_name',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='investor',
            name='last_name',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]
