FROM node:alpine AS builder

WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

COPY package.json ./


RUN npm install --silent 

COPY . ./

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 3002