#!/bin/bash

dirs=( "frontend" "backend" )

for dir in "${dirs[@]}"
do
	if [ -d "$dir/node_modules" ] && [ -d "/home/vagrant/do_not_touch/$dir" ]
	then
		echo "It seems that the \"$dir\" package has been initialized."
		printf "Do you still want to continue [y/n] "
		read resp
		echo ""
		if [ "$resp" != "y" ] && [ "$resp" != "Y" ]
		then
			echo "Skipping initialization for \"$dir\"."
			echo ""
			continue
		fi
	fi

	echo "Starting initialization for \"$dir\"." 
	echo "================================================================"
    pushd $dir > /dev/null 2>&1
    echo ""
    echo "Removing old node_modules folder from $dir/node_modules and /home/vagrant/do_not_touch/$dir."
    rm -rf node_modules /home/vagrant/do_not_touch/$dir > /dev/null
    echo "Clearing npm cache."
    npm cache clean -f > /dev/null 2>&1
    mkdir -p /home/vagrant/do_not_touch/$dir
    ln -s node_modules /home/vagrant/do_not_touch/$dir
    echo ""
    echo "Starting installation for \"$dir\" packages."
    echo ""
    npm install --no-bin-links
    echo ""
    echo "Finished initialization for \"$dir\""
	echo "================================================================"
    echo ""
    echo ""

    popd > /dev/null 2>&1
done
echo "This project requires environment variables for running servers. They are loaded from .env files."
printf  "Do you want to use default (recommended)? [y/n] "
read resp
echo ""
if [ "$resp" != "y" ] && [ "$resp" != "Y" ]
then
	echo "Follow the examples under .env.examples for each .env to create the environment files."
else
	echo "Setting up default testing environment variables."
	cd env_setup_scripts
	./setup_defaults.sh
	echo "Done. You can now use \"start_server.sh\" to run the servers, or start either server manually."
fi
