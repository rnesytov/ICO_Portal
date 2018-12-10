from .development import *

MEDIA_ROOT = '/tmp/ico_portal_test_media/'

# INSTALLED_APPS += ('behave_django',)

DEBUG = True

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        }
}

RECAPTCHA_DATA_SITEKEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
RECAPTCHA_SECRET = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe'

WEB3_RPC_URL = 'https://rinkeby.infura.io/froCrQaR0EB1JP83hAjj'

CROWDSALE_CONTRACT = {
    'address': '0x198a3D74F6c15C54Ae52818642CE2e93dE5150CD',
}
TOKEN_CONTRACT = {
    'address': '0xDf86D26bD790fBae51A3C3abf07f77D6DC691A19',
}
PRICE_ORACLE = {
    'address': '0x42ac0F356c84928258483631b740584E343B80b7',
    'sensivity': 3  # percents
}
DAI_CONTRACT = {
    'address': '0x5265968c25D1F89788dca53c137a962F312AD4A8'
}

CURRENCIES = {
    'ethereum': {
        'module': 'ethereum',
        'code': 'ETH',
        'name': 'Ethereum',
        'rpc_url': WEB3_RPC_URL,
    },
    'litecoin': {
        'module': 'coinpayments',
        'code': 'LTC',
        'name': 'Litecoin',
        'merchant': '69d94a11a25bc1245847e2c5175cd254',
        'ipn_secret': 'q123q123q123',
        'public_key': '3eaf230a98bd62a69305f1d06ca50f69095be5d23bef32c06b328eb0f134129f',
        'private_key': '87cbfc69BAB5fbdC910e9080b363d63352fc4fAdcDad46280b80767537849e24'
    },
    'dogecoin': {
        'module': 'coinpayments',
        'code': 'DOGE',
        'name': 'Dogecoin',
        'merchant': '69d94a11a25bc1245847e2c5175cd254',
        'ipn_secret': 'q123q123q123',
        'public_key': '3eaf230a98bd62a69305f1d06ca50f69095be5d23bef32c06b328eb0f134129f',
        'private_key': '87cbfc69BAB5fbdC910e9080b363d63352fc4fAdcDad46280b80767537849e24'
    },
    'bitcoin': {
        'module': 'cpg',
        'code': 'BTC',
        'name': 'Bitcoin',
        'cpg_url': 'http://cpg_host:8080',
        'api_key': 'KBMwMKJ748JH5v0CTHJ71Q',
        'secret': '5ET4lEfvKLHcWOo3DyWgJodPFZG9udptq8cDzgyYPaFWILZOEWV+FjvQ60jVsCBoIzkz//Tp99joFo0S0cF1ig',
        'decimals': 8
    },
    'DAI': {
        'module': 'DAI',
        'code': 'DAI',
        'name': 'DAI',
        'receiver_address': '0x42ac0F356c84928258483631b740584E343B80b7',
        'rate_usdc': 100,
        'contract': {
            'address': '0x5265968c25D1F89788dca53c137a962F312AD4A8',
            'decimals': 18
        }
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'simple': {
            'format': '%(levelname)s [%(asctime)s] %(name)s %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
    },
    'loggers': {
        'evm': {
            'handlers': [],
            'propagate': False
        },
        'web3': {
            'handlers': [],
            'propagate': False
        }
    }
}

CELERY_TASK_ALWAYS_EAGER = True
