FROM node:12.14.1

WORKDIR /usr/src/app

COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

COPY . .

EXPOSE 3500

CMD [ "npm", "start" ]