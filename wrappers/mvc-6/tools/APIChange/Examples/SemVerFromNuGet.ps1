param(
 [string] $checkoutDir, [string] $nugetPath, [string] $packageId,
 [string] $snkPath = $null, [string] $oldFilesFilter = 'lib\*.dll', [string] $newFilesFilter = 'Build\Release\*.dll',
 [string] $relativePathToApiChangeDll = 'ApiChange\ApiChange.Api.dll', [string] $packageSource = 'http://nuget.org/api/v2/'
)

function NuGetInstallLatest($nugetPath, $packageId, $packageSource, $installLocation)
{
	$installLocationExists = Test-Path $installLocation
	if (! $installLocationExists) { mkdir $installLocation}

	$nugetArgs = @('install', $packageId, '-excludeversion', '-outputDirectory', $installLocation, '-source', $packageSource)
	& $nugetPath $nugetArgs 
}

function GetApiCompatibility($apiChangeDllPath, $latestStablePath, $justBuilt, $snkPath)
{
	Add-Type -Path $apiChangeDllPath
	$versionerOutput = new-object System.IO.StringWriter
	
	$latestStableQuery = [ApiChange.Infrastructure.FileQuery]::ParseQueryList($latestStablePath)
	$justBuiltQuery = [ApiChange.Infrastructure.FileQuery]::ParseQueryList($justBuilt)
	$versioner = new-object ApiChange.Api.Scripting.SemanticVersioner($latestStableQuery, $justBuiltQuery, $snkPath)
	$compatibility = $versioner.Execute($versionerOutput)
	
	Write-Verbose $versionerOutput.GetStringBuilder().ToString()
	return $compatibility
}

function GetLatestPackageVersion($nugetPath, $packageId, $packageSource)
{
	$latestPackage = & $nugetPath list $packageId$ -source $packageSource
	return $latestPackage.Split(' ')[1]
}

function GetNugetPackageVersion($nugetPath, $packageId, $packageSource, $compatibility)
{
	$latestVersion = GetLatestPackageVersion $nugetPath $packageId $packageSource
	return [ApiChange.Api.Scripting.SemanticVersionExtensions]::GetNewSemanticVersion($latestVersion, $compatibility)
}

$installLocation = Join-Path $checkoutDir 'LatestStable'
$apiChangeDllPath = Join-Path $checkoutDir $relativePathToApiChangeDll
$latestStablePath = Join-Path (Join-Path $installLocation "$packageId") $oldFilesFilter
$justBuilt = Join-Path $checkoutDir $newFilesFilter

NuGetInstallLatest $nugetPath $packageId $packageSource $installLocation
$compatibility = GetApiCompatibility $apiChangeDllPath $latestStablePath $justBuilt $snkPath
$newPackageVersion = GetNugetPackageVersion $nugetPath $packageId $packageSource $compatibility

if ($newPackageVersion) { Write-Host "##teamcity[buildNumber '$newPackageVersion']" }
else { Write-Error "Semantic version wasn't set, see output above for more details" }