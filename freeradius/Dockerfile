# Create app directory
WORKDIR /usr/sbin

# Install app
COPY /usr/sbin/freeradius .

# Copy Configuration
COPY /etc/freeradius /etc/freeradius

EXPOSE 1812
CMD [ "freeradius" ]
