---
title: MobileSplitViewBuilder
---

# Kendo.Mvc.UI.Fluent.MobileSplitViewBuilder
Defines the fluent API for configuring the Kendo MobileSplitView for ASP.NET MVC.




## Methods


### Style(Kendo.Mvc.UI.MobileSplitViewStyle)
Defines the SplitView style - horizontal or vertical.


#### Parameters

##### value [Kendo.Mvc.UI.MobileSplitViewStyle](/api/aspnet-mvc/Kendo.Mvc.UI/MobileSplitViewStyle)
The value that configures the style.





### Panes(System.Action\<Kendo.Mvc.UI.Fluent.MobileSplitViewPaneFactory\>)
Contains the panes of the splitview widget


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileSplitViewPaneFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileSplitViewPaneFactory)>
The action that configures the panes.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileSplitViewEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileSplitViewEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileSplitViewEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileSplitView()
    .Name("MobileSplitView")
    .Events(events => events
        .Init("onInit")
    )
    %>



