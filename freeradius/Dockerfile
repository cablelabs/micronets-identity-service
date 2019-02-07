FROM ubuntu

RUN apt-get update
RUN apt-get dist-upgrade -y

RUN DEBIAN_FRONTEND=noninteractive apt-get -y dist-upgrade
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install freeradius freeradius-mysql

EXPOSE 1812/udp 1813/udp 1812 1813

# ENTRYPOINT radiusd
CMD ["freeradius", "-d", "/etc/freeradius", "-X"]
