---
title: MobileTabStripBuilder
---

# Kendo.Mvc.UI.Fluent.MobileTabStripBuilder
Defines the fluent API for configuring the Kendo MobileTabStrip for ASP.NET MVC.




## Methods


### SelectedIndex(System.Int32)
The index of the initially selected tab.


#### Parameters

##### value `System.Int32`
The value that configures the selectedindex.





### Items(System.Action\<Kendo.Mvc.UI.Fluent.MobileTabStripItemFactory\>)
Contains the items of the tabstrip widget


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileTabStripItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileTabStripItemFactory)>
The action that configures the items.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileTabStripEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileTabStripEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileTabStripEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileTabStrip()
    .Name("MobileTabStrip")
    .Events(events => events
        .Select("onSelect")
    )
    %>



