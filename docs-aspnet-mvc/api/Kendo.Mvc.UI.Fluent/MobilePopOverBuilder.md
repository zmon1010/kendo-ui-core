---
title: MobilePopOverBuilder
---

# Kendo.Mvc.UI.Fluent.MobilePopOverBuilder
Defines the fluent API for configuring the Kendo MobilePopOver for ASP.NET MVC.




## Methods


### Pane(System.Action\<Kendo.Mvc.UI.Fluent.MobilePopOverPaneSettingsBuilder\>)
The pane configuration options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobilePopOverPaneSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobilePopOverPaneSettingsBuilder)>
The action that configures the pane.





### Popup(System.Action\<Kendo.Mvc.UI.Fluent.MobilePopOverPopupSettingsBuilder\>)
The popup configuration options (tablet only)


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobilePopOverPopupSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobilePopOverPopupSettingsBuilder)>
The action that configures the popup.





### Content(System.Action)
Sets the HTML content which the content should display.


#### Parameters

##### value `System.Action`
The action which renders the content.





### Content(System.Func\<System.Object,System.Object\>)
Sets the HTML content which the content should display.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The content wrapped in a regular HTML tag or text tag (Razor syntax).





### Content(System.String)
Sets the HTML content which the popover content should display as a string.


#### Parameters

##### value `System.String`
The action which renders the view content.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobilePopOverEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobilePopOverEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobilePopOverEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobilePopOver()
    .Name("MobilePopOver")
    .Events(events => events
        .Close("onClose")
    )
    %>



