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

# Clean-up generated wrappers
rm -rf docs/api/aspnet-mvc
rm -rf docs/api/jsp
rm -rf docs/api/php

for host in "${HOSTS[@]}"
do
    log "Uploading documentation to $host"
    $SYNC docs/_site/ $USER@$host:$DEST
done

log "Done"
