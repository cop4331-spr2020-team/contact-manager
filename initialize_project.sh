#!/bin/bash

dirs=( "frontend" "backend" )

for dir in "${dirs[@]}"
do
    pushd $dir
    rm -rf node_modules > /dev/null
    npm cache clean -f > /dev/null
    ln -s node_modules /home/vagrant/do_not_touch/$dir
    npm install --no-bin-links 
    popd
done

./setup_defaults.sh