FROM node:18.16.0-alpine as builder
RUN mkdir /cooking-together
WORKDIR /cooking-together
COPY . .
RUN npm install
RUN npm run build
RUN npm ci --production --force

FROM node:18.16.0-alpine
RUN mkdir /cooking-together
WORKDIR /cooking-together
COPY --from=builder /cooking-together/.next ./.next
COPY .env ./build/.env
COPY package.json package.json
ENV NODE_ENV production
RUN npm install --only-production --force
EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]