#!/bin/sh

# Start Cron Daemon
crond

# Initial run of jds script to produce jackpot.json
./jds-script

# Start Node application
npm start
