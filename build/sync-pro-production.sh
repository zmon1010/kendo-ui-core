#!/bin/sh

if [ ! -d kendo-ui-core ]; then
    git clone git@github.com:telerik/kendo-ui-core.git;
    cd kendo-ui-core;
    git checkout production;
    cd ..
else
    cd kendo-ui-core;
    git checkout production;
    git fetch;
    git reset --hard origin/production
    cd ..
fi

npm install;

gulp copy-ui-core-files;

cd kendo-ui-core;
git add .
git commit -m "Sync with Kendo UI Professional"
git push

exit