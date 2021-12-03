#!/bin/bash

echo "" >>.env

##gitlab variable names
for i in "NODE_ENV" "COMPOSE_PROJECT_NAME" "NGINX_PORT"; do
  eval "echo $i=\$$i" >>.env
done
