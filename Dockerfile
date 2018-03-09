FROM node:8

# Development packages
RUN apt-get update;

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3220
CMD [ "npm", "start" ]
