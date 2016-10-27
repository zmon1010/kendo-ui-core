---
title: PDFSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.PDFSettingsBuilder
The fluent API for configuring the grid PDF export.




## Methods


### AllPages
Exports all pages. Applicable only for the Grid. Ajax binding or server binding with ServerOperation(false) is required.





### AvoidLinks
Does not create clickable hyperlinks in the exported PDF file.





### AvoidLinks(System.Boolean)
A flag indicating whether to produce clickable hyperlinks in the exported PDF file.





### AvoidLinks(System.String)
A CSS selector for the links to ignore. All matching links will not be clickable in the exported PDF file.





### Landscape
Turns the page in landscape orientation.





### FileName(System.String)
Sets the file name of the PDF file.





### PaperSize(System.String)
Specifies a predefiend paper size e.g. "A3", "A4" or "auto" (default).





### PaperSize(System.Double,System.Double)
Specifies custom paper size in "pt" units.





### PaperSize(System.String,System.String)
Specifies custom paper size in custom units ("in", "mm", "pt", "cm")





### ProxyURL(System.String)
Set the url of the server side proxy. The proxy is responsible for returning the PDF to the end user. Used in browsers that don't support saving files from JavaScript.


#### Parameters

##### url `System.String`






### ProxyTarget(System.String)
Set the a name or keyword indicating where to display the document returned from the proxy.
            The default is "_self".


#### Parameters

##### target `System.String`
The proxy target





### Margin(System.Double,System.Double,System.Double,System.Double)
Specifies the margins in "pt" units.





### Margin(System.String,System.String,System.String,System.String)
Specifies the margins in units ("in", "mm", "pt", "cm")





### Title(System.String)
Sets the title of the PDF document.





### Author(System.String)
Sets the author of the PDF document.





### Subject(System.String)
Sets the subject of the PDF document.





### Keywords(System.String)
Sets the keywords of the PDF document.





### RepeatHeaders(System.Boolean)
Set this to true to repeat the grid headers on each page.


#### Parameters

##### value `System.Boolean`
The value for RepeatHeaders





### RepeatHeaders
Set this to true to repeat the grid headers on each page.





### Scale(System.Double)
A scale factor. In many cases, text size on screen will be too big for print, so you can use this option to scale down the output in PDF.





### Template(System.String)
A piece of HTML to be included in each page.  Can be used to display headers and footers.  See the documentation in drawDOM.


#### Parameters

##### value `System.String`
The value for Template





### TemplateId(System.String)
A piece of HTML to be included in each page.  Can be used to display headers and footers.  See the documentation in drawDOM.


#### Parameters

##### value `System.String`
The ID of the template element for Template





### Creator(System.String)
Sets the creator of the PDF document.





### Date(System.DateTime)
Sets the date of the PDF document.





### ForceProxy(System.Boolean)
Forces the use of server-side proxy even if the browser supports local saving.


#### Parameters

##### forceProxy `System.Boolean`
true if the server proxy should be used always; false for automatic detection






