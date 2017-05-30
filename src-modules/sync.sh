#!/usr/bin/env bash

if [ ! -d "kendo-drawing" ]; then
    git clone git@github.com:telerik/kendo-drawing.git
else
    cd kendo-drawing && git fetch && git checkout master && git reset --hard origin/master && cd ..
fi

if [ ! -d "kendo-charts" ]; then
    git clone git@github.com:telerik/kendo-charts.git
else
    cd kendo-charts && git fetch && git checkout master && git reset --hard origin/master && cd ..
fi

gulp

