#!/bin/bash
JENKINS_URL="$1"
sleep 10;
cd /tmp/jenkins-jobs
for job in *.xml; do
	name=${job%.*}
        java -jar /tmp/jenkins-cli.jar -s $JENKINS_URL create-job $name < $job;
            if [[ ! $? -eq 0 ]]
            then
                java -jar /tmp/jenkins-cli.jar -s $JENKINS_URL update-job $name < $job;
            fi
done

java -jar /tmp/jenkins-cli.jar -s $JENKINS_URL restart;
