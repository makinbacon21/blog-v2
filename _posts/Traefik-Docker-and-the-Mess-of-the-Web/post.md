---
layout: post
title: 'Traefik, Docker, and the Mess of the Web'
date: 2022-05-19 05:08:03
categories:
- Projects
tags:
- linux
- ubuntu
- server
- traefik
- web
- nginx
- gitlab
cover: /post/Traefik-Docker-and-the-Mess-of-the-Web/cover.jpg
---

## Introduction

We've come a long way from the start of the World Wide Web. What we've come to know as "Web2" was based on the idea that every client would also act as a server--that is, that we would host our personal content AND interact with others' content, all over the hyper-text transfer protocol. Now, with the migration of online computing from the business and computer scientist to the ordinary consumer, Web2 has become a centralized system in what was intended to be a decentralized world. We connect to big companies' servers without much connection to our own stuff, as serving is for the IT techs, companies, and specialists, while the lowly clients consume the content. However, there comes a time in an open-source software dev's life when the time comes to self-host services.

## Why serve?

Different people have different reasons to set up a Web server. My server's genesis, as regular readers will know, came from an Android build server that I set up to accelerate my build process for Switchroot testing builds while not interrupting my main computers' workflows. At some point, I realized I wanted to self-host some stuff for myself. GitLab was my first targeted service--a fellow LineageOS dev has everything for producing Lineage for mainstream Tegra devices on a self-hosted instance, and I figured just for kicks (and faster `repo sync`s to itself) that I'd set up a staging area for Switchroot Android on my server. More services like Nextcloud would follow. I decided it was time to set up a reverse proxy with various Dockerized services to fit all my needs in a portable and easily-configurable way (If any of those terms sound foreign, read on).

## What is Docker?

Some of you may know about Docker already--for those who don't, I'll provide the basic explanation I gave to my girlfriend when she asked. GNU/Linux is distributed in *distributions*, because apps for Linux use versioned, shared dependency packages. `glibc` is probably the best example--`glibc` is the basic GNU C libraray, housing various important and basic functions that almost every Linux program references. Instead of every app providing dynamically linked versions of the libraries (what Windows does), each app just references the glibc package. Seems simple, right?

Unfortunately, packages like `glibc` are updated constantly. Features are added, bugs are fixed, and people change things for no apparent reason (*cough* the Python organization). If someone updates `glibc` and breaks functionality that an application uses, then what? Random failure? No. Linux distributions only inlcude specific versions of packages in their repositories. If you're on Ubuntu 22.04, for example, and `apt update`, you won't see anything from `glibc` past 2.35 from their official repos. This may be the latest version, but it won't always be. If a distribution uses an older version of `glibc` to maintain compatibility, they'll get important and non-breaking fixes backported to the version they're on. This eliminates any compatability issue when on the same distribution release, and upgrading is left up to the users.

![Docker](/post/Traefik-Docker-and-the-Mess-of-the-Web/docker.jpg)

