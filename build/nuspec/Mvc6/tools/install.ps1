param($installPath, $toolsPath, $package, $project)

# find out where to put the files, we're going to create a deploy directory
# at the same level as the solution.

$deployTarget = $path::GetDirectoryName($project.FileName)

$deploySource = join-path $installPath 'content/'

# copy everything in there

Copy-Item "$deploySource/*" $deployTarget -Recurse -Force
