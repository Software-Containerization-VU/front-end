FROM node:16 as builder-container
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.19.0
COPY --from=builder-container /app/build .
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf