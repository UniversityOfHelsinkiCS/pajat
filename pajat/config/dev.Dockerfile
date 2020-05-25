FROM node:10

# Setup
WORKDIR /usr/src/app

COPY package* ./
RUN npm ci
COPY . .

EXPOSE 8000

CMD ["npm", "run", "start:dev"]