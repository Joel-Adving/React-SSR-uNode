FROM node:18 AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm i
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000

CMD ["node", "dist/index.js"]