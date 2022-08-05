FROM node:lts-alpine as builder
WORKDIR /usr/src/app

COPY web/package.json web/yarn.lock ./web/
RUN cd web && yarn install

COPY . ./
RUN cd web && yarn build

RUN adduser -D static

FROM joseluisq/static-web-server:2

COPY --from=builder /etc/passwd /etc/passwd
USER static

COPY --from=builder /usr/src/app/web/dist/ /public/

EXPOSE 3000
ENV SERVER_FALLBACK_PAGE=/public/404.html
ENV SERVER_PORT=3000