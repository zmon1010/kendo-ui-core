---
title: GridExcelBuilder
---

# Kendo.Mvc.UI.Fluent.GridExcelBuilder
The fluent API for configuring the grid Excel export.




## Methods


### FileName(System.String)
Sets the file name of the excel file.





### AllPages(System.Boolean)
Specifies whether all pages should be exported





### Filterable(System.Boolean)
Enables or disables filtering in the output Excel file.





### ProxyURL(System.String)
Set the url of the server side proxy. The proxy is responsible for returning the excel file to the end user. Used in browsers that don't support saving files from JavaScript.


#### Parameters

##### url `System.String`






### ForceProxy(System.Boolean)
Forces the use of server-side proxy even if the browser supports local saving.


#### Parameters

##### forceProxy `System.Boolean`
true if the server proxy should be used always; false for automatic detection






