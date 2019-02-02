FROM node:8

# Development packages
RUN apt-get update;

# Create app directory
WORKDIR /usr/src/app

# Create a user (picking one that also will work with the freeradius container)
# RUN groupadd -r freerad -g 101
RUN useradd -b /etc/freeradius -d /etc/freeradius -s /usr/sbin/nologin -u 101 -g 101 freerad 

RUN ln -s /usr/src/app/freeradius/3.0 /etc/freeradius

# Install app dependencies
COPY package.json .

# Bundle app source
COPY . .

RUN chown -R freerad /usr/src/app

EXPOSE 3230

USER freerad

RUN npm install

CMD [ "npm", "start" ]
