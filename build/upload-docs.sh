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
MIRROR="
put default.json
mirror --reverse --delete --ignore-time --no-perms --verbose .
"

# Generate docs
(cd docs && bundle --without development --path ~/gems && bundle exec jekyll build)

# Clean-up generated wrappers
rm -rf docs/api/wrappers/*

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
