# Generated by Django 2.0.9 on 2018-12-20 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_office', '0022_auto_20181218_2000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='currency',
            field=models.CharField(max_length=10),
        ),
    ]