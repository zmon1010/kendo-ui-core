---
title: QRCodeBuilder
---

# Kendo.Mvc.UI.Fluent.QRCodeBuilder
Defines the fluent interface for configuring the QRCode component.




## Methods


### Background(System.String)
Sets the background color of the QR code.


#### Parameters

##### color `System.String`
The QR code background color.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Background("red")
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Background("red")
    %>


### Border(System.String,System.Int32)
Sets the border width and color of the QR code.


#### Parameters

##### color `System.String`
The QR code border color.

##### width `System.Int32`
The QR code border width.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Border("black", 5)
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Border("black", 5)
    %>


### Border(System.Action\<Kendo.Mvc.UI.Fluent.QRBorderBuilder\>)
Sets the border configuration of the QRCode.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.QRBorderBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/QRBorderBuilder)>
The lambda which configures the border.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Border(border =>
            // configure the border
            border
            .Color("black")
            .Width(5)
        )
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Border(border =>
            // configure the border
            border
            .Color("black")
            .Width(5)
        )
    %>


### Color(System.String)
Sets the color of the QR code.


#### Parameters

##### color `System.String`
The QR code color.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Color("blue")
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Color("blue")
    %>


### Encoding(Kendo.Mvc.UI.QREncoding)
Sets the encoding of the QR code.


#### Parameters

##### encoding [Kendo.Mvc.UI.QREncoding](/api/aspnet-mvc/Kendo.Mvc.UI/QREncoding)
The QR code encoding.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Encoding(QREncoding.UTF_8)
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Encoding(QREncoding.UTF_8)
    %>


### ErrorCorrection(Kendo.Mvc.UI.QRErrorCorrectionLevel)
Sets the error correction level of the QR code.


#### Parameters

##### errorCorrection [Kendo.Mvc.UI.QRErrorCorrectionLevel](/api/aspnet-mvc/Kendo.Mvc.UI/QRErrorCorrectionLevel)
The QR code error correction level.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .ErrorCorrection(QRErrorCorrectionLevel.Q)
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .ErrorCorrection(QRErrorCorrectionLevel.Q)
    %>


### Size(System.Int32)
Sets the size of the QR code.


#### Parameters

##### size `System.Int32`
The QR code size.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Size(170)
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Size(170)
    %>


### Value(System.String)
Sets the value of the QR code.


#### Parameters

##### value `System.String`
The QR value.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Value("Hello world")
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Value("Hello world")
    %>


### Padding(System.Int32)
Sets the padding of the QR code.


#### Parameters

##### padding `System.Int32`
The QR padding.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Padding(5)
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Padding(5)
    %>


### RenderAs(Kendo.Mvc.UI.RenderingMode)
Sets the preferred rendering engine.
            If it is not supported by the browser, the Chart will switch to the first available mode.


#### Parameters

##### renderAs [Kendo.Mvc.UI.RenderingMode](/api/aspnet-mvc/Kendo.Mvc.UI/RenderingMode)
The preferred rendering engine.






