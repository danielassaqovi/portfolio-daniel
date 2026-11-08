# Stage 1: build situs Astro menjadi HTML statis
FROM node:22-alpine AS build

WORKDIR /app

# Dependency dulu supaya layer cache npm tetap dipakai selama package.json tidak berubah.
COPY package.json package-lock.json ./
RUN npm ci

# Salin sisa proyek lalu build ke /app/dist
COPY . .
RUN npm run build

# Stage 2: sajikan hasil build dengan nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
