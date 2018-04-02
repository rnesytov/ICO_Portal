from shutil import rmtree
from django.conf import settings
from datetime import datetime

from django.core.files.uploadedfile import SimpleUploadedFile
from .helpers.fixture import fixture_path
from .base import APITestCase


class TestKYC(APITestCase):
    def setUp(self):
        super().setUp()

        rmtree(settings.MEDIA_ROOT, ignore_errors=True)

    def test_create_kyc(self):
        expected = {'firstname': 'John',
                    'midname': None,
                    'surname': 'Doe',
                    'birthdate': '1990-01-01',
                    'document_no': '123123',
                    'country': 'Russia',
                    'photo': f'http://testserver/media/kyc/{self._investor_id}/photo/photo.jpg',
                    'selfie': f'http://testserver/media/kyc/{self._investor_id}/selfie/selfie.jpg'
        }

        with open(fixture_path('photo.jpg'), 'rb') as photo, \
             open(fixture_path('selfie.jpg'), 'rb') as selfie:
            response = self.client.post('/api/kyc/', {
                'firstname': 'John',
                'surname': 'Doe',
                'birthdate': '1990-01-01',
                'document_no': 123123,
                'country': 'Russia',
                'photo': photo,
                'selfie': selfie
            }, format='multipart')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data, expected)

    def test_get_created_kyc(self):
        expected = {'state': 'WAITING',
                    'firstname': 'John',
                    'midname': None,
                    'surname': 'Doe',
                    'birthdate': '1990-01-01',
                    'document_no': '123123',
                    'country': 'Russia',
                    'photo': f'http://testserver/media/kyc/{self._investor_id}/photo/photo.jpg',
                    'selfie': f'http://testserver/media/kyc/{self._investor_id}/selfie/selfie.jpg'
        }

        with open(fixture_path('photo.jpg'), 'rb') as photo, \
             open(fixture_path('selfie.jpg'), 'rb') as selfie:
            response = self.client.post('/api/kyc/', {
                'firstname': 'John',
                'surname': 'Doe',
                'birthdate': '1990-01-01',
                'document_no': 123123,
                'country': 'Russia',
                'photo': photo,
                'selfie': selfie
            }, format='multipart')

        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, expected)

    def test_get_not_created_kyc(self):
        response = self.client.get('/api/kyc/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {})
