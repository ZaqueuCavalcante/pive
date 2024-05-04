FROM nginx:alpine
COPY 00Polar /usr/share/nginx/html/00Polar
COPY 01Spherical /usr/share/nginx/html/01Spherical
COPY 02Donut /usr/share/nginx/html