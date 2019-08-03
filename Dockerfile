# Parent
FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY src /usr/src/app/src

RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "./dist/app.js" ]