# Parent
FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

# Build
RUN npm run clean
RUN npm run build

# If you are building your code for production
RUN npm ci --only=production

ENV PORT=3000
ENV ENV=production

EXPOSE 3000

CMD [ "npm", "run", "server:prod" ]