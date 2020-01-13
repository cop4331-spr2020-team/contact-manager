#!/bin/bash

dirs=( "frontend" "backend" )

for dir in "${dirs[@]}"
do
    pushd $dir
    npm install
    popd
done

./setup_defaults.sh