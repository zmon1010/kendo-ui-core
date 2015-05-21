@echo off
setlocal
pushd wrappers

msbuild /verbosity:quiet /p:Configuration=Debug mvc\Kendo.Mvc.sln
msbuild /verbosity:quiet /p:Configuration=Debug mvc-6\Kendo.Mvc.sln
msbuild /verbosity:quiet /p:Configuration=Debug mvc-6\tools\APIChange\ApiChange.sln

if not exist "mvc-6\tools\APIChange\bin\Debug\MVC5" md mvc-6\tools\APIChange\bin\Debug\MVC5
if not exist "mvc-6\tools\APIChange\bin\Debug\MVC6" md mvc-6\tools\APIChange\bin\Debug\MVC6
copy /y mvc\src\Kendo.Mvc\bin\Debug\Kendo.Mvc.dll mvc-6\tools\APIChange\bin\Debug\MVC5
copy /y mvc-6\src\artifacts\bin\Kendo.Mvc\Debug\aspnet50\Kendo.Mvc.dll mvc-6\tools\APIChange\bin\Debug\MVC6

pushd mvc-6\tools\APIChange\bin\Debug
ApiChange -diff -old MVC5\Kendo.Mvc.dll -new MVC6\Kendo.Mvc.dll > ..\..\..\..\apidiff.txt