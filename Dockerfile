FROM node:slim

WORKDIR /app

COPY package*.json /app/
COPY ./ /app/
RUN npm install \
    && npm run build

FROM gcr.io/distroless/nodejs18-debian11

COPY --from=0 /app /app
WORKDIR /app

EXPOSE 3000

CMD ["/app/node_modules/next/dist/bin/next", "start"]