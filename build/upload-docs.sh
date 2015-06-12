#!/bin/bash
#
# Sample Usage
# build/upload-docs.sh docs/_site

HOST='172.17.49.82'
PORT='33'
USER='kendodocumentation'
PASS='qGMQIUxq57'
SOURCEFOLDER="$1"

lftp -e "
open -p $PORT $HOST
user $USER $PASS
lcd $SOURCEFOLDER
mirror --reverse --delete --verbose . kendouidocsweb1
mirror --reverse --delete --verbose . kendouidocsweb2
bye
"
