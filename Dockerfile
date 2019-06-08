FROM gitlab.e1c.net:4567/platform/base-images/nginx:1

COPY conf/ $NGINX_PREFIX/conf/
COPY dist/ $NGINX_PREFIX/html/
