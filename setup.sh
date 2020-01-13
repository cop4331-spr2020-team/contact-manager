#!/bin/bash
touch .env frontend/.env backend/.env
python3 setup.py "$@"
