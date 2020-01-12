# Using   nodejs: 12.4.1
#         mongodb: 4.2.2
#         react: 

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/bionic64"
  config.vm.provider "virtualbox" do |vb|
    vb.name = "cop4331-dev-box"
    vb.memory = "4096"
    vb.cpus = "2"
  end

  # We need to pass through our ssh so that we can
  # communicate with server / database through our host machine.
  config.vm.network "private_network", ip: "11.11.11.11"

  # Change default so that it home dir has git files
  config.vm.synced_folder ".", "/vagrant", disabled: true
  config.vm.synced_folder ".", "/home/vagrant/project"

  # Run script to setup our vagrant machine.
  config.vm.provision "shell", path: "vagrant/install.sh"

end
