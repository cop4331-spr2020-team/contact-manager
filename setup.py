import os
import argparse

def main(args):
	root_env_path = "./.env"
	backend_env_path = "./backend/.env"
	frontend_env_path = "./frontend/.env"

	setup_frontend(frontend_env_path)
	setup_env(args.mongo_user, args.mongo_pass, args.mongo_cluster, root_env_path)
	setup_env(args.mongo_user, args.mongo_pass, args.mongo_cluster, backend_env_path)

def setup_env(mongo_user, mongo_pass, mongo_cluster, file_path):
	content = ""
	content += "MONGO_USERNAME=" + mongo_user + "\n"
	content += "MONGO_PASSWORD=" + mongo_pass + "\n"
	content += "MONGO_CLUSTER=" + mongo_cluster + "\n"
	write_env(content, file_path)

def setup_frontend(file_path):
	content = "CHOKIDAR_USEPOLLING=true"
	write_env(content, file_path)

def write_env(contents, file_path):
	with open(file_path, "w") as env_file:
		env_file.write(contents)
		env_file.close() 

if __name__ == '__main__':
	parser = argparse.ArgumentParser(description='Setup local environment.')
	parser.add_argument('mongo_user', type=str,
                    help='MongoDB Atlas database account user name.')
	parser.add_argument('mongo_pass', type=str,
                    help='MongoDB Atlas database account password.')
	parser.add_argument('mongo_cluster', type=str,
                    help='MongoDB Atlas database cluster name.')
	args = parser.parse_args()
	main(args)
