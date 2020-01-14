#!/bin/bash
if [ ! -d "frontend/node_modules" ] || [ ! -d "backend/node_modules" ] 
then
	echo "Project has not been initialized."
	echo "If it already has, it has been improperly initialized and should be re-initialized."
	printf "Would you like to initialize the project? [y/n] "
	read resp
	echo ""
	if [ "$resp" != "y" ] && [ "$resp" != "Y" ]
	then
		echo "Ok, skipping initialization."
		exit 0
	fi
	echo "Running initialization procedure."
	./initialize_project.sh
fi

sudo docker-compose up -d