# COP 4331 Contact Manager

## Setting up your development environment
### Requirements
* [VirtualBox 6.0.x](https://www.virtualbox.org/wiki/Download_Old_Builds_6_0 "VirtualBox's Old Downloads")
* [Vagrant](https://www.vagrantup.com/downloads.html "Vagrant Downloads")
* [Git](https://git-scm.com/downloads "Git Downloads") - If you use linux, use your favorite package manager if not installed.

### IDE (Text editor)
I recommend you use **Visual Studio Code** (with js/html/css/react/etc...) packages installed.
When editting your files through your host machine, please make sure you using Linux line endings.
(LF). On Visual Studio Code, you can find that option on the bottom right after "Spaces/Tabs...".

### Instructions
After you've finished installing all the required software.   

1. Download the Vagrantfile and setup_win.bat (in env_setup_scripts)
   to the root directory where you want to clone this repository.   
   
2. If you are using Windows, please run the setup_win.bat as administrator, which will restart your PC (must run).
  ![HOWTO](https://i.imgur.com/bRyphN9.png "Run as admin")

3. Start your favorite terminal / command prompt.  
   If on Windows, start with administrative mode. (Must do!)  
   ![HOWTO](https://i.imgur.com/s27M0cm.png "Run as admin")
   
4. Start [vagrant](#vagrant-usage) and `cd` into `shared` folder, which will be synchorinzed
   with the folder where you started vagrant.   
5. Please clone your repository under `shared`.

### Vagrant Usage
#### Starting Vagrant
1. To start vagrant (your build/run environment) with `vagrant up`.
2. Load your vagrant session by `vagrant ssh`.

You should now have all you need to run/build this project. See [running](#running)
for instructions on how to build/run our project.

#### Stopping Vagrant
You have two options here.  
`vagrant halt`, stopping its processing until you start it again.  
`vagrant destroy`, deleting the box and its content (would have to re-setup).

The latter is useful when you want to re-install everything.   

**NOTE:** You can also perform `vagrant up --provision` so that the box performs  
the initialization procedure (if you updated something by accident).

## Build / Run
Since our project is setup as a frontend / backend package, 
you are allowed to run each indepdently, or together.  

**NOTE**: Before running the backend server, you must run the `initialize_project.sh`  
so that the project environment variables and packages are setup.

### Setting up custom environment variables (optional)
1. Acquire a username / password from our MongoDB Atlas database accounts (for respective project).
2. Acquire the cluster name for the respective project.
3. `cd` into the root of the project.
4. `./setup <mongo_user> <mongo_pass> <mongo_cluster_name>` 
  
**or...**  
* Run `cd env_setup_scripts && ./setup_defaults` for a working development configuration.

### Running Backend / Frontend  
1. `cd backend/` or `cd frontend/`
2. (Using docker) `sudo docker-compose up` or `sudo docker-compose up -d` to run in the background.  
   (Using npm) Please use `npm start` for frontend, and `npm run dev` for backend.
3. You can access the frontend through __11.11.11.11:3000__ on your host machine, backend on __11.11.11.11:8080__.

### Simultaneously (Preferred Method)
1. `cd` into the root of the project.
2. Run `start_server.sh`
3. Access frontend through __11.11.11.11:3000__
4. Access backend through __11.11.11.11:8080__.
5. `stop_server.sh` to shutdown the container (do not forget).

## Deploying Production
The backend server has no changes in terms of deployment, but React has an optimized build step  
which you can test like so.  
`docker-compose -f docker-compose-prod.yaml up -d --build`
