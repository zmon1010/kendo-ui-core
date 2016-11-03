#!/usr/bin/env bash

FROM=$1
export ORIGIN=git@github.com:telerik/kendo.git

if [ $(git remote | wc -l) -ne 2 ]; then
    echo "Adding remote origin"
    git remote add origin $ORIGIN
    INITIAL=true
fi


git fetch origin +refs/heads/$FROM:private-$FROM &>/dev/null

if [ -z "$INITIAL" ]; then
    PREVIOUS=$(git rev-parse previous)

    if [ "$PREVIOUS" == $(git rev-parse core/$FROM) ]; then
        echo "nothing to pick"
        exit 0
    fi
else
    echo "Initial fetch, skipping cherry-pick"
    git tag -f previous core/$FROM
    exit 0
fi

git checkout private-$FROM &>/dev/null


for commit in `git rev-list --reverse --topo-order previous..core/$FROM`;
do
    if [ `git cat-file -p $commit | grep ^parent | wc -l` -eq 1 ];
    then
        git cherry-pick $commit || echo "WARNING:  Could not cherry pick $commit";

        CHERRY_PICK_RESULT=$?

        if [ $CHERRY_PICK_RESULT -gt 0 ]; then

            git status;
            git cherry-pick --abort;
            git reset --hard;
            exit 1
        fi
    fi
done

git push origin private-$FROM:$FROM

if [ $(echo $?) -eq 0 ];
then
   git tag -f previous core/$FROM
fi

exit
