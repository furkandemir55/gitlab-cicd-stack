FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . ./

ARG PUBLIC_URL
ARG REACT_APP_HOST_URL
ARG REACT_APP_API_URL

RUN npm run build

CMD ["npm", "run", "serve"]
