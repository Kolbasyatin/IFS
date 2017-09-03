FROM phpdockerio/php71-fpm:latest

# Install selected extensions and other stuff
RUN apt-get update && apt-get -y install apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -

RUN apt-get update
RUN apt-get -y --no-install-recommends install phpunit php7.1-mcrypt php7.1-apcu php7.1-bcmath php7.1-memcached php7.1-memcache php7.1-mongodb php7.1-sqlite3 php7.1-gd \
    php7.1-gmp php7.1-igbinary php7.1-imagick php7.1-imap php7.1-intl php7.1-mbstring php7.1-odbc \
    php7.1-phpdbg php7.1-soap php7.1-ssh2 php7.1-xdebug php7.1-xmlrpc php7.1-xsl php7.1-mysql php7.1-pgsql php7.1-zmq php7.1-amqp libevent-dev acl\
    nodejs git supervisor yarn wget;
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin && mv /usr/local/bin/composer.phar /usr/local/bin/composer && \
    php -r "unlink('composer-setup.php');"

RUN wget https://phar.phpunit.de/phpunit-6.3.phar && chmod +x phpunit-6.3.phar && mv phpunit-6.3.phar /usr/bin/phpunit

CMD ["/bin/bash", "/start.sh"]

WORKDIR "/var/www/mds"