#!/bin/bash

cd "$(dirname "$0")" || exit

source setup-conf.env

cp example-docker-compose.yml docker-compose.yml
cp example.env .env
cp example-gitlab-ci.yml .gitlab-ci.yml
cp example-app.conf app.conf

if [ "$USE_APP" == "0" ]; then
  sed -Ezi 's/app:.*(postgres:\n)/\1/' docker-compose.yml
fi

if [ "$USE_DB" == "0" ]; then
  sed -Ezi 's/postgres:.*(networks:)/\n\1/' docker-compose.yml
fi

if [ "$SUB_PATH" ]; then
  sed -Ei "s;location /(.*);location ${SUB_PATH}/\1;" app.conf
  sed -i "s;PUBLIC_URL=.*;PUBLIC_URL=$SUB_PATH;" .env
fi

### ENV FILE

if [ -z "$PROJECT_NAME" ] || [ -z "$PROJECT_PATH" ] || [ -z "$PROJECT_PATH" ] || [ -z "$VOLUME_PATH" ] || [ -z "$BRANCH_NAME" ] || [ -z "$RUNNER_TAG" ]; then
  echo "setup-conf.env Variables not set properly"
  exit
fi

DOCKER_DB_USER="user_$(openssl rand -hex 6)"
DOCKER_DB_PASS=$(openssl rand -hex 16)

sed -i "s/DOCKER_DB_USER=.*/DOCKER_DB_USER=$DOCKER_DB_USER/" .env
sed -i "s/DOCKER_DB_PASS=.*/DOCKER_DB_PASS=$DOCKER_DB_PASS/" .env

sed -i "s;PROJECT_PATH=.*;PROJECT_PATH=$PROJECT_PATH;" .env
sed -i "s;^PROJECT_NAME=.*;PROJECT_NAME=$PROJECT_NAME;" .env
sed -i "s;^COMPOSE_PROJECT_NAME=.*;COMPOSE_PROJECT_NAME=$PROJECT_NAME;" .env
sed -i "s;VOLUME_PATH=.*;VOLUME_PATH=$VOLUME_PATH;" .env

sed -i "s;main;$BRANCH_NAME;" .gitlab-ci.yml
sed -i "s;arge-server;$RUNNER_TAG;" .gitlab-ci.yml

printf "PRESS ENTER IF EVERYTHING LOOKS OK. PREVIOUS CONFIGURATION WILL BE OVERWRITTEN(Ctrl + C to cancel)"
read

mv .env ../
mv docker-compose.yml ../
mv .gitlab-ci.yml ../
mv app.conf ../nginx
