#Stage 1 - React App
FROM node:16 as builder-container
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
ARG configuration=production
RUN npm run build -- --outputPath=./dist/out --configuration $configuration

#Stage2 = build final image and copy files for nginx
FROM nginx:1.19.0
COPY --from=builder-container /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]