# Build stage — build all 5 restaurant sites
FROM node:20-alpine AS builder
WORKDIR /app

# Copy all site source files
COPY sites/ ./sites/

# Build each site
RUN for site in restaurant-1 fireline-burgers olive-grain kairo-sushi harvest-room; do \
      cd /app/sites/$site && \
      npm ci --ignore-engines && \
      npm run build && \
      rm -rf node_modules; \
    done

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/sites/restaurant-1/dist /usr/share/nginx/html/restaurant-1
COPY --from=builder /app/sites/fireline-burgers/dist /usr/share/nginx/html/fireline-burgers
COPY --from=builder /app/sites/olive-grain/dist /usr/share/nginx/html/olive-grain
COPY --from=builder /app/sites/kairo-sushi/dist /usr/share/nginx/html/kairo-sushi
COPY --from=builder /app/sites/harvest-room/dist /usr/share/nginx/html/harvest-room
COPY nginx.conf /etc/nginx/conf.d/default.conf
HEALTHCHECK CMD curl -f http://localhost:80/restaurant-1/ || exit 1
