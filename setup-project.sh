#!/bin/bash

cd "$(dirname "$0")" || exit

cp example-docker-compose.yml docker-compose.yml

#### ask if app is used
printf "USE APP?(y/n): "
read USE_APP
if [ "$USE_APP" != "y" ] && [ "$USE_APP" != "Y" ]; then
#  rm -rf ./app
  sed -Ezi 's/app:.*(postgres:\n)/\1/' docker-compose.yml
fi

#### ask if db is used
printf "USE DB?(y/n): "
read USE_DB
if [ "$USE_DB" != "y" ] && [ "$USE_DB" != "Y" ]; then
  sed -Ezi 's/postgres:.*(networks:)/\n\1/' docker-compose.yml
fi

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

cp example.env .env

if [ -z "$PROJECT_PATH" ]; then
  PROJECT_PATH=/arge
fi
if [ -z "$VOLUME_PATH" ]; then
  VOLUME_PATH=/volume
fi
if [ -z "$BRANCH_NAME" ]; then
  BRANCH_NAME=master
fi
if [ -z "$RUNNER_TAG" ]; then
  RUNNER_TAG=arge-server
fi

POSTGRES_USER="user_$(openssl rand -hex 6)"
POSTGRES_PASSWORD=$(openssl rand -hex 16)
sed -i "s/POSTGRES_USER=.*/POSTGRES_USER=$POSTGRES_USER/" .env
sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$POSTGRES_PASSWORD/" .env

sed -i "s;PROJECT_PATH=.*;PROJECT_PATH=$PROJECT_PATH;" .env
sed -i "s;VOLUME_PATH=.*;VOLUME_PATH=$VOLUME_PATH;" .env
sed -i "s;BRANCH_NAME=.*;BRANCH_NAME=$BRANCH_NAME;" .env
sed -i "s;RUNNER_TAG=.*;RUNNER_TAG=$RUNNER_TAG;" .env
sed -i "s;PROJECT_NAME=.*;PROJECT_NAME=$PROJECT_NAME;" .env
