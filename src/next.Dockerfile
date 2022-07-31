FROM node:16

WORKDIR /src

COPY package*.json yarn.lock ./

RUN yarn install

COPY . /src

EXPOSE 3000

CMD ["yarn", "run", "dev"]
