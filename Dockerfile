FROM node:20-alpine AS builder
WORKDIR /app
COPY sites/ ./sites/

# Build each site — continue on error so one failing site doesn't kill the entire build
RUN for site in $(ls /app/sites); do \
      echo "=== Building $site ===" && \
      cd /app/sites/$site && \
      npm install 2>/dev/null && \
      npm run build 2>/dev/null && \
      rm -rf node_modules && \
      echo "=== $site OK ===" || \
      echo "=== $site FAILED (skipping) ==="; \
      cd /app; \
    done

FROM nginx:alpine
COPY --from=builder /app/sites/*/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
HEALTHCHECK CMD curl -f http://localhost:80/_/ || exit 1
