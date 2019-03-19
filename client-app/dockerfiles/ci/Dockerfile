FROM node:11

RUN apt-get update \
  && apt-get -y install \
          apt-transport-https \
          apt-utils \
          build-essential \
          curl \
          git-core \
          libssl-dev \
          libreadline-dev \
          libcurl4-openssl-dev \
          libxml2-dev \
          libxslt-dev \
          locales \
          zlib1g \
          zlib1g-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/*

# Install Java
RUN echo "deb http://ftp.debian.org/debian jessie-backports main" >> /etc/apt/sources.list.d/backports.list \
  && apt-get update \
  && apt-get install -t jessie-backports -y \
          ca-certificates-java \
          openjdk-8-jre-headless \
  && rm /etc/apt/sources.list.d/backports.list \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/*

# Install chrome
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update \
  && apt-get -y install google-chrome-stable \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/*
ENV CHROME_BIN /usr/bin/google-chrome-stable

RUN DEBIAN_FRONTEND=noninteractive dpkg-reconfigure locales && \
    locale-gen C.UTF-8 && \
    /usr/sbin/update-locale LANG=C.UTF-8
RUN echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen && locale-gen

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

# https://github.com/SeleniumHQ/docker-selenium/issues/87
ENV DBUS_SESSION_BUS_ADDRESS /dev/null

WORKDIR /app

COPY client-app/package.json ./
COPY client-app/yarn.lock ./

RUN mkdir ~/.ssh \
  && test "$(ssh-keyscan -t rsa github.com | ssh-keygen -lf -)" = "2048 SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8 github.com (RSA)" \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

ARG SSH_KEY

RUN echo "$SSH_KEY" > ~/.ssh/id_rsa \
  && chmod 600 ~/.ssh/id_rsa \
  && eval "$(ssh-agent -s)" \
  && ssh-add ~/.ssh/id_rsa \
  && yarn install --frozen-lockfile \
  && rm ~/.ssh/id_rsa

COPY client-app .
