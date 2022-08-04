FROM node:lts-alpine as builder
WORKDIR /usr/src/app

COPY web/package.json web/yarn.lock ./web/
RUN cd web && yarn install

COPY . ./
RUN cd web && yarn build

FROM lipanski/docker-static-website:latest
COPY --from=builder /usr/src/app/web/dist ./