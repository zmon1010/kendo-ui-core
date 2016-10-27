---
title: ToolBarBuilder
---

# Kendo.Mvc.UI.Fluent.ToolBarBuilder
Defines the fluent API for configuring the Kendo ToolBar for ASP.NET MVC.




## Methods


### Resizable(System.Boolean)
If resizable is set to true the widget will detect changes in the viewport width and hides the overflowing controls in the command overflow popup.


#### Parameters

##### value `System.Boolean`
The value that configures the resizable.





### Items(System.Action\<Kendo.Mvc.UI.Fluent.ToolBarItemFactory\>)
A JavaScript array that contains the ToolBar's commands configuration.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ToolBarItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ToolBarItemFactory)>
The action that configures the items.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.ToolBarEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ToolBarEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ToolBarEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().ToolBar()
    .Name("ToolBar")
    .Events(events => events
        .Click("onClick")
    )
    %>



