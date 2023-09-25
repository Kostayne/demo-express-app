FROM node:18-alpine as base
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .

FROM base as test
CMD ["npm", "run", "test"]

FROM base as runner
RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3015