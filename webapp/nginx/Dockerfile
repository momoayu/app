FROM nginx:1.25.3-alpine3.18
 
# timezone setting
RUN apk --update add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*
 
# install packages
RUN apk update && \
    apk upgrade && \
    apk add --update --no-cache \
    bash \
    nginx \
    sudo \
    tzdata \
    vim
 
EXPOSE 80