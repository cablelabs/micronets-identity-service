FROM node:8

# Development packages
RUN apt-get update;

# Create app directory
WORKDIR /usr/src/app

# Create a user (picking one that also will work with the freeradius container)
# Note: UID has to match since the volume permissions are all UID/GID-based
RUN useradd -b /etc/freeradius -d /etc/freeradius -s /usr/sbin/nologin -u 101 -g 101 freerad 

# The ID service expects /etc/freeradius to exist (even though freeradius doesn't run in this container)
RUN ln -s /usr/src/app/freeradius/3.0 /etc/freeradius

# Bundle app source
COPY . .

# Setup ownership of files
RUN chown -R freerad /usr/src/app

EXPOSE 3230

# Run subsequent commands as user
USER freerad

RUN npm install

CMD [ "npm", "start" ]
