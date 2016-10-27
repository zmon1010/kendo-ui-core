---
title: TreeViewEventBuilder
---

# Kendo.Mvc.UI.Fluent.TreeViewEventBuilder
Defines the fluent API for configuring the events of the Kendo TreeView for ASP.NET MVC




## Methods


### Change(System.String)
Triggered when the selection has changed (either by the user or through the select method).

For additional information check the [change event](/api/javascript/ui/treeview#events-change) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the change event.





### Check(System.String)
Triggered after the user has checked or unchecked a checkbox.
            If checkChildren is true, the event is triggered after all checked states are updated.
            This event has been introduced in internal builds after 2014.2.828.

For additional information check the [check event](/api/javascript/ui/treeview#events-check) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the check event.





### Collapse(System.String)
Triggered before a subgroup gets collapsed. Cancellable.

For additional information check the [collapse event](/api/javascript/ui/treeview#events-collapse) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the collapse event.





### DataBound(System.String)
Triggered after the dataSource change event has been processed (adding/removing items);

For additional information check the [dataBound event](/api/javascript/ui/treeview#events-dataBound) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the dataBound event.





### Drag(System.String)
Triggered while a node is being dragged.

For additional information check the [drag event](/api/javascript/ui/treeview#events-drag) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the drag event.





### DragEnd(System.String)
Triggered after a node has been dropped.

For additional information check the [dragEnd event](/api/javascript/ui/treeview#events-dragEnd) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the dragend event.





### DragStart(System.String)
Triggered before the dragging of a node starts.

For additional information check the [dragStart event](/api/javascript/ui/treeview#events-dragStart) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the dragstart event.





### Drop(System.String)
Triggered when a node is being dropped.

For additional information check the [drop event](/api/javascript/ui/treeview#events-drop) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the drop event.





### Expand(System.String)
Triggered before a subgroup gets expanded.

For additional information check the [expand event](/api/javascript/ui/treeview#events-expand) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the expand event.





### Navigate(System.String)
Triggered when the user moves the focus on another node

For additional information check the [navigate event](/api/javascript/ui/treeview#events-navigate) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the navigate event.





### Select(System.String)
Triggered when a node is being selected by the user. Cancellable.

For additional information check the [select event](/api/javascript/ui/treeview#events-select) documentation.


#### Parameters

##### handler `System.String`
The name of the JavaScript function that will handle the select event.





### Collapse(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the collapse client-side event

For additional information check the [collapse event](/api/javascript/ui/treeview#events-collapse) documentation.


#### Parameters

##### onCollapseAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.Collapse(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### DataBound(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the dataBound client-side event

For additional information check the [dataBound event](/api/javascript/ui/treeview#events-dataBound) documentation.


#### Parameters

##### onDataBoundAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.DataBound(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Drag(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the drag client-side event

For additional information check the [drag event](/api/javascript/ui/treeview#events-drag) documentation.


#### Parameters

##### onDragAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.Drag(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### DragEnd(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the dragend client-side event

For additional information check the [dragEnd event](/api/javascript/ui/treeview#events-dragEnd) documentation.


#### Parameters

##### onDragEndAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.DragEnd(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### DragStart(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the dragstart client-side event

For additional information check the [dragStart event](/api/javascript/ui/treeview#events-dragStart) documentation.


#### Parameters

##### onDragStartAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.DragStart(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Drop(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the drop client-side event

For additional information check the [drop event](/api/javascript/ui/treeview#events-drop) documentation.


#### Parameters

##### onDropAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.Drop(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Expand(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the expand client-side event

For additional information check the [expand event](/api/javascript/ui/treeview#events-expand) documentation.


#### Parameters

##### onExpandAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.Expand(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Select(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the select client-side event

For additional information check the [select event](/api/javascript/ui/treeview#events-select) documentation.


#### Parameters

##### onSelectAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.Select(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Change(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the change client-side event

For additional information check the [change event](/api/javascript/ui/treeview#events-change) documentation.


#### Parameters

##### onChangeAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.Change(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>


### Check(System.Func\<System.Object,System.Object\>)
Defines the inline handler of the check client-side event

For additional information check the [check event](/api/javascript/ui/treeview#events-check) documentation.


#### Parameters

##### onCheckAction `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    <% Html.Kendo().TreeView()
        .Name("TreeView")
        .Events(events => events.Check(
                @<text>
                    function(e) {
                    // event handling code
                    }
                    </text>
                    ))
                    .Render();
                    %>



