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

COPY --chown=node:node . .

EXPOSE 5173
EXPOSE 3000

CMD ["sh", "-c", "npx json-server ./public/db.json & npm run dev -- --host"]
