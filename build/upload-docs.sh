#!/bin/bash
#
# Sample Usage
# build/upload-docs.sh docs/_site

HOST='172.17.49.82'
PORT='33'
USER='kendodocumentation'
PASS='qGMQIUxq57'
DOCS_SITE="docs/_site"
MIRROR_OPTIONS="--reverse --delete --ignore-time --no-perms --loop --verbose"
HELLO="
open -p $PORT $HOST
user $USER $PASS
lcd $DOCS_SITE
"

# Generate docs
(cd docs && bundle --without development --path ~/gems && bundle exec jekyll build)

# Clean-up generated wrappers
rm -rf docs/api/wrappers/*

lftp -e "
$HELLO
mirror $MIRROR_OPTIONS . kendouidocsweb1
bye
" &
lftp -e "
$HELLO
mirror $MIRROR_OPTIONS . kendouidocsweb2
bye
" &
wait