Infographic of how Docker Works--[Source](https://www.docker.com/resources/what-container/)

However, we've now reached a couple new problems. What if you want to be able to upgrade distros so you have the latest security patches, but your services aren't necessarily compatible with new releases? What if you want to be able to easily set up a dev environment with the exact packages you need? What if you want to be able to switch distributions and maintain service compatability? How could you run an old distribution in a capacity that doesn't affect security? And how do we make sure environments are identical across computers? Enter containerization. Containers allow you to house a mini-version of the distro of your choice, isolated from your system. It can be an old distro version for compatability, and since it is limited in how it communicated with other containers, your computer, and the Internet, the old security patches aren't a big deal. Through Docker, a containerization provider, you can set up specific images and configuration steps that get applied when the container is built so the environment is exactly the same everywhere.

With Docker Compose, you can define images, configuration, environment variables, networks (virtual Docker networks that isolate their connectivity), and volumes (pieces of your host filesystem that you mount in the container) for various services, all in an easily readable YAML format. This makes setup, configuration, and managemenmt a breeze. From here, you can easily link a container housing a service to a container housing a Web server, allowing the service to communicate with the Internet all on its own, isolated from your host's stack.

## What is Traefik and Reverse Proxy?

You might wonder how DNS resolution works if each container has its own Web server. For example, how does `thomasmk.in` point to the blog container while `gitlab.thomasmak.in` points to my GitLab instance? The answer is reverse proxy. A parent Web server (in my case Traefik) proxies connections from various DNS records to different containers, each unaware of the others' existence. It's fairly simple in theory but in practice can be a pain. Traefik uses an easy TOML configuration setup for configuring everything, and with its Docker provider can read labels applied to each Docker container on the system and auto-sets up a reverse proxy for each.

![Traefik](/post/Traefik-Docker-and-the-Mess-of-the-Web/traefik.png)

Infographic of how Traefik Works--[Source](https://doc.traefik.io/traefik/)

## My Setup

Routers (Ports):

```md
                                                                          /-- GitLab (:80)
(:443)     (:443 -> :8443)        (:8443)         (:8443 -> :443)        /--- GitLab Regitry (:80)
HTTPS   ->     Router       ->     Server  ->  Traefik Docker Container  ---- Blog (:443)
                                                                         \--- Traefik Admin (:443)
                                                                          \-- Nextcloud (:443)
```

Note on the above: another device uses :443 so I proxy :443 (standard SSL port) to :8443 and then the Traefik container's port setup proxies :8443 back to :443 internally.

Containers have different internal port setups, as do computers and routers, so the HTTPS connection is bounced around a bit. Each container contains its own Web server. My configs (stripped of important details) are below.

## Configs

### Traefik

docker-compose.yml:

```yml
version: "3.9"

services:
  traefik:
    image: "traefik:v2.6"
    restart: always
    container_name: "traefik"
    ports:
      - "80:80"
      - "8443:443"
    volumes:
      - "./traefik.toml:/traefik.toml"
      - "./traefik_secure.toml:/traefik_secure.toml"
      - "./acme.json:/acme.json"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
    networks:
      - web

networks:
  web:
    name: web
    external: true
```

traefik.toml

```toml
[tracing]
    serviceName = "gitlab-svc@docker"

[accessLog]

[entryPoints]
  [entryPoints.web]
    address = ":80"     # HTTP standard port
    [entryPoints.web.http.redirections.entryPoint]  # Redirect http to https
      to = "websecure"
      scheme = "https"
  [entryPoints.websecure]
    address = ":443"    # HTTPS standard port   
  [entryPoints.ssh]
    address = ":22"     # SSH standard port
  [entryPoint.registry]
    address=":8500"     # GitLab Registry port

[api]
  dashboard = true  # Enable Traefik Dashboard

[certificatesResolvers.lets-encrypt.acme]   # Enable TLS via letsencrypt
  email = "<email>"
  storage = "acme.json"
  [certificatesResolvers.lets-encrypt.acme.tlsChallenge]

[providers.docker]
  exposedByDefault = false
  watch = true
  network = "web"
  endpoint = "unix:///var/run/docker.sock"

[providers.file]
  filename = "traefik_secure.toml"  # SSL etc.
  watch = true
```

traefik_secure.toml

```toml
# Follow Traefik's instructions for simple auth for dash


[http.middlewares.my-plugin-log4shell]
  [http.middlewares.my-plugin-log4shell.plugin]
    [http.middlewares.my-plugin-log4shell.plugin.plugin-log4shell]
      errorCode = "200"

[http.routers.api]
  rule = "Host(`traefik.$URL`)"
  entrypoints = ["websecure"]
  middlewares = ["simpleAuth"]
  service = "api@internal"
  [http.routers.api.tls]
    certResolver = "lets-encrypt"
```

### GitLab

docker-compose.yml

```yml
version: "3.6"
services:
  gitlab:
    container_name: gitlab
    hostname: 'gitlab.$URL'
    image: 'gitlab/gitlab-ce:latest'
    restart: always
    #ports:
    #  - "2222:22"
    environment:
      GITLAB_OMNIBUS_CONFIG: |
        external_url "https://gitlab.thomasmak.in/"
        nginx['listen_https'] = false
        nginx['listen_port'] = 80
        nginx['proxy_set_headers'] = {
          "X-Forwarded-Proto" => "https",
          "X-Forwarded-Ssl" => "on"
        }
        # INSERT SMTP CONFIG HERE--SEE GITLAB DOCUMENTATION
    labels:
      - 'traefik.enable=true'
      - 'traefik.docker.network=web'
      - 'traefik.port=80'
      - 'traefik.http.routers.gitlab.entrypoints=websecure'
      - 'traefik.http.routers.gitlab.rule=Host(`gitlab.$URL`)'
      - 'traefik.http.routers.gitlab.tls=true'
      - 'traefik.http.routers.gitlab.service=gitlab-svc'
      - 'traefik.http.services.gitlab-svc.loadbalancer.server.port=80'
      # Headers
      - 'traefik.http.routers.gitlab.middlewares=gitlab-headers'
      - 'traefik.http.middlewares.gitlab-headers.headers.customrequestheaders.X_FORWARDED_PROTO=https'
      - 'traefik.http.middlewares.gitlab-headers.headers.customrequestheaders.X_Forwarded-Ssl=on'
      - 'traefik.http.middlewares.gitlab-headers.headers.customresponseheaders.X_FORWARDED_PROTO=https'
      - 'traefik.http.middlewares.gitlab-headers.headers.customresponseheaders.X_Forwarded-Ssl=on'
      # Registry
      - 'traefik.http.routers.gitlab-registry.rule=Host(`gitlab-registry.$URL`)'
      - 'traefik.http.routers.gitlab-registry.entrypoints=websecure'
      - 'traefik.http.routers.gitlab-registry.tls.certresolver=lets-encrypt'
      - 'traefik.http.routers.gitlab-registry.service=gitlab-registry'
      - 'traefik.http.services.gitlab-registry.loadbalancer.server.port=8500'
      # SSH
      - 'traefik.tcp.routers.gitlab-ssh.entrypoints=ssh'
      - 'traefik.tcp.routers.gitlab-ssh.rule=HostSNI(`*`)'
      - 'traefik.tcp.routers.gitlab-ssh.service=gitlab-ssh-svc'
      - 'traefik.tcp.services.gitlab-ssh-svc.loadbalancer.server.port=22'
    volumes:
      - ./volumes/config:/etc/gitlab
      - ./volumes/logs:/var/log/gitlab
      - ./volumes/data:/var/opt/gitlab
    networks:
      - web
      - gitlab-network
  gitlab-runner:
    image: gitlab/gitlab-runner:latest
    container_name: gitlab-runner
    volumes:
      - ./volumes/runner/config/:/etc/gitlab-runner:Z
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - gitlab-network
    labels:
      - traefik.enable=false
networks:
  web:
    name: web
    external: true
  gitlab-network:
    name: gitlab-network
    external: false
```

### Nextcloud

docker-compose.yml

```yml
version: '3'

services:
  db:
    image: mariadb:10.5
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    restart: always
    volumes:
      - db:/var/lib/mysql
    env_file:
      - db.env
    networks:
      - nextcloud

  redis:
    image: redis:alpine
    restart: always
    networks:
      - nextcloud

  app:
    image: nextcloud:fpm-alpine
    restart: always
    volumes:
      - nextcloud:/var/www/html
    environment:
      - MYSQL_HOST=db
      - REDIS_HOST=redis
      # I think those can just go in the env file but whatever
    env_file:
      - db.env
    depends_on:
      - db
      - redis
    networks:
      - nextcloud

  web:
    # Build from Dockerfile in ./web
    build: ./web
    restart: always
    labels:
      - 'traefik.enable=true'
      - 'traefik.docker.network=web'
      - 'traefik.port=80'
      - 'traefik.http.routers.nextcloud.entrypoints=websecure'
      - 'traefik.http.routers.nextcloud.rule=Host(`nextcloud.$URL`)'
      - "traefik.http.routers.nextcloud.tls=true"
      - "traefik.http.routers.nextcloud.tls.certresolver=lets-encrypt"
      # Deal with nextcloud's bs in a middlewar
      - "traefik.http.routers.nextcloud.middlewares=nextcloud-dav"
      - "traefik.http.middlewares.nextcloud-dav.replacepathregex.regex=^/.well-known/ca(l|rd)dav"
      - "traefik.http.middlewares.nextcloud-dav.replacepathregex.replacement=/remote.php/dav/"
      - 'traefik.http.routers.nextcloud.service=nextcloud-svc'
      - 'traefik.http.services.nextcloud-svc.loadbalancer.server.port=80'
    networks:
      - nextcloud
      - web
    volumes:
      - nextcloud:/var/www/html:ro
    depends_on:
      - app

  cron:
    image: nextcloud:fpm-alpine
    restart: always
    volumes:
      - nextcloud:/var/www/html
    entrypoint: /cron.sh
    depends_on:
      - db
      - redis
    networks:
      - nextcloud

volumes:
  db:
  nextcloud:

networks:
  web:
    name: web
    external: true

  nextcloud:
    name: nextcloud
    external: false
```

db.env

```env
MYSQL_PASSWORD=$PASSWORD
MYSQL_DATABASE=nextcloud
MYSQL_USER=$USERNAME
```

web/Dockerfile

```Dockerfile
# Really this could all be crammed into the docker-compose file
# and the conf should be volume mounted
# but whatever i copied this anyway
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
```

web/nginx.conf

```conf
worker_processes auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    upstream php-handler {
        server app:9000;
    }

    server {
        listen 80;

        # HSTS settings
        # WARNING: Only add the preload option once you read about
        # the consequences in https://hstspreload.org/. This option
        # will add the domain to a hardcoded list that is shipped
        # in all major browsers and getting removed from this list
        # could take several months.
        #add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload;" always;

        # set max upload size
        client_max_body_size 512M;
        fastcgi_buffers 64 4K;

        # Enable gzip but do not remove ETag headers
        gzip on;
        gzip_vary on;
        gzip_comp_level 4;
        gzip_min_length 256;
        gzip_proxied expired no-cache no-store private no_last_modified no_etag auth;
        gzip_types application/atom+xml application/javascript application/json application/ld+json application/manifest+json application/rss+xml application/vnd.geo+json application/vnd.ms-fontobject application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/bmp image/svg+xml image/x-icon text/cache-manifest text/css text/plain text/vcard text/vnd.rim.location.xloc text/vtt text/x-component text/x-cross-domain-policy;

        # Pagespeed is not supported by Nextcloud, so if your server is built
        # with the `ngx_pagespeed` module, uncomment this line to disable it.
        #pagespeed off;

        # HTTP response headers borrowed from Nextcloud `.htaccess`
        add_header Referrer-Policy                      "no-referrer"   always;
        add_header X-Content-Type-Options               "nosniff"       always;
        add_header X-Download-Options                   "noopen"        always;
        add_header X-Frame-Options                      "SAMEORIGIN"    always;
        add_header X-Permitted-Cross-Domain-Policies    "none"          always;
        add_header X-Robots-Tag                         "none"          always;
        add_header X-XSS-Protection                     "1; mode=block" always;

        # MODIFIED
        add_header X-Forwarded-Proto                    "https"         always;
        add_header X-Forwarded-Ssl                      "on"            always;
        # Remove X-Powered-By, which is an information leak
        fastcgi_hide_header X-Powered-By;

        # Path to the root of your installation
        root /var/www/html;

        # Specify how to handle directories -- specifying `/index.php$request_uri`
        # here as the fallback means that Nginx always exhibits the desired behaviour
        # when a client requests a path that corresponds to a directory that exists
        # on the server. In particular, if that directory contains an index.php file,
        # that file is correctly served; if it doesn't, then the request is passed to
        # the front-end controller. This consistent behaviour means that we don't need
        # to specify custom rules for certain paths (e.g. images and other assets,
        # `/updater`, `/ocm-provider`, `/ocs-provider`), and thus
        # `try_files $uri $uri/ /index.php$request_uri`
        # always provides the desired behaviour.
        index index.php index.html /index.php$request_uri;

        # Rule borrowed from `.htaccess` to handle Microsoft DAV clients
        location = / {
            if ( $http_user_agent ~ ^DavClnt ) {
                return 302 /remote.php/webdav/$is_args$args;
            }
        }

        location = /robots.txt {
            allow all;
            log_not_found off;
            access_log off;
        }

        # Make a regex exception for `/.well-known` so that clients can still
        # access it despite the existence of the regex rule
        # `location ~ /(\.|autotest|...)` which would otherwise handle requests
        # for `/.well-known`.
        location ^~ /.well-known {
            # The rules in this block are an adaptation of the rules
            # in `.htaccess` that concern `/.well-known`.

            location = /.well-known/carddav { return 301 /remote.php/dav/; }
            location = /.well-known/caldav  { return 301 /remote.php/dav/; }

            location /.well-known/acme-challenge    { try_files $uri $uri/ =404; }
            location /.well-known/pki-validation    { try_files $uri $uri/ =404; }

            # Let Nextcloud's API for `/.well-known` URIs handle all other
            # requests by passing them to the front-end controller.
            return 301 /index.php$request_uri;
        }

        # Rules borrowed from `.htaccess` to hide certain paths from clients
        location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)(?:$|/)  { return 404; }
        location ~ ^/(?:\.|autotest|occ|issue|indie|db_|console)                { return 404; }

        # Ensure this block, which passes PHP files to the PHP process, is above the blocks
        # which handle static assets (as seen below). If this block is not declared first,
        # then Nginx will encounter an infinite rewriting loop when it prepends `/index.php`
        # to the URI, resulting in a HTTP 500 error response.
        location ~ \.php(?:$|/) {
            # Required for legacy support
            rewrite ^/(?!index|remote|public|cron|core\/ajax\/update|status|ocs\/v[12]|updater\/.+|oc[ms]-provider\/.+|.+\/richdocumentscode\/proxy) /index.php$request_uri;

            fastcgi_split_path_info ^(.+?\.php)(/.*)$;
            set $path_info $fastcgi_path_info;

            try_files $fastcgi_script_name =404;

            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param PATH_INFO $path_info;
            #fastcgi_param HTTPS on;

            fastcgi_param modHeadersAvailable true;         # Avoid sending the security headers twice
            fastcgi_param front_controller_active true;     # Enable pretty urls
            fastcgi_pass php-handler;

            fastcgi_intercept_errors on;
            fastcgi_request_buffering off;
        }

        location ~ \.(?:css|js|svg|gif)$ {
            try_files $uri /index.php$request_uri;
            expires 6M;         # Cache-Control policy borrowed from `.htaccess`
            access_log off;     # Optional: Don't log access to assets
        }

        location ~ \.woff2?$ {
            try_files $uri /index.php$request_uri;
            expires 7d;         # Cache-Control policy borrowed from `.htaccess`
            access_log off;     # Optional: Don't log access to assets
        }

        # Rule borrowed from `.htaccess`
        location /remote {
            return 301 /remote.php$request_uri;
        }

        location / {
            try_files $uri $uri/ /index.php$request_uri;
        }
    }
}
```

### Hexo Blog (webpack)

docker-compose.yml

```yml
version: "3.6"
services:
  hexo:
    container_name: blog
    hostname: '$URL'
    image: 'spurin/hexo:latest'
    restart: always
    environment:
      - HEXO_SERVER_PORT=80
    labels:
      - 'traefik.enable=true'
      - 'traefik.docker.network=web'
      - 'traefik.port=80'
      - 'traefik.http.routers.hexo.entrypoints=websecure'
      - 'traefik.http.routers.hexo.rule=Host(`$URL`)'
      - 'traefik.http.routers.hexo.tls=true'
      - 'traefik.http.routers.hexo.tls.certresolver=lets-encrypt'
      - 'traefik.http.routers.hexo.service=hexo-svc'
      - 'traefik.http.services.hexo-svc.loadbalancer.server.port=80'
    volumes:
      - ./app:/app
      # Dump blog code in the ./app subfolder
    networks:
      - internal
      - web
networks:
  web:
    name: web
    external: true
  internal:
    name: internal
    external: false
```
