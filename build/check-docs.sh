#!/bin/bash

if [ $# -eq 0 ]; then
    echo "  Usage: $0 <documentation-starting-page>"
    echo "Example: $0 http://kendobuild.telerik.com/kendo-ui/introduction"
    exit 1
fi

# find broken links
linkchecker --no-status --config=build/check-docs.ini -P1 $1
