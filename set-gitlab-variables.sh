#!/bin/bash

echo "" >>.env

##add your gitlab variable names here
for i in "NODE_ENV" "COMPOSE_PROJECT_NAME" "NGINX_PORT"; do
  eval "echo $i=\$$i" >>.env
done
