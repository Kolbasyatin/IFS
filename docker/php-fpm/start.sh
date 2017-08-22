#!/bin/sh
#/var/www/mbh/bin/console rabbitmq-supervisor:rebuild
setfacl -R -m u:"www-data":rwX /var/www/mds/var
setfacl -dR -m u:"www-data":rwX /var/www/mds/var
exec /usr/sbin/php-fpm7.1 -F
