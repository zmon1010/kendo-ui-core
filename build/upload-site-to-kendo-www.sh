#!/bin/bash
SYNC="rsync -n -rvcz --delete --inplace"
DEST="/usr/share/nginx/html/$2/"
USER="nginx"
declare -a HOSTS=("ordkendowww01.telerik.local" "ordkendowww02.telerik.local")

function log {
    echo "[$(date +%T)] $1"
}

for host in "${HOSTS[@]}"
do
    log "Uploading site to $host"
    $SYNC $1/_site/ $USER@$host:$DEST
done

log "Done"

