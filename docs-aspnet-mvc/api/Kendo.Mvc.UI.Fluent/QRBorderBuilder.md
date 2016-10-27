---
title: QRBorderBuilder
---

# Kendo.Mvc.UI.Fluent.QRBorderBuilder
Defines the fluent interface for configuring QRBorder.




## Methods


### Width(System.Int32)
Sets the border width.


#### Parameters

##### width `System.Int32`
The border width.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Border(border => border.Width(5))
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Border(border => border.Width(5))
    %>


### Color(System.String)
Sets the border color.


#### Parameters

##### color `System.String`
The border color.




#### Example (Razor)
    @(Html.Kendo().QRCode()
        .Name("qrCode")
        .Border(border => border.Color("black"))
    )

#### Example (ASPX)
    <%:Html.Kendo().QRCode()
        .Name("qrCode")
        .Border(border => border.Color("black"))
    %>



