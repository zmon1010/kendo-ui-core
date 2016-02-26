#!/bin/bash
#
# Looks for build/**/*.erb files with Unicode encoding.
# Outputs a list of them and returns an error if it founds any.
#
# These files are known to break the Ruby code generation

DIFFS=$(find build -name "*.erb" -exec file {} \; | grep "Unicode")

echo "$DIFFS"
echo ""

if [[ "$DIFFS" != "" ]]; then
    echo "ERB Templates with Unicode encoding detected, failing!"
    echo "Please convert them to ASCII, e.g."
    echo "    recode UTF-8..ASCII <file name>"
    exit 1;
else
    echo "No ERB Templates with Unicode encoding detected, moving on!"
    exit 0;
fi


