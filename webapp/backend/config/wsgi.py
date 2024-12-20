"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import sys, site

from django.core.wsgi import get_wsgi_application
from django.conf import settings

sys.path.append("/code/backend/config")
sys.path.append("/code/backend/config/settings/")

# os.environ["DJANGO_SETTINGS_MODULE"] = "config.settings"

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

# settings.configure(DEBUG=True)

# application = CONFIGAPP(application)

application = get_wsgi_application()
