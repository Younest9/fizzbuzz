FROM frolvlad/alpine-glibc:latest

# Install Chrome and tini
USER root
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" > /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/v3.12/main" >> /etc/apk/repositories \
    && apk add \
    libstdc++ \
    chromium \
    harfbuzz \
    nss \
    freetype \
    wqy-zenhei \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

# Install dockerize (Make TCP connections to remote hosts from within Docker containers)
ENV DOCKERIZE_VERSION v0.7.0
ENV DOCKERIZE_ARCH amd64
ENV DOCKERIZE_PACKAGE dockerize-linux-${DOCKERIZE_ARCH}-${DOCKERIZE_VERSION}.tar.gz
ENV DOCKERIZE_RELEASE ${DOCKERIZE_VERSION}/${DOCKERIZE_PACKAGE}

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_RELEASE \
    && tar -C /usr/local/bin -xzvf $DOCKERIZE_PACKAGE \
    && rm $DOCKERIZE_PACKAGE

# Playwright
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/ \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# Install node, tini
USER root
RUN apk add --no-cache tini nodejs nodejs-npm

# Add node user
RUN mkdir -p /app \
    && adduser -D node \
    && chown -R node:node /app

# App
USER node
WORKDIR /app

COPY --chown=node package.json ./
RUN npm i
COPY --chown=node . .

VOLUME [ "/app" ]

RUN mkdir -p /app/screenshots \
    && chown -R node:node /app/screenshots

# Copy the entrypoint
COPY --chown=node docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "index.js"]
