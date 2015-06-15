#!/bin/bash
#
# Sample Usage
# build/upload-docs.sh docs/_site

HOST='172.17.49.82'
PORT='33'
USER='kendodocumentation'
PASS='qGMQIUxq57'
SOURCE_FOLDER="docs/_site/"
DIST_FOLDER="docs/_site_sync"

# Generate docs
(cd docs && bundle --without development --path ~/gems && bundle exec jekyll build)

# Clean-up generated wrappers
rm -rf docs/api/wrappers/*

# Sync first to avoid transferring duplicates
rsync -avc --delete $SOURCE_FOLDER $DIST_FOLDER

lftp -e "
open -p $PORT $HOST
user $USER $PASS
lcd $DIST_FOLDER
mirror --reverse --delete --use-cache --verbose . kendouidocsweb1
mirror --reverse --delete --use-cache --verbose . kendouidocsweb2
bye
"
