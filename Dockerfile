FROM node:lts-slim AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm i --frozen-lockfile --production=false
COPY . .
RUN npm run build

FROM node:lts-slim
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

ENV NODE_ENV="production"
EXPOSE 3000

CMD ["node", "dist/index.js"]