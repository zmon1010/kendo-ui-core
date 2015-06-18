#!/bin/bash
#
# Generates server-side wrappers and fails this yields changes
# Expects BRANCH environment variable to be set

DIFF_FILE=diff_wrappers.diff

git checkout -- wrappers
git clean -df wrappers

./build/run-build-task generate:all
git diff --color origin/$BRANCH -- wrappers>$DIFF_FILE;

cat $DIFF_FILE

if [[ -s $DIFF_FILE ]]; then
    echo "Diffs detected, failing"
    exit 1;
else
    echo "No diffs found, success"
    exit 0;
fi


