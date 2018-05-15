from functools import partial
from django.db import models


KYC_STATE_CHOICES = (('WAITING', 'Waiting for approval'),
                     ('DECLINED', 'Declined'),
                     ('APPROVED', 'Approved'))

KYC_DOC_TYPE_CHOICES = (('ID', 'ID'),
                        ('Passport', 'Passport'),
                        ('DriveLicence', 'Driver Licence'),
                        ('Other', 'Other'))


def kyc_photo_path(prefix, instance, filename):
    return f'kyc/{instance.investor.id}/{prefix}/{filename}'


class KYC(models.Model):
    id = models.AutoField(primary_key=True)
    investor = models.OneToOneField('Investor', on_delete=models.CASCADE,
                                    related_name='kyc')
    state = models.CharField(max_length=10, choices=KYC_STATE_CHOICES,
                             default='WAITING')

    firstname = models.CharField(max_length=30)
    midname = models.CharField(max_length=30, blank=True, null=True)
    surname = models.CharField(max_length=30)

    country = models.CharField(max_length=30)
    birthdate = models.DateField()

    document_no = models.CharField(max_length=50)
    document_type = models.CharField(max_length=50, choices=KYC_DOC_TYPE_CHOICES)
    photo = models.ImageField(upload_to=partial(kyc_photo_path, 'photo'))
    selfie = models.ImageField(upload_to=partial(kyc_photo_path, 'selfie'))

    decline_reason = models.TextField(blank=True, null=True)
    approve_txn_hash = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        ordering = ['id']
        db_table = 'kyc'

        verbose_name = 'KYC'
        verbose_name_plural = 'KYCs'

    def __str__(self):
        return f'KYC for {self.firstname} {self.midname} {self.surname}'

    @property
    def approved(self):
        return self.state == 'APPROVED'

    @property
    def waiting(self):
        return self.state == 'WAITING'

    def decline(self):
        self.state = 'DECLINED'
