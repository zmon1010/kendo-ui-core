---
title: ChartEventBuilder
---

# Kendo.Mvc.UI.Fluent.ChartEventBuilder
Defines the fluent interface for configuring the ChartEventBuilder.




## Methods


### DataBound(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the DataBound client-side event

For additional information check the [dataBound event](/api/javascript/dataviz/ui/chart#events-dataBound) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.DataBound(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### DataBound(System.String)
Defines the name of the JavaScript function that will handle the the DataBound client-side event.

For additional information check the [dataBound event](/api/javascript/dataviz/ui/chart#events-dataBound) documentation.


#### Parameters

##### onDataBoundHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.DataBound("onDataBound"))
    %>


### SeriesClick(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the SeriesClick client-side event

For additional information check the [seriesClick event](/api/javascript/dataviz/ui/chart#events-seriesClick) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.SeriesClick(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### SeriesClick(System.String)
Defines the name of the JavaScript function that will handle the the SeriesClick client-side event.

For additional information check the [seriesClick event](/api/javascript/dataviz/ui/chart#events-seriesClick) documentation.


#### Parameters

##### onSeriesClickHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.SeriesClick("onSeriesClick"))
    %>


### SeriesHover(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the SeriesHover client-side event

For additional information check the [seriesHover event](/api/javascript/dataviz/ui/chart#events-seriesHover) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.SeriesHover(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### SeriesHover(System.String)
Defines the name of the JavaScript function that will handle the the SeriesHover client-side event.

For additional information check the [seriesHover event](/api/javascript/dataviz/ui/chart#events-seriesHover) documentation.


#### Parameters

##### onSeriesHoverHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.SeriesHover("onSeriesHover"))
    %>


### AxisLabelClick(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the AxisLabelClick client-side event

For additional information check the [axisLabelClick event](/api/javascript/dataviz/ui/chart#events-axisLabelClick) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.AxisLabelClick(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### AxisLabelClick(System.String)
Defines the name of the JavaScript function that will handle the the AxisLabelClick client-side event.

For additional information check the [axisLabelClick event](/api/javascript/dataviz/ui/chart#events-axisLabelClick) documentation.


#### Parameters

##### onAxisLabelClickHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.AxisLabelClick("onAxisLabelClick"))
    %>


### LegendItemClick(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the LegendItemClick client-side event

For additional information check the [legendItemClick event](/api/javascript/dataviz/ui/chart#events-legendItemClick) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.LegendItemClick(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### LegendItemClick(System.String)
Defines the name of the JavaScript function that will handle the the LegendItemClick client-side event.

For additional information check the [legendItemClick event](/api/javascript/dataviz/ui/chart#events-legendItemClick) documentation.


#### Parameters

##### onLegendLabelClickHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.LegendItemClick("onLegendItemClick"))
    %>


### LegendItemHover(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the LegendItemHover client-side event

For additional information check the [legendItemHover event](/api/javascript/dataviz/ui/chart#events-legendItemHover) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.LegendItemHover(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### LegendItemHover(System.String)
Defines the name of the JavaScript function that will handle the the LegendItemHover client-side event.

For additional information check the [legendItemHover event](/api/javascript/dataviz/ui/chart#events-legendItemHover) documentation.


#### Parameters

##### onLegendItemHoverHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.LegendItemHover("onLegendItemHover"))
    %>


### DragStart(System.String)
Defines the name of the JavaScript function that will handle the the DragStart client-side event.

For additional information check the [dragStart event](/api/javascript/dataviz/ui/chart#events-dragStart) documentation.


#### Parameters

##### onDragStartHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.DragStart("onDragStart"))
    %>


### DragStart(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the DragStart client-side event

For additional information check the [dragStart event](/api/javascript/dataviz/ui/chart#events-dragStart) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.DragStart(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Drag(System.String)
Defines the name of the JavaScript function that will handle the the Drag client-side event.

For additional information check the [drag event](/api/javascript/dataviz/ui/chart#events-drag) documentation.


#### Parameters

##### onDragHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.Drag("onDrag"))
    %>


### Drag(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Drag client-side event

For additional information check the [drag event](/api/javascript/dataviz/ui/chart#events-drag) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.Drag(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### DragEnd(System.String)
Defines the name of the JavaScript function that will handle the the DragEnd client-side event.

For additional information check the [dragEnd event](/api/javascript/dataviz/ui/chart#events-dragEnd) documentation.


#### Parameters

##### onDragEndHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.DragEnd("onDragEnd"))
    %>


### DragEnd(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the DragEnd client-side event

For additional information check the [dragEnd event](/api/javascript/dataviz/ui/chart#events-dragEnd) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.DragEnd(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### PlotAreaClick(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the PlotAreaClick client-side event

For additional information check the [plotAreaClick event](/api/javascript/dataviz/ui/chart#events-plotAreaClick) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.PlotAreaClick(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### PlotAreaClick(System.String)
Defines the name of the JavaScript function that will handle the the PlotAreaClick client-side event.

For additional information check the [plotAreaClick event](/api/javascript/dataviz/ui/chart#events-plotAreaClick) documentation.


#### Parameters

##### onPlotAreaClickHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.PlotAreaClick("onPlotAreaClick"))
    %>


### PlotAreaHover(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the PlotAreaHover client-side event

For additional information check the [plotAreaHover event](/api/javascript/dataviz/ui/chart#events-plotAreaHover) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.PlotAreaHover(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### PlotAreaHover(System.String)
Defines the name of the JavaScript function that will handle the the PlotAreaHover client-side event.

For additional information check the [plotAreaHover event](/api/javascript/dataviz/ui/chart#events-plotAreaHover) documentation.


#### Parameters

##### onPlotAreaHoverHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.PlotAreaHover("onPlotAreaHover"))
    %>


### Render(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Render client-side event

For additional information check the [render event](/api/javascript/dataviz/ui/chart#events-render) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.Render(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Render(System.String)
Defines the name of the JavaScript function that will handle the the Render client-side event.

For additional information check the [render event](/api/javascript/dataviz/ui/chart#events-render) documentation.


#### Parameters

##### onPlotAreaClickHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.Render("onRender"))
    %>


### ZoomStart(System.String)
Defines the name of the JavaScript function that will handle the the ZoomStart client-side event.

For additional information check the [zoomStart event](/api/javascript/dataviz/ui/chart#events-zoomStart) documentation.


#### Parameters

##### onZoomStartHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.ZoomStart("onZoomStart"))
    %>


### ZoomStart(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the ZoomStart client-side event

For additional information check the [zoomStart event](/api/javascript/dataviz/ui/chart#events-zoomStart) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.ZoomStart(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Zoom(System.String)
Defines the name of the JavaScript function that will handle the the Zoom client-side event.

For additional information check the [zoom event](/api/javascript/dataviz/ui/chart#events-zoom) documentation.


#### Parameters

##### onZoomHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.Zoom("onZoom"))
    %>


### Zoom(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Zoom client-side event

For additional information check the [zoom event](/api/javascript/dataviz/ui/chart#events-zoom) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.Zoom(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### ZoomEnd(System.String)
Defines the name of the JavaScript function that will handle the the ZoomEnd client-side event.

For additional information check the [zoomEnd event](/api/javascript/dataviz/ui/chart#events-zoomEnd) documentation.


#### Parameters

##### onZoomEndHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.ZoomEnd("onZoomEnd"))
    %>


### ZoomEnd(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the ZoomEnd client-side event

For additional information check the [zoomEnd event](/api/javascript/dataviz/ui/chart#events-zoomEnd) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.ZoomEnd(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### SelectStart(System.String)
Defines the name of the JavaScript function that will handle the the SelectStart client-side event.

For additional information check the [selectStart event](/api/javascript/dataviz/ui/chart#events-selectStart) documentation.


#### Parameters

##### onSelectStartHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.SelectStart("onSelectStart"))
    %>


### SelectStart(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the SelectStart client-side event

For additional information check the [selectStart event](/api/javascript/dataviz/ui/chart#events-selectStart) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.SelectStart(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Select(System.String)
Defines the name of the JavaScript function that will handle the the Select client-side event.

For additional information check the [select event](/api/javascript/dataviz/ui/chart#events-select) documentation.


#### Parameters

##### onSelectHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.Select("onSelect"))
    %>


### Select(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the Select client-side event

For additional information check the [select event](/api/javascript/dataviz/ui/chart#events-select) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.Select(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### SelectEnd(System.String)
Defines the name of the JavaScript function that will handle the the SelectEnd client-side event.

For additional information check the [selectEnd event](/api/javascript/dataviz/ui/chart#events-selectEnd) documentation.


#### Parameters

##### onSelectEndHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.SelectEnd("onSelectEnd"))
    %>


### SelectEnd(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the SelectEnd client-side event

For additional information check the [selectEnd event](/api/javascript/dataviz/ui/chart#events-selectEnd) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.SelectEnd(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### NoteClick(System.String)
Defines the name of the JavaScript function that will handle the the NoteClick client-side event.

For additional information check the [noteClick event](/api/javascript/dataviz/ui/chart#events-noteClick) documentation.


#### Parameters

##### onNoteClickHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.NoteClick("onNoteClick"))
    %>


### NoteClick(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the NoteClick client-side event

For additional information check the [noteClick event](/api/javascript/dataviz/ui/chart#events-noteClick) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.NoteClick(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### NoteHover(System.String)
Defines the name of the JavaScript function that will handle the the NoteHover client-side event.

For additional information check the [noteHover event](/api/javascript/dataviz/ui/chart#events-noteHover) documentation.


#### Parameters

##### onNoteHoverHandlerName `System.String`
The name of the JavaScript function that will handle the event.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Events(events => events.NoteHover("onNoteHover"))
    %>


### NoteHover(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the NoteHover client-side event

For additional information check the [noteHover event](/api/javascript/dataviz/ui/chart#events-noteHover) documentation.


#### Parameters

##### inlineCodeBlock `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().Chart()
        .Name("Chart")
        .Events(events => events.NoteHover(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>



