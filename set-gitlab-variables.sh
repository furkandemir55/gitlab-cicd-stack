#!/bin/bash

args=()
while read -r line; do
  args+=($(echo "$line" | sed -n 's/\(.*\)=.*/\1/p'))
done <.env

for i in "${args[@]}"; do
  if [ -z "${!i}" ]; then
    echo "$i is not set"
    exit 1
  else
    sed -Ei "s;(${i}=).*;\1${!i};" .env
  fi
done
