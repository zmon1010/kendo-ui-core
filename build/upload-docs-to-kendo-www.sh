#!/bin/bash

SYNC='rsync -rvcz --delete --inplace'
DEST='/usr/share/nginx/html/docs'
USER='nginx'
declare -a HOSTS=("ordkendowww01.telerik.local" "ordkendowww02.telerik.local")

function log {
    echo "[$(date +%T)] $1"
}

log "Generating documentation"
(cd docs && bundle --without development --path ~/gems && bundle exec jekyll build)

if [ ! $? -eq 0 ]
then
    echo Unable to generate documentation
    exit $?
fi

for host in "${HOSTS[@]}"
do
    log "Uploading documentation to $host"
    $SYNC docs/_site/ $USER@$host:$DEST
done

log "Done"
