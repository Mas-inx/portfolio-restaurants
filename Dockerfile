FROM node:20-alpine AS builder
WORKDIR /app
COPY sites/ ./sites/

# Build each site — continue on error
RUN for site in $(ls /app/sites); do \
      echo "=== Building $site ==="; \
      cd /app/sites/$site; \
      npm install 2>/dev/null; \
      npm run build 2>/dev/null; \
      rm -rf node_modules; \
      echo "=== $site done ==="; \
      cd /app; \
    done

# Organize dist folders into proper subdirectory structure for nginx
RUN mkdir -p /app/output && \
    for site in $(ls /app/sites); do \
      if [ -d "/app/sites/$site/dist" ]; then \
        echo "Packaging $site..."; \
        mkdir -p /app/output/$site && \
        cp -r /app/sites/$site/dist/* /app/output/$site/; \
      else \
        echo "WARNING: $site has no dist, creating placeholder"; \
        mkdir -p /app/output/$site && \
        echo "<html><body><h1>$site — Build Failed</h1></body></html>" > /app/output/$site/index.html; \
      fi; \
    done

FROM nginx:alpine
COPY --from=builder /app/output/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
HEALTHCHECK CMD curl -f http://localhost:80/ || exit 1
