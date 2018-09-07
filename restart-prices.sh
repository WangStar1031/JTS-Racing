#!/bin/bash
cd /home/ubuntu
# If running from ansible ensure that the profile is running
source .bashrc
source .profile
# Restart NAR and JRA prices
./start-nar-all.sh
