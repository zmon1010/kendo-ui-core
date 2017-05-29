#!/bin/sh

if [ ! -d kendo-ui-core ]; then
    git clone git@github.com:telerik/kendo-ui-core.git;
else
    cd kendo-ui-core;
    git fetch;
    git reset --hard origin/master
    cd ..
fi

npm install;

gulp copy-ui-core-files;

cd kendo-ui-core;
git add .
git commit -m "Sync with Kendo UI Professional"
git push

exit