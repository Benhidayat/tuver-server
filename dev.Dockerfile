FROM node:24-alpine

EXPOSE 3000

WORKDIR /usr/src/app

COPY --chown=node:node package*.json .

RUN npm ci

COPY --chown=node:node . .

CMD ["npm", "run", "dev"]