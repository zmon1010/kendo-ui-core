#!/bin/bash
#
# Sample Usage
# build/upload-docs.sh docs/_site

HOST='172.17.49.82'
PORT='33'
USER='kendodocumentation'
PASS='qGMQIUxq57'
DOCS_SITE="docs/_site"
HELLO="
open -p $PORT $HOST
user $USER $PASS
lcd $DOCS_SITE
"
MIRROR_OPTIONS="--ignore-time"
# option handling
while test $# -gt 0
do
    case "$1" in
        --force) MIRROR_OPTIONS=""
            ;;
        --*) echo "unrecognized option $1"
            ;;
    esac
    shift
done

MIRROR="
put default.json
mirror --reverse --delete $MIRROR_OPTIONS --no-perms --verbose .
"

function log {
    echo "[$(date +%T)] $1"
}

log "Generating documentation"
# Generate docs
(cd docs && bundle --without development --path ~/gems && bundle exec jekyll build)

# Clean-up generated wrappers
rm -rf docs/api/wrappers/*

log "Uploading documentation to $HOST"

lftp -e "
$HELLO
cd kendouidocsweb1
$MIRROR
bye
" &
lftp -e "
$HELLO
cd kendouidocsweb2
$MIRROR
bye
" &
wait

log "Done"
