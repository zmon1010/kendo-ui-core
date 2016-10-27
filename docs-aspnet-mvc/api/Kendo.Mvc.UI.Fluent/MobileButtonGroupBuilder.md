---
title: MobileButtonGroupBuilder
---

# Kendo.Mvc.UI.Fluent.MobileButtonGroupBuilder
Defines the fluent API for configuring the Kendo MobileButtonGroup for ASP.NET MVC.




## Methods


### Enable(System.Boolean)
Defines if the widget is initially enabled or disabled.


#### Parameters

##### value `System.Boolean`
The value that configures the enable.





### Index(System.Int32)
Defines the initially selected Button (zero based index).


#### Parameters

##### value `System.Int32`
The value that configures the index.





### SelectOn(System.String)
Sets the DOM event used to select the button. Accepts "up" as an alias for touchend, mouseup and MSPointerUp vendor specific events.By default, buttons are selected immediately after the user presses the button (on touchstart or mousedown or MSPointerDown, depending on the mobile device).
            However, if the widget is placed in a scrollable view, the user may accidentally press the button when scrolling. In such cases, it is recommended to set this option to "up".


#### Parameters

##### value `System.String`
The value that configures the selecton.





### Items(System.Action\<Kendo.Mvc.UI.Fluent.MobileButtonGroupItemFactory\>)
Contains the items of the button group widget


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileButtonGroupItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileButtonGroupItemFactory)>
The action that configures the items.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileButtonGroupEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileButtonGroupEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileButtonGroupEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileButtonGroup()
    .Name("MobileButtonGroup")
    .Events(events => events
        .Select("onSelect")
    )
    %>



