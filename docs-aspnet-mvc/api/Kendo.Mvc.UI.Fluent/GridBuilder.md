---
title: GridBuilder
---

# Kendo.Mvc.UI.Fluent.GridBuilder
The fluent API for configuring Kendo UI Grid for ASP.NET MVC.




## Methods


### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.DataSourceBuilder\<T\>\>)
Sets the data source configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.DataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DataSourceBuilder)<T>>
The lambda which configures the data source




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>


### DetailTemplate(System.Action\<T\>)
Sets the server-side detail template of the grid in ASPX views.


#### Parameters

##### codeBlockTemplate `System.Action<T>`
The template as a code block




#### Example (ASPX)
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable<Product>>" %>
    <% Html.Kendo().Grid(Model)
        .Name("grid")
        .DetailTemplate(product => {
            %>
            Product Details:
            <div>Product Name: <%: product.ProductName %></div>
            <div>Units In Stock: <%: product.UnitsInStock %></div>
            <%
        })
        .Render();
    %>


### DetailTemplate(System.Func\<T,System.Object\>)
Sets the server-side detail template of the grid in Razor views.


#### Parameters

##### inlineTemplate `System.Func<T,System.Object>`
The template




#### Example (Razor)
    @model IEnumerable<Product>
    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .DetailTemplate(@<text>
            Product Details:
            <div>Product Name: @product.ProductName</div>
            <div>Units In Stock: @product.UnitsInStock</div>
        </text>)
    )


### ClientDetailTemplateId(System.String)
Sets the id of the script element which contains the client-side detail template of the grid.


#### Parameters

##### id `System.String`
The id




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientDetailTemplateId("detail-template")
    )
    <script id="detail-template" type="text/x-kendo-template">
    Product Details:
    <div>Product Name: #: ProductName # </div>
    <div>Units In Stock: #: UnitsInStock #</div>
    </script>

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientDetailTemplateId("detail-template")
    %>
    <script id="detail-template" type="text/x-kendo-template">
    Product Details:
    <div>Product Name: #: ProductName # </div>
    <div>Units In Stock: #: UnitsInStock #</div>
    </script>


### RowTemplate(System.Action\<T,Kendo.Mvc.UI.Grid\<T\>\>)
Sets the server-side row template of the grid in ASPX views.


#### Parameters

##### codeBlockTemplate System.Action<T,[Kendo.Mvc.UI.Grid](/api/aspnet-mvc/Kendo.Mvc.UI/Grid)<T>>
The template as a code block




#### Example (ASPX)
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable<Product>>" %>
    <%: Html.Kendo().Grid(Model)
        .Name("grid")
        .RowTemplate((product, grid) =>
        {
            %>
            <div>Product Name: <%: product.ProductName %></div>
            <div>Units In Stock: <%: product.UnitsInStock %></div>
            <%
        })
    %>


### RowTemplate(System.Action\<T\>)
Sets the server-side row template of the grid in ASPX views.


#### Parameters

##### codeBlockTemplate `System.Action<T>`
The template as a code block




#### Example (ASPX)
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable<Product>>" %>
    <%: Html.Kendo().Grid(Model)
        .Name("grid")
        .RowTemplate(product =>
        {
            %>
            <div>Product Name: <%: product.ProductName %></div>
            <div>Units In Stock: <%: product.UnitsInStock %></div>
            <%
        })
    %>


### RowTemplate(System.Func\<T,System.Object\>)
Sets the server-side row template of the grid in Razor views.


#### Parameters

##### inlineTemplate `System.Func<T,System.Object>`
The template




#### Example (Razor)
    @model IEnumerable<Product>
    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .RowTemplate(@<text>
            <div>Product Name: @product.ProductName</div>
            <div>Units In Stock: @product.UnitsInStock</div>
        </text>)
    )


### RowTemplate(System.Func\<Kendo.Mvc.UI.Grid\<T\>,System.Func\<T,System.Object\>\>)
Sets the server-side row template of the grid in Razor views.


#### Parameters

