# ---------- BUILD STAGE ----------
FROM node:22-alpine AS build
WORKDIR /app

# Vite inlines environment variables at build time
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- SERVE STAGE ----------
FROM nginx:1.27-alpine
# Copy custom Nginx config and the built static files
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

