#!/bin/bash

DIRS=( frontend backend )

for dir in "${DIRS[@]}"
do
    pushd $dir
    npm install
    popd
done

sudo docker-compose up -d