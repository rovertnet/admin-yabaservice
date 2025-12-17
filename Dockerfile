# 1. Builder l'app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 2. Servir les fichiers avec Nginx
FROM nginx:alpine

# Copie du build vers nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Configuration par défaut de Nginx pour SPA
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
