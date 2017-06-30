#!/bin/bash
SYNC="rsync -rvcz --delete --inplace"
DEST="/usr/share/nginx/html/$2/"
USER="nginx"
declare -a HOSTS=("ordkendowww01.telerik.local" "ordkendowww02.telerik.local")

function log {
    echo "[$(date +%T)] $1"
}

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source-dir> <dest-dir>"
    exit 1
fi

for host in "${HOSTS[@]}"
do
    log "Uploading site to $host"
    $SYNC $1/_site/ $USER@$host:$DEST || exit 1
done

log "Done"

