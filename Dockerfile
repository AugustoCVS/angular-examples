FROM node:21 AS builder
WORKDIR /app
COPY . . 
RUN npm install
RUN ng build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/angular-examples/browser usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]