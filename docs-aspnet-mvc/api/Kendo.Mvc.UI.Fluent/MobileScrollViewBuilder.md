---
title: MobileScrollViewBuilder
---

# Kendo.Mvc.UI.Fluent.MobileScrollViewBuilder
Defines the fluent API for configuring the Kendo MobileScrollView for ASP.NET MVC.




## Methods


### AutoBind(System.Boolean)
If set to false the widget will not bind to the DataSource during initialization. In this case data binding will occur when the change event of the data source is fired. By default the widget will bind to the DataSource specified in the configuration.Applicable only in data bound mode.


#### Parameters

##### value `System.Boolean`
The value that configures the autobind.





### Duration(System.Int32)
The milliseconds that take the ScrollView to snap to the current page after released.


#### Parameters

##### value `System.Int32`
The value that configures the duration.





### EmptyTemplateId(System.String)
The template which is used to render the pages without content. By default the ScrollView renders a blank page.Applicable only in data bound mode.


#### Parameters

##### value `System.String`
The value that configures the emptytemplateid.





### EnablePager(System.Boolean)
If set to true the ScrollView will display a pager. By default pager is enabled.


#### Parameters

##### value `System.Boolean`
The value that configures the enablepager.





### ItemsPerPage(System.Int32)
Determines how many data items will be passed to the page template.Applicable only in data bound mode.


#### Parameters

##### value `System.Int32`
The value that configures the itemsperpage.





### Page(System.Int32)
The initial page to display.


#### Parameters

##### value `System.Int32`
The value that configures the page.





### TemplateId(System.String)
The template which is used to render the content of pages. By default the ScrollView renders a div element for every page.Applicable only in data bound mode.


#### Parameters

##### value `System.String`
The value that configures the templateid.





### ItemTagName(System.String)
Specifies the tag name of the item element. By default it will be `div` element


#### Parameters

##### value `System.String`
The value that configures the itemtagname.





### FitItemPerPage(System.Boolean)
Specifies whether exactly one item per page must be shown


#### Parameters

##### value `System.Boolean`
The value that configures the fititemperpage.





### ContentHeight(System.String)
The height of the ScrollView content.


#### Parameters

##### value `System.String`
The value that configures the contentheight.





### BounceVelocityThreshold(System.Double)
The velocity threshold after which a swipe will result in a bounce effect.


#### Parameters

##### value `System.Double`
The value that configures the bouncevelocitythreshold.





### PageSize(System.Double)
Multiplier applied to the snap amount of the ScrollView. By default, the widget scrolls to the next screen when swipe. If the pageSize property is set to 0.5, the ScrollView will scroll by half of the widget width.


#### Parameters

##### value `System.Double`
The value that configures the pagesize.





### VelocityThreshold(System.Double)
The velocity threshold after which a swipe will navigate to the next page (as opposed to snapping back to the current page).


#### Parameters

##### value `System.Double`
The value that configures the velocitythreshold.





### Items(System.Action\<Kendo.Mvc.UI.Fluent.MobileScrollViewItemFactory\>)
Contains the items of the ScrollView widget


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileScrollViewItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileScrollViewItemFactory)>
The action that configures the items.





### ContentHeight(System.Int32)
The height of the ScrollView content.


#### Parameters

##### value `System.Int32`
The value that configures the contentheight.





### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder\>)
Instance of DataSource or the data that the mobile ScrollView will be bound to.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ReadOnlyDataSourceBuilder)>
The value that configures the datasource.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileScrollViewEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileScrollViewEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileScrollViewEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileScrollView()
    .Name("MobileScrollView")
    .Events(events => events
        .Change("onChange")
    )
    %>



