---
title: BarcodeBuilder
---

# Kendo.Mvc.UI.Fluent.BarcodeBuilder
Defines the fluent interface for configuring the Barcode.




## Methods


### Value(System.String)
Sets the value of the barcode





### RenderAs(Kendo.Mvc.UI.RenderingMode)
Sets the preferred rendering engine.
            If it is not supported by the browser, the Chart will switch to the first available mode.


#### Parameters

##### renderAs [Kendo.Mvc.UI.RenderingMode](/api/aspnet-mvc/Kendo.Mvc.UI/RenderingMode)
The preferred rendering engine.





### Value(System.Int32)
Sets the value of the barcode





### Background(System.String)
Sets the background color of the barcode area





### Border(System.Action\<Kendo.Mvc.UI.Fluent.BarcodeBorderBuilder\>)
Configures the options for the border of the Barcode





### Padding(System.Action\<Kendo.Mvc.UI.Fluent.BarcodeSpacingBuilder\>)
Configurator to fine tune the padding options





### Padding(System.Int32)
Specifies padding for top,bottom,right and left at once.





### Checksum(System.Boolean)
Specifies whether the Checksum should be displayed next to the text or not





### Color(System.String)
Specifies the color of the bars





### Text(System.Action\<Kendo.Mvc.UI.Fluent.BarcodeTextBuilder\>)
Configures options for the Text of the Barcode





### Encoding(Kendo.Mvc.UI.BarcodeSymbology)
Sets the symbology which will be used to encode the value of the barcode





### Height(System.Int32)
Sets the height of the barcode area





### Width(System.Int32)
Sets the width of the barcode area






