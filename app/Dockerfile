FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . ./

ARG REACT_APP_BASE_URL
ARG REACT_APP_PROJECT_ENV
ARG REACT_APP_API_URL
ARG PUBLIC_URL
ARG REACT_APP_HOST_URL
ARG REACT_APP_SUB_PATH


RUN npm run build


FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /app-build

