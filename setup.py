import os
import argparse

def main(args):
	root_env_path = "./.env"
	backend_env_path = "./backend/.env"
	frontend_env_path = "./frontend/.env"

	os.remove(root_env_path)
	os.remove(backend_env_path)
	os.remove(frontend_env_path)

	setup_frontend(args.server_domain, args.server_port, frontend_env_path)
	setup_frontend(args.server_domain, args.server_port, root_env_path)
	setup_env(args.mongo_user, args.mongo_pass, args.mongo_cluster, root_env_path)
	setup_env(args.mongo_user, args.mongo_pass, args.mongo_cluster, backend_env_path)

def setup_env(mongo_user, mongo_pass, mongo_cluster, file_path):
	content = ""
	content += "MONGO_USERNAME=" + mongo_user + "\n"
	content += "MONGO_PASSWORD=" + mongo_pass + "\n"
	content += "MONGO_CLUSTER=" + mongo_cluster + "\n"
	content += "CHOKIDAR_USEPOLLING=true\n"
	write_env(content, file_path)

def setup_frontend(server_domain, server_port, file_path):
	content = ""
	content += "SERVER_DOMAIN=" + server_domain + "\n"
	content += "SERVER_PORT=" + server_port + "\n"
	content += "CHOKIDAR_USEPOLLING=true\n"
	write_env(content, file_path)

def write_env(contents, file_path):
	with open(file_path, "a") as env_file:
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
	parser.add_argument('server_domain', type=str, default='172.22.0.100', nargs='?',
					help='Server domain for backend server.')
	parser.add_argument('server_port', type=str, default='8080', nargs='?',
					help='Server port for backend server.')
	args = parser.parse_args()
	main(args)