##### inlineTemplate System.Func<[Kendo.Mvc.UI.Grid](/api/aspnet-mvc/Kendo.Mvc.UI/Grid)<T>,System.Func<T,System.Object>>
The template




#### Example (Razor)
    @model IEnumerable<Product>
    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .RowTemplate(grid => @<text>
                <div>Product Name: @product.ProductName</div>
                <div>Units In Stock: @product.UnitsInStock</div>
            </text>)
        )


### ClientRowTemplate(System.String)
Sets the client-side row template of the grid. The client-side row template must contain a table row element (tr).


#### Parameters

##### template `System.String`
The template




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientRowTemplate(
            "<tr>" +
            "<td>#: ProductName #</td>" +
            "<td>#: UnitsInStock #</td>" +
            "</tr>"
        )
    )

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientRowTemplate(
            "<tr>" +
            "<td>#: ProductName #</td>" +
            "<td>#: UnitsInStock #</td>" +
            "</tr>"
        )
    %>


### ClientAltRowTemplate(System.String)
Sets the client-side alt row template of the grid. The client-side alt row template must contain a table row element (tr).


#### Parameters

##### template `System.String`
The template




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientAltRowTemplate(
            "<tr class='k-alt'>" +
            "<td>#: ProductName #</td>" +
            "<td>#: UnitsInStock #</td>" +
            "</tr>"
        )
    )

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientAltRowTemplate(
            "<tr class='k-alt'>" +
            "<td>#: ProductName #</td>" +
            "<td>#: UnitsInStock #</td>" +
            "</tr>"
        )
    %>


### ClientRowTemplate(System.Func\<Kendo.Mvc.UI.Grid\<T\>,System.String\>)
Sets the client-side row template of the grid. The client-side row template must contain a table row element (tr).


#### Parameters

##### template System.Func<[Kendo.Mvc.UI.Grid](/api/aspnet-mvc/Kendo.Mvc.UI/Grid)<T>,System.String>
The template




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientRowTemplate(grid =>
            "<tr>" +
            "<td>#: ProductName #</td>" +
            "<td>#: UnitsInStock #</td>" +
            "</tr>"
        )
    )

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientRowTemplate(grid =>
            "<tr>" +
            "<td>#: ProductName #</td>" +
            "<td>#: UnitsInStock #</td>" +
            "</tr>"
        )
    %>


### ClientAltRowTemplate(System.Func\<Kendo.Mvc.UI.Grid\<T\>,System.String\>)
Sets the client-side alt row template of the grid. The client-side alt row template must contain a table row element (tr).


#### Parameters

##### template System.Func<[Kendo.Mvc.UI.Grid](/api/aspnet-mvc/Kendo.Mvc.UI/Grid)<T>,System.String>
The template




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientAltRowTemplate(grid =>
            "<tr>" +
            "<td>#: ProductName #</td>" +
            "<td>#: UnitsInStock #</td>" +
            "</tr>"
        )
    )

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ClientAltRowTemplate(grid =>
            "<tr>" +
            "<td>#: ProductName #</td>" +
            "<td>#: UnitsInStock #</td>" +
            "</tr>"
        )
    %>


### AutoBind(System.Boolean)
If set to false the widget will not bind to the data source during initialization; the default value is true.
            Setting AutoBind to false is supported in ajax-bound mode.


#### Parameters

##### value `System.Boolean`
If true the grid will be automatically data bound, otherwise false




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .AutoBind(false)
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .AutoBind(false)
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>


### AllowCopy(System.Boolean)
If set to true users can copy the selection to the clipboard and paste it to Excel or similar spreadsheet applications.
            Setting AllowCopy to true requires Selectable to be enabled.


#### Parameters

##### value `System.Boolean`
If true the grid will be automatically data bound, otherwise false




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .AllowCopy(false)
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
            .DataSource(dataSource =>
                // configure the data source
                dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .AllowCopy(false)
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
            .DataSource(dataSource =>
                // configure the data source
                dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
            )
            %>


### Resizable(System.Action\<Kendo.Mvc.UI.Fluent.GridResizingSettingsBuilder\>)
Sets the resizing configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridResizingSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridResizingSettingsBuilder)>
The lambda which configures the resizing




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .Resizable(resizing => resizing.Columns(true))
    )

