#!/bin/bash

# ----------- Public keys.

# MongoDB 
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -


# ----------- End of keys.

# MongoDB list file.
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

# Pre-update before install
sudo apt-get update

# Nodejs 12.14.1 LTS.
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb-org=4.2.2 mongodb-org-server=4.2.2 \
						mongodb-org-shell=4.2.2 mongodb-org-mongos=4.2.2 \
						mongodb-org-tools=4.2.2 yarn

sudo snap install docker

# Sanity check update for npm.
sudo npm install npm@latest -g
sudo npm install -g n

# One more sanity check for nodejs version
sudo n 12.14.1

# Pin mongodb version
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections

# Start mongodb
sudo service mongod start
# Probably need to add our mongodb configuration here.

# Host settings.
# Probably need to configure host settings for development.
