#!/bin/bash
if [ $( docker ps -a | grep wallet-frontend | wc -l ) -gt 0 ]; then 
    docker rm -f wallet-frontend
else
  echo "Container does not exist" 
fi
if [ $( docker images | grep wallet-frontend| wc -l ) -gt 0 ]; then
    docker rmi admin-frontend:latest
else
  echo "Image does not exist" 
fi
if [ -d "/home/asset_cdw_corp_wallet_frontend" ]; then
    sudo rm -rf /home/asset_cdw_corp_wallet_frontend
else
  echo "directory does not exist" 
fi
cd /home 
sudo git clone -b  branch-name https://$2@github.com/cdwcorp/asset_cdw_corp_wallet_frontend.git
docker build -t wallet-frontend:latest .    
docker run -d -p 3000:3000 --name wallet-frontend wallet-frontend:latest