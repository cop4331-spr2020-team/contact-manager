FROM node:12.14.1

# set working directory
WORKDIR /home/node/app/frontend/

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

# Go to frontend source
WORKDIR /home/node/app/frontend/src/

# start app
CMD ["npm", "start"]