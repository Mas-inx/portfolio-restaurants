# Build stage — build all 30 portfolio sites
FROM node:20-alpine AS builder
WORKDIR /app
COPY sites/ ./sites/

# Build each site
RUN for site in \
  restaurant-1 fireline-burgers olive-grain kairo-sushi harvest-room \
  verdant-studio yardcrew stone-bloom desertline greenline-commercial \
  forgebuilt haven-renovations steelspan rapidroof terraform-civil \
  lumina-clinic pulsepoint align-motion serenity-dental carebridge \
  arcticline heatwave-emergency ecobreeze ductpro pureair \
  atelier-estates nestfirst urbangrid keystone-property stayvista; do \
    cd /app/sites/$site && \
    npm ci --ignore-engines && \
    npm run build && \
    rm -rf node_modules; \
    cd /app; \
  done

# Serve stage
FROM nginx:alpine

# Copy all 30 dist folders
RUN for dir in \
  restaurant-1 fireline-burgers olive-grain kairo-sushi harvest-room \
  verdant-studio yardcrew stone-bloom desertline greenline-commercial \
  forgebuilt haven-renovations steelspan rapidroof terraform-civil \
  lumina-clinic pulsepoint align-motion serenity-dental carebridge \
  arcticline heatwave-emergency ecobreeze ductpro pureair \
  atelier-estates nestfirst urbangrid keystone-property stayvista; do \
    mkdir -p /usr/share/nginx/html/$dir; \
  done

COPY --from=builder /app/sites/restaurant-1/dist /usr/share/nginx/html/restaurant-1
COPY --from=builder /app/sites/fireline-burgers/dist /usr/share/nginx/html/fireline-burgers
COPY --from=builder /app/sites/olive-grain/dist /usr/share/nginx/html/olive-grain
COPY --from=builder /app/sites/kairo-sushi/dist /usr/share/nginx/html/kairo-sushi
COPY --from=builder /app/sites/harvest-room/dist /usr/share/nginx/html/harvest-room
COPY --from=builder /app/sites/verdant-studio/dist /usr/share/nginx/html/verdant-studio
COPY --from=builder /app/sites/yardcrew/dist /usr/share/nginx/html/yardcrew
COPY --from=builder /app/sites/stone-bloom/dist /usr/share/nginx/html/stone-bloom
COPY --from=builder /app/sites/desertline/dist /usr/share/nginx/html/desertline
COPY --from=builder /app/sites/greenline-commercial/dist /usr/share/nginx/html/greenline-commercial
COPY --from=builder /app/sites/forgebuilt/dist /usr/share/nginx/html/forgebuilt
COPY --from=builder /app/sites/haven-renovations/dist /usr/share/nginx/html/haven-renovations
COPY --from=builder /app/sites/steelspan/dist /usr/share/nginx/html/steelspan
COPY --from=builder /app/sites/rapidroof/dist /usr/share/nginx/html/rapidroof
COPY --from=builder /app/sites/terraform-civil/dist /usr/share/nginx/html/terraform-civil
COPY --from=builder /app/sites/lumina-clinic/dist /usr/share/nginx/html/lumina-clinic
COPY --from=builder /app/sites/pulsepoint/dist /usr/share/nginx/html/pulsepoint
COPY --from=builder /app/sites/align-motion/dist /usr/share/nginx/html/align-motion
COPY --from=builder /app/sites/serenity-dental/dist /usr/share/nginx/html/serenity-dental
COPY --from=builder /app/sites/carebridge/dist /usr/share/nginx/html/carebridge
COPY --from=builder /app/sites/arcticline/dist /usr/share/nginx/html/arcticline
COPY --from=builder /app/sites/heatwave-emergency/dist /usr/share/nginx/html/heatwave-emergency
COPY --from=builder /app/sites/ecobreeze/dist /usr/share/nginx/html/ecobreeze
COPY --from=builder /app/sites/ductpro/dist /usr/share/nginx/html/ductpro
COPY --from=builder /app/sites/pureair/dist /usr/share/nginx/html/pureair
COPY --from=builder /app/sites/atelier-estates/dist /usr/share/nginx/html/atelier-estates
COPY --from=builder /app/sites/nestfirst/dist /usr/share/nginx/html/nestfirst
COPY --from=builder /app/sites/urbangrid/dist /usr/share/nginx/html/urbangrid
COPY --from=builder /app/sites/keystone-property/dist /usr/share/nginx/html/keystone-property
COPY --from=builder /app/sites/stayvista/dist /usr/share/nginx/html/stayvista

COPY nginx.conf /etc/nginx/conf.d/default.conf
HEALTHCHECK CMD curl -f http://localhost:80/restaurant-1/ || exit 1
