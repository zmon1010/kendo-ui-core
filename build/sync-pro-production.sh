#!/bin/sh

if [ ! -d kendo-ui-core ]; then
    git clone --reference-if-able /usr/local/jenkins/gitcache/kendo git@github.com:telerik/kendo-ui-core.git kendo-ui-core
fi

export GIT_DIR="kendo-ui-core/.git"
export GIT_WORK_TREE="kendo-ui-core"

git checkout production;
git fetch;
git reset --hard origin/production
npm install;

gulp copy-ui-core-files;

git add .
git commit -m "Sync with Kendo UI Professional"
git push
