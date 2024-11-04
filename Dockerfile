FROM node:20-alpine as base

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY tsconfig.json ./
COPY ./src ./src
RUN yarn compile

FROM node:20-alpine as production

WORKDIR /usr/prod/app

ENV NODE_ENV=production

COPY package.json yarn.lock ecosystem.config.json ./

RUN yarn install --production --pure-lockfile

COPY --from=base /usr/src/app/dist ./dist

USER node

CMD ["yarn", "start"]