#### Example (ASPX)
    <%= Html.Kendo().Grid<Product>()
    .Name("Grid")
    .DataSource(dataSource =>
        // configure the data source
        dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
    .Resizable(resizing => resizing.Columns(true))
    %>


### ColumnResizeHandleWidth(System.Int32)
Sets the width of the column resize handle. Apply a larger value for easier grasping.


#### Parameters

##### width `System.Int32`
width in pixels




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ColumnResizeHandleWidth(8)
    )

#### Example (ASPX)
    <%= Html.Kendo().Grid<Product>()
    .Name("Grid")
    .DataSource(dataSource =>
        // configure the data source
        dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
    .ColumnResizeHandleWidth(8)
    %>


### Reorderable(System.Action\<Kendo.Mvc.UI.Fluent.GridReorderingSettingsBuilder\>)
Sets the reordering configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridReorderingSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridReorderingSettingsBuilder)>
The lambda which configures the reordering




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .Reorderable(reordering => reordering.Columns(true))
    )

#### Example (ASPX)
    <%= Html.Kendo().Grid<Product>()
    .Name("Grid")
    .DataSource(dataSource =>
        // configure the data source
        dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
    .Reorderable(reordering => reordering.Columns(true))
    %>


### Editable(System.Action\<Kendo.Mvc.UI.Fluent.GridEditingSettingsBuilder\<T\>\>)
Sets the editing configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridEditingSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridEditingSettingsBuilder)<T>>
The lambda which configures the editing




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .Editable(editing => editing.Mode(GridEditMode.PopUp))
    )

#### Example (ASPX)
    <%= Html.Kendo().Grid<Product>()
    .Name("Grid")
    .DataSource(dataSource =>
        // configure the data source
        dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
    .Editable(editing => editing.Mode(GridEditMode.PopUp))
    %>


### Editable
Enables grid editing.




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .Editable()
    )

#### Example (ASPX)
    <%= Html.Kendo().Grid<Product>()
    .Name("Grid")
    .DataSource(dataSource =>
        // configure the data source
        dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
    .Editable()
    %>


### ToolBar(System.Action\<Kendo.Mvc.UI.Fluent.GridToolBarCommandFactory\<T\>\>)
Sets the toolbar configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridToolBarCommandFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridToolBarCommandFactory)<T>>
The lambda which configures the toolbar




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("Grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ToolBar(commands => commands.Create())
    )

#### Example (ASPX)
    <%= Html.Kendo().Grid<Product>()
    .Name("Grid")
    .DataSource(dataSource =>
        // configure the data source
        dataSource
        .Ajax()
        .Read(read => read.Action("Products_Read", "Home"))
    )
    .ToolBar(commands => commands.Create())
    %>


