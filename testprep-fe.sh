#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

root="/var/www/testprep-fe"
cd "$root"

echo -e '\e[1m\e[34mPulling code from remote..\e[0m\n'

git pull origin main

echo -e '\e[1m\e[34mStopping PM2 process..\e[0m\n'
pm2 stop testprep-fe || true
pm2 delete testprep-fe || true

echo -e '\e[1m\e[34mInstalling required packages..\e[0m\n'
npm install --legacy-peer-deps

echo -e '\e[1m\e[34mBuilding the project..\e[0m\n'
npm run build

echo -e '\e[1m\e[34mStarting PM2 process..\e[0m\n'
pm2 start 'npm run start' --name 'testprep-fe'
pm2 save

echo -e '\e[1m\e[34mAPI deployed successfully!\e[0m\n'
