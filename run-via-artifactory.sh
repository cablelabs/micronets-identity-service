#!/bin/bash
# TODO: Support these as parameters
HOST_IDSERVICE_PORT=3230
HOST_RADIUS_PORT=1812
INSTANCE_ID=001
DOCKER_REPO_HOST=community.cablelabs.com:4567
DOCKER_REPO_PATH=/micronets-docker

docker login $DOCKER_REPO_HOST || exit 2

DOCKER_REPO_HOSTPATH=$DOCKER_REPO_HOST$DOCKER_REPO_PATH
docker pull $DOCKER_REPO_HOSTPATH/micronets-identity-service || exit 4
docker pull $DOCKER_REPO_HOSTPATH/micronets-freeradius-service || exit 6

FREERAD_STORAGE_VOLUME=freeradius-volume-$INSTANCE_ID
docker volume inspect $FREERAD_STORAGE_VOLUME > /dev/null 2>&1
volume_exists=$?

ID_CONTAINER_NAME=id-service-$INSTANCE_ID
docker run -d -p $HOST_IDSERVICE_PORT:3230 \
	--name $ID_CONTAINER_NAME \
	--mount source=$FREERAD_STORAGE_VOLUME,target="/usr/src/app/freeradius/3.0" \
	$DOCKER_REPO_HOSTPATH/micronets-identity-service \
		|| exit 10
echo "Started ID service container $ID_CONTAINER_NAME"

if [ $volume_exists -eq 1 ] ; then
   echo "Initializing the ID service certificates for volume $FREERAD_STORAGE_VOLUME (this might take a few minutes)..."
   sleep 10
   curl -X POST http://localhost:$HOST_IDSERVICE_PORT/configure \
	|| exit 20
   echo ""
fi

RADIUS_CONTAINER_NAME=freeradius-service-$INSTANCE_ID
docker run -d -p $HOST_RADIUS_PORT:1812 \
	--name $RADIUS_CONTAINER_NAME \
	--mount source=$FREERAD_STORAGE_VOLUME,target="/etc/freeradius" \
	$DOCKER_REPO_HOSTPATH/micronets-freeradius-service:latest \
	|| exit 30
echo "Started RADIUS container $ID_CONTAINER_NAME"

echo "Done!"

