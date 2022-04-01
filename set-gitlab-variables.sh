#!/bin/bash
#
#echo "" >>.env
#
###add your gitlab variable names here
#for i in "NGINX_PORT"; do
#  eval "echo $i=\$$i" >>.env
#done

#set nginx port
sed -Ei "s/(NGINX_PORT=).*/\1$NGINX_PORT/" .env
