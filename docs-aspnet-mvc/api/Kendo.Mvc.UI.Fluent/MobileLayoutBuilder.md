---
title: MobileLayoutBuilder
---

# Kendo.Mvc.UI.Fluent.MobileLayoutBuilder
Defines the fluent API for configuring the Kendo MobileLayout for ASP.NET MVC.




## Methods


### Platform(System.String)
The specific platform this layout targets. By default, layouts are displayed
            on all platforms.


#### Parameters

##### value `System.String`
The value that configures the platform.





### Header(System.Action)
Sets the HTML content which the header should display.


#### Parameters

##### value `System.Action`
The action which renders the header.





### Header(System.Func\<System.Object,System.Object\>)
Sets the HTML content which the header should display.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The content wrapped in a regular HTML tag or text tag (Razor syntax).





### Header(System.String)
Sets the HTML content which the header should display as a string.


#### Parameters

##### value `System.String`
The action which renders the header.





### Footer(System.Action)
Sets the HTML content which the footer should display.


#### Parameters

##### value `System.Action`
The action which renders the footer.





### Footer(System.Func\<System.Object,System.Object\>)
Sets the HTML content which the footer should display.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The content wrapped in a regular HTML tag or text tag (Razor syntax).





### Footer(System.String)
Sets the HTML content which the footer should display as a string.


#### Parameters

##### value `System.String`
The action which renders the footer.





### HeaderHtmlAttributes(System.Object)
Sets the Header HTML attributes.


#### Parameters

##### attributes `System.Object`
The HTML attributes.



#### Returns




### FooterHtmlAttributes(System.Object)
Sets the Footer HTML attributes.


#### Parameters

##### attributes `System.Object`
The HTML attributes.



#### Returns




### HeaderHtmlAttributes(System.Collections.Generic.IDictionary\<System.String,System.Object\>)
Sets the Header HTML attributes.


#### Parameters

##### attributes `System.Collections.Generic.IDictionary<System.String,System.Object>`
The HTML attributes.



#### Returns




### FooterHtmlAttributes(System.Collections.Generic.IDictionary\<System.String,System.Object\>)
Sets the Footer HTML attributes.


#### Parameters

##### attributes `System.Collections.Generic.IDictionary<System.String,System.Object>`
The HTML attributes.



#### Returns




### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileLayoutEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileLayoutEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileLayoutEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileLayout()
    .Name("MobileLayout")
    .Events(events => events
        .Hide("onHide")
    )
    %>



