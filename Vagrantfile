# Using   nodejs: 12.4.1
#         mongodb: 4.2.2
#         react: 
$script = <<-SCRIPT
#!/bin/bash

# ----------- Public keys.

# MongoDB 
# wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

# Yarn
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

# ----------- End of keys.

# ----------- List Files.

# MongoDB list file.
# echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

# Yarn list file.
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# ----------- End of List Files.

# Pre-update before install
sudo apt-get update

# Nodejs 12.14.1 LTS.
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs \
						docker.io docker-compose
            # mongodb-org=4.2.2 mongodb-org-server=4.2.2 \
            # mongodb-org-shell=4.2.2 mongodb-org-mongos=4.2.2 \
            # mongodb-org-tools=4.2.2 yarn \

# Sanity check update for npm.
sudo npm install npm@latest -g
sudo npm install -g n

# One more sanity check for nodejs version
sudo n 12.14.1

# Pin mongodb version
# echo "mongodb-org hold" | sudo dpkg --set-selections
# echo "mongodb-org-server hold" | sudo dpkg --set-selections
# echo "mongodb-org-shell hold" | sudo dpkg --set-selections
# echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
# echo "mongodb-org-tools hold" | sudo dpkg --set-selections

# Start mongodb
# sudo service mongod start
# Probably need to add our mongodb configuration here.

# Host settings.
# Probably need to configure host settings for development.
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.provider "virtualbox" do |vb|
    vb.name = "cop4331-dev-box"
    vb.memory = "2560"
    vb.cpus = "2"
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/home/vagrant/shared", "1"]
  end

  # We need to pass through our ssh so that we can
  # communicate with server / database through our host machine.
  config.vm.network "private_network", ip: "11.11.11.11"

  # Change default so that it home dir has git files
  config.vm.synced_folder ".", "/vagrant", disabled: true
  config.vm.synced_folder ".", "/home/vagrant/shared"

  # Run script to setup our vagrant machine.
  # config.vm.provision "shell", path: "vagrant/install.sh"
  config.vm.provision "shell" do |s|
  	s.binary = true
  	s.inline = $script
  end

end