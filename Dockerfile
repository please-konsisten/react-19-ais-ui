ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps
RUN chown -R node:node .
USER node

# =============================== #
FROM base as development

ENV NODE_ENV=development
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

