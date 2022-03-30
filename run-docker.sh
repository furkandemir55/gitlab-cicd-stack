#!/bin/bash
cd "$(dirname "$0")" || exit

docker-compose up -d --build --remove-orphans
