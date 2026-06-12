# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts ./
COPY index.html ./
COPY src/ ./src/
COPY public/ ./public/
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html/olive-grain
COPY nginx.conf /etc/nginx/conf.d/default.conf
HEALTHCHECK CMD curl -f http://localhost:80/olive-grain/ || exit 1
