# Stage 1: Build
FROM node:20-alpine as build


WORKDIR /root

COPY package.json ./
RUN yarn install

COPY . .

CMD ["yarn", "run", "nx", "build", "cms"]

# Stage 2: Serve with nginx
FROM ubuntu:latest
RUN apt-get update && apt-get install -y nginx
COPY --from=build /root/apps/cms/dist /var/www/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
