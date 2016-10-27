---
title: ListViewBuilder
---

# Kendo.Mvc.UI.Fluent.ListViewBuilder
Defines the fluent interface for configuring the 1.




## Methods


### BindTo(System.Collections.Generic.IEnumerable\<T\>)
Binds the ListView to a list of objects


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().ListView<Order>()
    .Name("Orders")
    .BindTo((IEnumerable<Order>)ViewData["Orders"]);
    %>


### BindTo(System.Collections.IEnumerable)
Binds the ListView to a list of objects


#### Parameters

##### dataSource `System.Collections.IEnumerable`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().ListView<Order>()
    .Name("Orders")
    .BindTo((IEnumerable)ViewData["Orders"]);
    %>


### ClientTemplateId(System.String)
Specifies ListView item template.


#### Parameters

##### templateId `System.String`
The Id of the element which contains the template.




#### Example (ASPX)
    <%= Html.Kendo().ListView<Order>()
    .Name("Orders")
    .ClientTemplateId("listViewTemplate");
    %>


### ClientAltTemplateId(System.String)
Specifies ListView alt item template.


#### Parameters

##### templateId `System.String`
The Id of the element which contains the template.




#### Example (ASPX)
    <%= Html.Kendo().ListView<Order>()
    .Name("Orders")
    .ClientAltTemplateId("listViewTemplate");
    %>


### Pageable
Allows paging of the data.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("ListView")
    .Ajax(ajax => ajax.Action("Orders", "ListView"))
    .Pageable();
    %>


### Pageable(System.Action\<Kendo.Mvc.UI.Fluent.PageableBuilder\>)
Allows paging of the data.


#### Parameters

##### pagerAction System.Action<[Kendo.Mvc.UI.Fluent.PageableBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PageableBuilder)>
Use builder to define paging settings.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("Grid")
    .Ajax(ajax => ajax.Action("Orders", "ListView"))
    .Pageable(paging => paging.Enabled(true))
    %>


### Navigatable
Enables keyboard navigation.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("ListView")
    .Ajax(ajax => ajax.Action("Orders", "ListView"))
    .Navigatable();
    %>


### Selectable
Enables single item selection.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("ListView")
    .Selectable()
    %>


### Selectable(System.Action\<Kendo.Mvc.UI.Fluent.ListViewSelectionSettingsBuilder\>)
Enables item selection.


#### Parameters

##### selectionAction System.Action<[Kendo.Mvc.UI.Fluent.ListViewSelectionSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ListViewSelectionSettingsBuilder)>
Use builder to define the selection mode.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("ListView")
    .Selectable(selection => {
        selection.Enabled(true);
        selection.Mode(ListViewSelectionMode.Multiple);
    })
    %>


### AutoBind(System.Boolean)
Specifies if the ListView should be automatically bound on initial load. 
            This is only possible if AJAX binding is used, and widget is not initialy populated on the server.


#### Parameters

##### value `System.Boolean`
If true ListView will be automatically data bound, otherwise false





### TagName(System.String)
Specifies ListView wrapper element tag name.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("ListView")
    .TagName("div")
    %>


### Editable(System.Action\<Kendo.Mvc.UI.Fluent.ListViewEditingSettingsBuilder\<T\>\>)
Configures the ListView editing settings.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("ListView")
    .Editable(settings => settings.Enabled(true))
    %>


### Editable
Enables ListView editing.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("ListView")
    .Editable()
    %>


### Events(System.Action\<Kendo.Mvc.UI.Fluent.ListViewEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ListViewEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ListViewEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().ListView()
    .Name("ListView")
    .Events(events => events
        .DataBound("onDataBound")
    )
    %>



