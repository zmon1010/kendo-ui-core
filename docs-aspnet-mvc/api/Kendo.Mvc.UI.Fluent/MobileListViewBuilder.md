---
title: MobileListViewBuilder
---

# Kendo.Mvc.UI.Fluent.MobileListViewBuilder
Defines the fluent API for configuring the Kendo MobileListView for ASP.NET MVC.




## Methods


### BindTo(System.Collections.Generic.IEnumerable\<T\>)
Binds the MobileListView to a list of objects


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().MobileListView<Order>()
    .Name("Orders")
    .BindTo((IEnumerable<Order>)ViewData["Orders"]);
    %>


### BindTo(System.Collections.IEnumerable)
Binds the MobileListView to a list of objects


#### Parameters

##### dataSource `System.Collections.IEnumerable`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().MobileListView<Order>()
    .Name("Orders")
    .BindTo((IEnumerable)ViewData["Orders"]);
    %>


### AppendOnRefresh(System.Boolean)
Used in combination with pullToRefresh. If set to true, newly loaded data will be appended on top when refershing.


#### Parameters

##### value `System.Boolean`
The value that configures the appendonrefresh.





### AutoBind(System.Boolean)
Indicates whether the listview will call read on the DataSource initially.


#### Parameters

##### value `System.Boolean`
The value that configures the autobind.





### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.AjaxDataSourceBuilder\<T\>\>)
Instance of DataSource or the data that the mobile ListView will be bound to.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.AjaxDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/AjaxDataSourceBuilder)<T>>
The value that configures the datasource.





### EndlessScroll(System.Boolean)
If set to true, the listview gets the next page of data when the user scrolls near the bottom of the view.


#### Parameters

##### value `System.Boolean`
The value that configures the endlessscroll.





### FixedHeaders(System.Boolean)
If set to true, the group headers will persist their position when the user scrolls through the listview. Applicable only when the type is set to group, or when binding to grouped datasource.


#### Parameters

##### value `System.Boolean`
The value that configures the fixedheaders.





### HeaderTemplateId(System.String)
The header item template (applicable when the type is set to group).


#### Parameters

##### value `System.String`
The value that configures the headertemplate.





### LoadMore(System.Boolean)
If set to true, a button is rendered at the bottom of the listview, which fetch the next page of data when tapped.


#### Parameters

##### value `System.Boolean`
The value that configures the loadmore.





### LoadMoreText(System.String)
The text of the rendered load-more button (applies only if loadMore is set to true).


#### Parameters

##### value `System.String`
The value that configures the loadmoretext.





### PullTemplateId(System.String)
The message template displayed when the user pulls the listView. Applicable only when pullToRefresh is set to true.


#### Parameters

##### value `System.String`
The value that configures the pulltemplate.





### PullToRefresh(System.Boolean)
If set to true, the listview will reload its data when the user pulls the view over the top limit.


#### Parameters

##### value `System.Boolean`
The value that configures the pulltorefresh.





### RefreshTemplateId(System.String)
The message template displayed during the refresh. Applicable only when pullToRefresh is set to true.


#### Parameters

##### value `System.String`
The value that configures the refreshtemplate.





### ReleaseTemplateId(System.String)
The message template indicating that pullToRefresh will occur. Applicable only when pullToRefresh is set to true.


#### Parameters

##### value `System.String`
The value that configures the releasetemplate.





### ScrollTreshold(System.String)
The distance to the bottom in pixels, after which the listview will start fetching the next page. Applicable only when endlessScroll is set to true.


#### Parameters

##### value `System.String`
The value that configures the scrolltreshold.





### ScrollTreshold(System.Int32)
The distance to the bottom in pixels, after which the listview will start fetching the next page. Applicable only when endlessScroll is set to true.


#### Parameters

##### value `System.Int32`
The value that configures the scrolltreshold.





### Style(System.String)
The style of the control. Can be either empty string(""), or inset.


#### Parameters

##### value `System.String`
The value that configures the style.





### TemplateId(System.String)
The item template.


#### Parameters

##### value `System.String`
The value that configures the template.





### Type(System.String)
The type of the control. Can be either flat (default) or group. Determined automatically in databound mode.


#### Parameters

##### value `System.String`
The value that configures the type.





### Filterable(System.Action\<Kendo.Mvc.UI.Fluent.MobileListViewFilterableSettingsBuilder\>)
Indicates whether the filter input must be visible or not.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileListViewFilterableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileListViewFilterableSettingsBuilder)>
The action that configures the filterable.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileListViewEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileListViewEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileListViewEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileListView<Order>()
    .Name("MobileListView")
    .Events(events => events
        .Click("onClick")
    )
    %>


### Items(System.Action\<Kendo.Mvc.UI.Fluent.MobileListViewItemFactory\>)
Builds MobileListView items.


#### Parameters

##### action System.Action<[Kendo.Mvc.UI.Fluent.MobileListViewItemFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileListViewItemFactory)>
Action for declaratively building MobileListView items.






