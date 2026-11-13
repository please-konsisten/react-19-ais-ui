ARG NODE_VERSION=26
ARG NGINX_VERSION=stable-alpine

FROM node:${NODE_VERSION}-slim AS deps
WORKDIR /app
COPY package.json ./
RUN npm i --legacy-peer-deps

FROM deps AS builder
ARG BUILD_MODE=development
ARG VITE_APP_API
ENV VITE_APP_API=${VITE_APP_API} \
NODE_OPTIONS=--max-old-space-size=1024
COPY . .
RUN npm run build -- --mode ${BUILD_MODE}

FROM nginx:${NGINX_VERSION} AS serve
COPY docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1