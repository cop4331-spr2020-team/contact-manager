# cop4331-contact-manager

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
Follow the instructions for your OS.

#### Windows
1. Open command prompt.
2. We will be cloning this project, so setup a folder where you want this project
to be extracted.
3. Use the command 'cd', to move into the directory you've setup.  
 For example: `cd "C:\Users\Marlon Calvo\git\"`.
4. Clone this project, `git clone https://github.com/marloncalvo/cop4331-contact-manager/`.
5. See [vagrant usage](#vagrant-usage)

#### Linux
1. Open your favorite terminal.
2. We will be cloning this project, so setup a folder where you want this project
to be extracted.
3. Use the command 'cd', to move into the directory you've setup.  
 For example: `cd "~/git/"`.
4. Clone this project, `git clone https://github.com/marloncalvo/cop4331-contact-manager/`.
5. See [vagrant usage](#vagrant-usage)
 
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

**NOTE:** You can also perform vagrant up --provision so that the box performs  
the initialization procedure (if you updated something by accident).

## Build / Run
Since our project is setup as a frontend / backend package, 
