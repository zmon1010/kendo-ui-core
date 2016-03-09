#!/bin/bash
#
# Sample Usage
# build/upload-docs.sh docs/_site

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
rm -rf docs/api/wrappers/*

for host in "${HOSTS[@]}"
do
    log "Uploading documentation to $host"
    $SYNC _site $USER@$host:$DEST
done

log "Done"
