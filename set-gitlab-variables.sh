#!/bin/bash

echo "" >>.env

##add your gitlab variable names here
for i in "NGINX_PORT"; do
  eval "echo $i=\$$i" >>.env
done
