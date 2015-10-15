#!/bin/bash

if [ $# -eq 0 ]; then
    echo "  Usage: $0 <documentation-starting-page>"
    echo "Example: $0 http://kendobuild.telerik.com/docs/introduction"
    exit 1
fi

# find broken links
wget --spider -e robots=off --wait 1 -r -p $1 2>&1 \
    | grep -B 2 '404' | grep http | awk '{ print $3 }' \
    | {
        # list pages that refer to broken links
        has_broken_links=0

        while read -r line; do
            # remove hostname
            line=$(echo "$line" | sed -r "s#[^/]*//[^/]*/kendo-ui##")

            if [ $line -n ]; then
                continue
            fi

            has_broken_links=1

            # report to console
            echo -e "\e[91mBroken link: $line\e[39m"
            echo "Found in:"

            find docs -name "*.md" -print0 \
                | xargs -0 grep -Hn --color=always $line

            echo ""
        done

        exit $has_broken
    }
