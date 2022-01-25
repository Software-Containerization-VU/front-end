FROM node:16 as builder-container
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder-container /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]