### BindTo(System.Collections.Generic.IEnumerable\<T\>)
Binds the grid to a list of objects


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T>`
The data source.




#### Example (ASPX)
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable<Product>>" %>
    &lt;%: Html.Kendo().Grid<Product>()
    .Name("grid")
    .BindTo(Model)
    %>

#### Example (Razor)
    @model IEnumerable<Product>
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .BindTo(Model)
    )


### BindTo(System.Collections.IEnumerable)
Binds the grid to a list of objects


#### Parameters

##### dataSource `System.Collections.IEnumerable`
The data source.




#### Example (ASPX)
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable>" %>
    &lt;%: Html.Kendo().Grid<Product>()
    .Name("grid")
    .BindTo(Model)
    %>

#### Example (Razor)
    @model IEnumerable;
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .BindTo(Model)
    )


### RowAction(System.Action\<Kendo.Mvc.UI.GridRow\<T\>\>)
Sets a lambda which is executed for every table row rendered server-side by the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.GridRow](/api/aspnet-mvc/Kendo.Mvc.UI/GridRow)<T>>
The lambda which will be executed for every table row




#### Example (ASPX)
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable>" %>
    &lt;%: Html.Kendo().Grid(Model)
    .Name("grid")
    .RowAction(row =>
    {
        // "DataItem" is the Product instance to which the current row is bound
        if (row.DataItem.UnitsInStock > 10)
    {
        //Set the background of the entire row
        row.HtmlAttributes["style"] = "background:red;";
        }
        });
    %>

#### Example (Razor)
    @model IEnumerable<Product>
    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .RowAction(row =>
        {
            // "DataItem" is the Product instance to which the current row is bound
            if (row.DataItem.UnitsInStock > 10)
        {
            //Set the background of the entire row
            row.HtmlAttributes["style"] = "background:red;";
            }
            });
        )


### CellAction(System.Action\<Kendo.Mvc.UI.GridCell\<T\>\>)
Sets a lambda which is executed for every table cell rendered server-side by the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.GridCell](/api/aspnet-mvc/Kendo.Mvc.UI/GridCell)<T>>
The lambda which will be executed for every table cell




#### Example (ASPX)
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable>" %>
    <%: Html.Kendo().Grid(Model)
        .Name("grid")
        .CellAction(cell =>
        {
            if (cell.Column.Member == "UnitsInStock")
        {
            if (cell.DataItem.UnitsInStock > 10)
        {
            //Set the background of this cell only
            cell.HtmlAttributes["style"] = "background:red;";
            }
            }
        })
    %>

#### Example (Razor)
    @model IEnumerable<Product>
    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .CellAction(cell =>
        {
            if (cell.Column.Member == "UnitsInStock")
        {
            if (cell.DataItem.UnitsInStock > 10)
        {
            //Set the background of this cell only
            cell.HtmlAttributes["style"] = "background:red;";
            }
            }
        })
    )


### EnableCustomBinding(System.Boolean)
If set to true the grid will perform custom binding.


#### Parameters

##### value `System.Boolean`
If true enables custom binding.




#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .EnableCustomBinding(true)
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .EnableCustomBinding(true)
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>


### Columns(System.Action\<Kendo.Mvc.UI.Fluent.GridColumnFactory\<T\>\>)
Sets the column configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridColumnFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridColumnFactory)<T>>
The lambda which configures columns




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.ProductName).Title("Product Name");
            columns.Command(command => command.Destroy());
        })
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Destroy(destroy => destroy.Action("Products_Destroy", "Home"))
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.ProductName).Title("Product Name");
            columns.Command(command => command.Destroy());
        })
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Destroy(destroy => destroy.Action("Products_Destroy", "Home"))
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Sortable
Enables grid column sorting.




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Sortable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Sortable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Sortable(System.Action\<Kendo.Mvc.UI.Fluent.GridSortSettingsBuilder\<T\>\>)
Sets the sorting configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridSortSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridSortSettingsBuilder)<T>>
The lambda which configures the sorting




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Sortable(sorting => sorting.SortMode(GridSortMode.MultipleColumn))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Sortable(sorting => sorting.SortMode(GridSortMode.MultipleColumn))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Selectable
Enables grid row selection.




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Selectable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Selectable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Selectable(System.Action\<Kendo.Mvc.UI.Fluent.GridSelectionSettingsBuilder\>)
Sets the selection configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridSelectionSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridSelectionSettingsBuilder)>
The lambda which configures the selection




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Selectable(selection => selection.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Selectable(selection => selection.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### PrefixUrlParameters(System.Boolean)
If set to true the grid will prefix the query string parameters with its name during server binding.
            By default the grid will prefix the query string parameters.




#### Example (ASPX)
    <%@Page Inherits="System.Web.Mvc.ViewPage<IEnumerable<Product>>" %>
    <%: Html.Kendo().Grid(Model)
        .Name("grid")
        .PrefixUrlParameters(false)
    %>

#### Example (Razor)
    @model IEnumerable<Product>
    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .PrefixUrlParameters(false)
    )


### Pageable
Enables grid paging.




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Pageable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Pageable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Pageable(System.Action\<Kendo.Mvc.UI.Fluent.PageableBuilder\>)
Sets the paging configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.PageableBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PageableBuilder)>
The lambda which configures the paging




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Pageable(paging =>
            paging.Refresh(true)
        )
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Pageable(paging =>
            paging.Refresh(true)
        )
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Filterable
Enables grid filtering.




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Filterable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Filterable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Filterable(System.Action\<Kendo.Mvc.UI.Fluent.GridFilterableSettingsBuilder\>)
Sets the filtering configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridFilterableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridFilterableSettingsBuilder)>
The lambda which configures the filtering




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Filterable(filtering => filtering.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Filterable(filtering => filtering.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### ColumnMenu
Enables the grid column menu.




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ColumnMenu()
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ColumnMenu()
    )


### ColumnMenu(System.Action\<Kendo.Mvc.UI.Fluent.GridColumnMenuSettingsBuilder\>)
Sets the column menu configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridColumnMenuSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridColumnMenuSettingsBuilder)>
The lambda which configures the column menu




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ColumnMenu(columnMenu => columnMenu.Enabled(true))
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .ColumnMenu(columnMenu => columnMenu.Enabled(true))
    )


### Scrollable
Enables grid scrolling.




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Scrollable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Scrollable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Scrollable(System.Action\<Kendo.Mvc.UI.Fluent.GridScrollSettingsBuilder\>)
Sets the scrolling configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridScrollSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridScrollSettingsBuilder)>
The lambda which configures the scrolling




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Scrollable(scrolling => scrolling.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Scrollable(scrolling => scrolling.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Navigatable
Enables grid keyboard navigation.




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Navigatable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Navigatable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Navigatable(System.Action\<Kendo.Mvc.UI.Fluent.GridNavigatableSettingsBuilder\>)
Sets the keyboard navigation configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridNavigatableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridNavigatableSettingsBuilder)>
The lambda which configures the keyboard navigation




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Navigatable(navigation => navigation.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Navigatable(navigation => navigation.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Events(System.Action\<Kendo.Mvc.UI.Fluent.GridEventBuilder\>)
Sets the event configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridEventBuilder)>
The lambda which configures the events




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .Events(events => events.DataBound("grid_dataBound"))
    %>
    <script>
    function grid_dataBound(e) {
    // handle the dataBound event
    }
    </script>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
        .Events(events => events.DataBound("grid_dataBound"))
    )
    <script>
    function grid_dataBound(e) {
    // handle the dataBound event
    }
    </script>


### Groupable(System.Action\<Kendo.Mvc.UI.Fluent.GridGroupingSettingsBuilder\>)
Sets the grouping configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridGroupingSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridGroupingSettingsBuilder)>
The lambda which configures the grouping




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Groupable(grouping => grouping.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Groupable(grouping => grouping.Enabled(true))
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Groupable
Enables grid grouping.




#### Example (ASPX)
    <%:Html.Kendo().Grid<Product>()
        .Name("grid")
        .Groupable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example (Razor)
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Groupable()
        .DataSource(dataSource =>
            // configure the data source
            dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )


### Mobile
Enables the adaptive rendering when viewed on mobile browser





### Mobile(Kendo.Mvc.UI.MobileMode)
Used to determine if adaptive rendering should be used when viewed on mobile browser


#### Parameters

##### type [Kendo.Mvc.UI.MobileMode](/api/aspnet-mvc/Kendo.Mvc.UI/MobileMode)






### NoRecords(System.Action\<Kendo.Mvc.UI.Fluent.GridNoRecordsSettingsBuilder\>)
Sets the noRecords configuration of the grid.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.GridNoRecordsSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridNoRecordsSettingsBuilder)>
The lambda which configures the noRecords





### NoRecords
Enables grid noRecords.





### NoRecords(System.String)
Enables grid noRecords and sets it's message.


#### Parameters

##### text `System.String`
The message used for noRecords






