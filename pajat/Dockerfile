FROM node:10

ARG BASE_PATH
ENV BASE_PATH=$BASE_PATH

# Setup
WORKDIR /usr/src/app

COPY package* ./
RUN npm ci
COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]
