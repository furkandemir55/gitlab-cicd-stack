#!/bin/bash

printf "PROJECT NAME(dont-use-space): "
read PROJECT_NAME
printf "PROJECT FOLDER PATH(default=/arge): "
read PROJECT_PATH
printf "VOLUME FOLDER PATH(default=/volume): "
read VOLUME_PATH
printf "BRANCH NAME(default=master): "
read BRANCH_NAME
printf "RUNNER TAG(default=arge-server): "
read RUNNER_TAG

sed -i "s/PROJECT_NAME=.*/PROJECT_NAME=$PROJECT_NAME/" .env
if [ "$PROJECT_PATH" ]; then
  sed -i "s/PROJECT_PATH=.*/PROJECT_PATH=$PROJECT_PATH/" .env
fi
if [ "$VOLUME_PATH" ]; then
  sed -i "s/VOLUME_PATH=.*/VOLUME_PATH=$VOLUME_PATH/" .env
fi
if [ "$BRANCH_NAME" ]; then
  sed -i "s/BRANCH_NAME=.*/BRANCH_NAME=$BRANCH_NAME/" .env
fi
if [ "$RUNNER_TAG" ]; then
  sed -i "s/RUNNER_TAG=.*/RUNNER_TAG=$RUNNER_TAG/" .env
fi


#POSTGRES_USER="user_$(openssl rand -hex 6)"
#sed -i "s/POSTGRES_USER=.*/POSTGRES_USER=$POSTGRES_USER/" .env
#
#POSTGRES_PASSWORD=$(openssl rand -hex 16)
#sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$POSTGRES_PASSWORD/" .env
