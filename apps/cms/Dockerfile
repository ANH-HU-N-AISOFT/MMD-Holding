FROM node:20-alpine
WORKDIR /cms

COPY package.json ./
RUN yarn install
COPY . .

CMD ["yarn", "run", "nx", "serve-static", "cms", "--skip-nx-cache"]
