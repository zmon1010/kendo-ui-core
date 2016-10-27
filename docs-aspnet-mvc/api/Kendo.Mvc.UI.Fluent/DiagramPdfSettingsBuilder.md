---
title: DiagramPdfSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.DiagramPdfSettingsBuilder
Defines the fluent API for configuring the DiagramPdfSettings settings.




## Methods


### Author(System.String)
The author of the PDF document.


#### Parameters

##### value `System.String`
The value that configures the author.





### Creator(System.String)
The creator of the PDF document.


#### Parameters

##### value `System.String`
The value that configures the creator.





### Date(System.DateTime)
The date when the PDF document is created. Defaults to new Date().


#### Parameters

##### value `System.DateTime`
The value that configures the date.





### FileName(System.String)
Specifies the file name of the exported PDF file.


#### Parameters

##### value `System.String`
The value that configures the filename.





### ForceProxy(System.Boolean)
If set to true, the content will be forwarded to proxyURL even if the browser supports saving files locally.


#### Parameters

##### value `System.Boolean`
The value that configures the forceproxy.





### Keywords(System.String)
Specifies the keywords of the exported PDF file.


#### Parameters

##### value `System.String`
The value that configures the keywords.





### Landscape(System.Boolean)
Set to true to reverse the paper dimensions if needed such that width is the larger edge.


#### Parameters

##### value `System.Boolean`
The value that configures the landscape.





### Margin(System.Action\<Kendo.Mvc.UI.Fluent.DiagramPdfMarginSettingsBuilder\<T,T\>\>)
Specifies the margins of the page (numbers or strings with units). Supported
            units are "mm", "cm", "in" and "pt" (default).


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DiagramPdfMarginSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DiagramPdfMarginSettingsBuilder)<T,T>>
The action that configures the margin.





### PaperSize(System.String)
Specifies the paper size of the PDF document.
            The default "auto" means paper size is determined by content.Supported values:


#### Parameters

##### value `System.String`
The value that configures the papersize.





### ProxyURL(System.String)
The URL of the server side proxy which will stream the file to the end user.A proxy will be used when the browser isn't capable of saving files locally.
            Such browsers are IE version 9 and lower and Safari.The developer is responsible for implementing the server-side proxy.The proxy will receive a POST request with the following parameters in the request body:The proxy should return the decoded file with set "Content-Disposition" header.


#### Parameters

##### value `System.String`
The value that configures the proxyurl.





### ProxyTarget(System.String)
A name or keyword indicating where to display the document returned from the proxy.If you want to display the document in a new window or iframe,
            the proxy should set the "Content-Disposition" header to inline; filename="<fileName.pdf>".


#### Parameters

##### value `System.String`
The value that configures the proxytarget.





### Subject(System.String)
Sets the subject of the PDF file.


#### Parameters

##### value `System.String`
The value that configures the subject.





### Title(System.String)
Sets the title of the PDF file.


#### Parameters

##### value `System.String`
The value that configures the title.






