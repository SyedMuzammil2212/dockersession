FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .
RUN npm run build

WORKDIR /server
RUN npm install serve

FROM gcr.io/distroless/nodejs22-debian12:nonroot

WORKDIR /app

ENV NO_UPDATE_CHECK=1

COPY --from=build /app/dist ./dist
COPY --from=build /server/node_modules ./node_modules


EXPOSE 3000

CMD ["node_modules/serve/build/main.js", "-s", "dist", "-l", "3000", "--no-clipboard"]
