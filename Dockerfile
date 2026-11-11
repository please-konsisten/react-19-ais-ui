ARG NODE_VERSION=26
ARG NGINX_VERSION=stable-alpine

# =============================== #
# base: dipakai untuk build lokal (compose) dan stage build production
FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
RUN chown -R node:node .
USER node

# =============================== #
FROM base AS build

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY --chown=node:node . .
RUN npm run build