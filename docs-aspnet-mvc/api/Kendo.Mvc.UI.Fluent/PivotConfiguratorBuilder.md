---
title: PivotConfiguratorBuilder
---

# Kendo.Mvc.UI.Fluent.PivotConfiguratorBuilder
Defines the fluent interface for configuring the PivotConfigurator.




## Methods


### Height(System.Int32)
Use it to set the height of the Pivot.


#### Parameters

##### height `System.Int32`
The height





### Filterable(System.Boolean)
If set to true the user will be able to filter by using the field menu.


#### Parameters

##### filterable `System.Boolean`
The filterable





### Sortable
Enables grid column sorting.




#### Example (ASPX)
    <%:Html.Kendo().PivotConfigurator()
        .Name("pivotconfigurator")
        .Sortable()
        .DataSource(dataSource =>
            dataSource.Xmla()
            .Columns(columns => columns.Add("[Date].[Calendar]").Expand(true))
            .Rows(rows => rows.Add("[Geography].[City]"))
            .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
            .Transport(transport => transport
                .Connection(connection => connection
                    .Catalog("Adventure Works DW 2008R2")
                    .Cube("Adventure Works"))
                    .Read(read => read
                        .Url("http://demos.telerik.com/olap/msmdpump.dll")
                        .DataType("text")
                        .ContentType("text/xml")
                        .Type(HttpVerbs.Post)
                    )
                )
            )
            %>

#### Example (Razor)
    @(Html.Kendo().PivotConfigurator()
        .Name("pivotconfigurator")
        .Sortable()
        .DataSource(dataSource =>
            dataSource.Xmla()
            .Columns(columns => columns.Add("[Date].[Calendar]").Expand(true))
            .Rows(rows => rows.Add("[Geography].[City]"))
            .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
            .Transport(transport => transport
                .Connection(connection => connection
                    .Catalog("Adventure Works DW 2008R2")
                    .Cube("Adventure Works"))
                    .Read(read => read
                        .Url("http://demos.telerik.com/olap/msmdpump.dll")
                        .DataType("text")
                        .ContentType("text/xml")
                        .Type(HttpVerbs.Post)
                    )
                )
            )
        )


### Sortable(System.Action\<Kendo.Mvc.UI.Fluent.PivotConfiguratorSortSettingsBuilder\>)
Sets the sorting configuration of the pivotgrid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.PivotConfiguratorSortSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PivotConfiguratorSortSettingsBuilder)>
The lambda which configures the sorting




#### Example (ASPX)
    <%:Html.Kendo().PivotConfigurator()
        .Name("pivotconfigurator")
        .Sortable(sorting => sorting.AllowUnsort(true))
        .DataSource(dataSource =>
            dataSource.Xmla()
            .Columns(columns => columns.Add("[Date].[Calendar]").Expand(true))
            .Rows(rows => rows.Add("[Geography].[City]"))
            .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
            .Transport(transport => transport
                .Connection(connection => connection
                    .Catalog("Adventure Works DW 2008R2")
                    .Cube("Adventure Works"))
                    .Read(read => read
                        .Url("http://demos.telerik.com/olap/msmdpump.dll")
                        .DataType("text")
                        .ContentType("text/xml")
                        .Type(HttpVerbs.Post)
                    )
                )
            )
            %>

#### Example (Razor)
    @(Html.Kendo().PivotConfigurator()
        .Name("pivotconfigurator")
        .Sortable(sorting => sorting.AllowUnsort(true))
        .DataSource(dataSource =>
            dataSource.Xmla()
            .Columns(columns => columns.Add("[Date].[Calendar]").Expand(true))
            .Rows(rows => rows.Add("[Geography].[City]"))
            .Measures(measures => measures.Values(new string[]{"[Measures].[Internet Sales Amount]"}))
            .Transport(transport => transport
                .Connection(connection => connection
                    .Catalog("Adventure Works DW 2008R2")
                    .Cube("Adventure Works"))
                    .Read(read => read
                        .Url("http://demos.telerik.com/olap/msmdpump.dll")
                        .DataType("text")
                        .ContentType("text/xml")
                        .Type(HttpVerbs.Post)
                    )
                )
            )
        )


### Messages(System.Action\<Kendo.Mvc.UI.Fluent.PivotConfiguratorMessagesBuilder\>)
Sets the messages of the pivotConfigurator.


#### Parameters

##### addViewAction System.Action<[Kendo.Mvc.UI.Fluent.PivotConfiguratorMessagesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PivotConfiguratorMessagesBuilder)>
The lambda which configures the pivotConfigurator messages






