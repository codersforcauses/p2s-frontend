# build stage
FROM node:11-alpine as build-stage
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install --silent
COPY . .
ARG host
ENV VUE_APP_HOST=${host}
ARG port
ENV VUE_APP_PORT=${port}
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
RUN mkdir /frontend
COPY --from=build-stage /frontend/dist /frontend
COPY nginx.conf /etc/nginx/nginx.conf