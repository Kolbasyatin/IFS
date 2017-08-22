#!/bin/bash
docker exec -i mds-php-fpm /var/www/mds/bin/console "$@"

