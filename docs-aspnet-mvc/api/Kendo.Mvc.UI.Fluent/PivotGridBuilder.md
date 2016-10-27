---
title: PivotGridBuilder
---

# Kendo.Mvc.UI.Fluent.PivotGridBuilder
Defines the fluent interface for configuring the PivotGrid.




## Methods


### AutoBind(System.Boolean)
If set to false the initial binding will be prevented.


#### Parameters

##### autoBind `System.Boolean`
The autoBind





### Configurator(System.String)
Use it to set the Id of the PivotConfigurator.


#### Parameters

##### configurator `System.String`
The configurator





### ColumnWidth(System.Int32)
Use it to set the column width of the Pivot.


#### Parameters

##### columnWidth `System.Int32`
The column width.





### Height(System.Int32)
Use it to set the height of the Pivot.


#### Parameters

##### height `System.Int32`
The height





### Reorderable(System.Boolean)
If set to false the user will not be able to add/close/reorder current fields for columns/rows/measures.


#### Parameters

##### reorderable `System.Boolean`
The reorderable





### Filterable(System.Boolean)
If set to true the user will be able to filter by using the field menu.


#### Parameters

##### filterable `System.Boolean`
The filterable





### Sortable
Enables grid column sorting.




#### Example (ASPX)
    <%:Html.Kendo().PivotGrid()
        .Name("pivotgrid")
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
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
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


### Sortable(System.Action\<Kendo.Mvc.UI.Fluent.PivotGridSortSettingsBuilder\>)
Sets the sorting configuration of the pivotgrid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.PivotGridSortSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PivotGridSortSettingsBuilder)>
The lambda which configures the sorting




#### Example (ASPX)
    <%:Html.Kendo().PivotGrid()
        .Name("pivotgrid")
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
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
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


### Events(System.Action\<Kendo.Mvc.UI.Fluent.PivotGridEventBuilder\>)
Configures the client-side events





### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.PivotDataSourceBuilder\<T\>\>)
Sets the data source configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.PivotDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PivotDataSourceBuilder)<T>>
The lambda which configures the data source





### BindTo(System.Collections.Generic.IEnumerable\<T\>)
Binds the pivotGrid to a list of objects


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T>`
The data source.





### Messages(System.Action\<Kendo.Mvc.UI.Fluent.PivotGridMessagesBuilder\>)
Sets the messages of the pivotGrid.


#### Parameters

##### addViewAction System.Action<[Kendo.Mvc.UI.Fluent.PivotGridMessagesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PivotGridMessagesBuilder)>
The lambda which configures the pivotGrid messages





### DataCellTemplate(System.String)
Sets the data cell template of the pivot grid.


#### Parameters

##### template `System.String`
The template




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .DataCellTemplate("#: dataItem.fmtValue #")
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


### DataCellTemplateId(System.String)
Sets the data cell template of the pivot grid.


#### Parameters

##### templateId `System.String`
The template id




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .DataCellTemplateId("dataCellTemplateId")
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


### KPIStatusTemplate(System.String)
Sets the KPI Status template of the pivot grid.


#### Parameters

##### template `System.String`
The template




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .KPIStatusTemplate("#: dataItem.value #")
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


### KPIStatusTemplateId(System.String)
Sets the KPI Status template of the pivot grid.


#### Parameters

##### templateId `System.String`
The template id




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .KPIStatusTemplateId("kpiStatusTemplateId")
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


### KPITrendTemplate(System.String)
Sets the KPI Trend template of the pivot grid.


#### Parameters

##### template `System.String`
The template




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .KPITrendTemplate("#: dataItem.value #")
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


### KPITrendTemplateId(System.String)
Sets the KPI Trend template of the pivot grid.


#### Parameters

##### templateId `System.String`
The template id




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .KPITrendTemplateId("kpiTrendTemplateId")
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


### ColumnHeaderTemplate(System.String)
Sets the column header cell template of the pivot grid.


#### Parameters

##### template `System.String`
The template




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .ColumnHeaderTemplate("#: member.caption #")
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


### ColumnHeaderTemplateId(System.String)
Sets the column header cell template of the pivot grid.


#### Parameters

##### templateId `System.String`
The template id




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .ColumnHeaderTemplateId("columnHeaderTemplateId")
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


### RowHeaderTemplate(System.String)
Sets the row header cell template of the pivot grid.


#### Parameters

##### template `System.String`
The template




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .RowHeaderTemplate("#: member.caption #")
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


### RowHeaderTemplateId(System.String)
Sets the row header cell template of the pivot grid.


#### Parameters

##### templateId `System.String`
The template id




#### Example (Razor)
    @(Html.Kendo().PivotGrid()
        .Name("pivotgrid")
        .RowHeaderTemplateId("rowHeaderTemplateId")
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



