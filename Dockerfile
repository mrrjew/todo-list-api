FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build



FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install --production

COPY --from=build /app/dist ./dist

CMD [ "node", "/dist/main" ]