#!/bin/bash
if [ ! -d "/path/to/dir" ] 
then
	echo "Project has not been initialized."
	echo "Running initialization procedure."
	./initialize_project.sh
fi

sudo docker-compose up -d