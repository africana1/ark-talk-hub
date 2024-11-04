FROM node:20-alpine as base

WORKDIR /usr/src/app

# Copy only necessary files to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --pure-lockfile

# Copy Prisma schema and related files
COPY ./src/modules/prisma ./src/modules/prisma

# Generate Prisma client
RUN yarn prisma:generate

# Copy source files and compile TypeScript to JavaScript
COPY tsconfig.json ./
COPY ./src ./src
RUN yarn compile

FROM node:20-alpine as production

WORKDIR /usr/prod/app

ENV NODE_ENV=production

COPY package.json yarn.lock ecosystem.config.json ./

RUN yarn install --production --pure-lockfile


COPY --from=base /usr/src/app/dist ./dist

# Use a non-root user for security purposes
USER node

EXPOSE 5500

# Start the application
CMD ["yarn", "start"]