FROM node:20 AS development

WORKDIR  /usr/src/apps

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production 
FROM node:20 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR  /usr/src/apps

COPY package*.json ./

RUN npm install --only=production

COPY . .

# COPY --from=development /app/dist ./dist

CMD ["node", "dist/apps/app2/src/main"]