#!/bin/sh

# Start Cron Daemon
crond -f -l 2

# Initial run of jds script to produce jackpot.txt
./jds-script

# Start Node application
npm start
