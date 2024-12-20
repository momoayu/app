from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sys',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'mysqldb',
        'PORT': '3306',
        'ATOMIC_REQUESTS': True
    }
}
