# Generated by Django 4.1.7 on 2023-03-24 10:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_mainword_table_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mainword',
            name='lastRepeat',
        ),
        migrations.RemoveField(
            model_name='mainword',
            name='nextRepeat',
        ),
    ]
