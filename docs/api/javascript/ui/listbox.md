---
title: ListBox
description: Configuration, methods and events of the Kendo UI ListBox
---

# kendo.ui.ListBox

## Configuration

### autoBind `Boolean` *(default: true)*
If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the data source is fired. By default the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source does not make more than one request to the remote service.

#### Example - disable automatic binding

    <select id="listBox"></select>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listBox").kendoListBox({
         dataSource: dataSource,
         template: "<div>#:name#</div>",
         autoBind: false
     });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### connectWith `String` *(default: null)*

Selector which determines the target ListBox container that should be used when items are transferd from and to the current ListBox widget. The `connectWith` option describes **one way** relationship, if the developer wants a two way connection then the connectWith option should be set on both widgets.

#### Example - set up a one way connection from ListBoxA to ListBoxB

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
            toolbar: {
                tools: [ "transferTo", "transferFrom", "transferAllTo", "transferAllFrom" ]
            }
        });

        $("#listBoxB").kendoListBox();
    </script>

#### Example - set up a bidirectional connection between ListBox widgets

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
            toolbar: {
                tools: [ "transferTo", "transferFrom", "transferAllTo", "transferAllFrom" ]
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "#listBoxA"
        });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used render listbox items. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource: [
             { name: "Jane Doe" },
             { name: "John Doe" }
        ],
        template: "<div>#:name#</div>"
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <select id="listBox"></select>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#listBox").kendoListBox({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
    });
    </script>

### dataTextField `String` *(default: "")*

The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.

> **Important** When `dataTextField` is defined, the `dataValueField` option also should be set.

#### Example - set the dataTextField

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### dataValueField `String` *(default: "")*

The field of the data item that provides the value of the widget.

> **Important** When `dataValueField` is defined, the `dataTextField` option also should be set.

#### Example - set the dataValueField

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### disabled `Boolean`*(default: false)*

If set to `true` the widget will be disabled and will not allow user interaction. The widget is enabled by default and allows user interaction.

#### Example - disable the widget

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        disabled: true,
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### draggable `Boolean | Object` *(default: false)*

Indicates if the widget items can be draged and droped.

> **Important** When `draggable` is set to `true`, the `dropSources` option also should be set.

### hint `Function | String | jQuery`

Provides a way for customization of the sortable item hint. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If hint function is not provided the widget will clone dragged item and use it as a hint.

> **Important: The hint element is appended to the `<body>` tag.** The developer should have this in mind in order to avoid styling issues.

#### Example - ListBox with custom hint

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        draggable: {
            hint: function(element) {
                return $("<span></span>")
                    .text(element.text())
                    .css("color", "#FF0000");
            }
        },
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### draggable.placeholder `Function | String | jQuery`

Provides a way for customization of the ListBox item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If placeholder function is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.

> **Important: The placeholder element is appended to the ListBox widget container.

#### Example - ListBox with custom placeholder

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        draggable: {
            placeholder: function(element) {
                return element.clone().css({
                    "opacity": 0.3,
                    "border": "1px dashed #000000"
                });
            }
        },
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### dropSources `Array`

Array of id strings which determines the ListBox widgets that can drag and drop their items to the current ListBox widget. The `dropSources` option describes **one way** relationship, if the developer wants a two way connection then the `dropSources` option should be set on both widgets.

> **Important** When `dropSources` is defined, the `draggable` option also should be set to `true`.

#### Example - set up a one way connection from ListBoxA to ListBoxB

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            draggable: true
        });

        $("#listBoxB").kendoListBox({
            dropSources: [ "listBoxA" ]
        });
    </script>

### height `Number|String`

The height of the listbox. Numeric values are treated as pixels.

#### Example - set the height as a number

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        height: 100,
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### navigatable `Boolean` *(default: false)*
Indicates whether keyboard navigation is enabled/disabled.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        navigatable: true,
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 },
            { name: "Item 3", id: 3 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### reorderable `Boolean` *(default: false)*
Indicates whether widget items can be reordered.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        reorderable: true,
        draggable: true,
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 },
            { name: "Item 3", id: 3 },
            { name: "Item 4", id: 4 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### selectable `String` *(default: "single")*

Indicates whether selection is enabled/disabled. Possible values:

#### *"single"*

Single item selection.

#### *"multiple"*

Multiple item selection.


#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        selectable: "multiple",
        dataSource: [
            { name: "Item 1", id: 1 },
            { name: "Item 2", id: 2 },
            { name: "Item 3", id: 3 }
        ],
        dataTextField: "name",
        dataValueField: "id"
    });
    </script>

### template `Function`

Specifies ListBox item template.

#### Example

     <script type="text/kendo-x-tmpl" id="template">
        <div>
            Item template for #:name#
        </div>
     </script>

     <select id="listBox"></select>
     <script>
     $("#listBox").kendoListBox({
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: kendo.template($("#template").html())
    });
    </script>

### toolbar `Object`

Defines settings for displaing toolbar for current ListBox widget. By default, no toolbar is shown.

#### Example

    <select id="listBox"></select>
    <script>
        $("#listBox").kendoListBox({
            dataSource: [ "Item 1", "Item 2", "Item 3", "Item 4" ],
            toolbar: {
                tools: [ "moveUp", "moveDown" ]
            }
        });
    </script>

### toolbar.position `String` *(default: "right")*

The position relative to the ListBox element, at which the toolbar will be shown. Predefined values are "bottom", "top", "left", "right".

#### Example

    <select id="listBox">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
        <option>Item 4</option>
    </select>
    <script>
        $("#listBox").kendoListBox({
            toolbar: {
                position: "left",
                tools: [ "moveUp", "moveDown" ]
            }
        });
    </script>

### toolbar.tools `Array`

An `Array` value with the list of tools displayed in the ListBox's Toolbar. Tools are built-in ("moveUp", "moveDown", "remove", "transferAllFrom", "transferAllTo", "transferFrom", "transferTo").

The "moveUp" tool moves up the item that is currently selected by the end user.

The "moveDown" tool moves down the item that is currently selected by the end user.

The "remove" tool removes the item(s) that are currently selected by the end user.

The "transferAllFrom" tool moves all items from current ListBox widget to the target widget related with `connectWith` option.

The "transferAllTo" tool moves all items from target widget related with `connectWith` option to the current ListBox widget.

The "transferFrom" tool moves all selected items from current ListBox widget to the target widget related with `connectWith` option.

The "transferTo" tool moves all selected items from target widget related with `connectWith` option to the current ListBox widget.

#### Example

    <select id="listBoxA"></select>
    <select id="listBoxB"></select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
            dataSource: [ "ItemA1", "ItemA2" ],
            toolbar: {
                tools: [ "transferTo", "transferFrom", "transferAllTo", "transferAllFrom" ]
            }
        });

        $("#listBoxB").kendoListBox({
            connectWith: "#listBoxA",
            dataSource: [ "ItemB1", "ItemB2" ]
        });
    </script>

## Methods

### dataItem

Returns the data item to which the specified node is bound.

#### Parameters

##### node `jQuery|Element|String`

A string, DOM element or jQuery object which represents the node. A string is treated as a jQuery selector.

#### Returns

`kendo.data.Node` The model of the item that was passed as a parameter.

#### Example - get the data item of the first node

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
      dataSource: [
        { id: 1, name: "foo" },
        { id: 2, name: "bar" }
      ],
      dataTextField: "name",
      dataValueField: "id"
    });

    var listbox = $("#listBox").data("kendoListBox");
    var dataItem = listbox.dataItem(".k-item:first");
    console.log(dataItem.name); // displays "foo"
    </script>

### dataItems

#### Returns

`kendo.data.ObservableArray` Returns the observable array that is bound to the widget

#### Example

    <select id="listBox"></select>
    <script>
      var dataSource = new kendo.data.DataSource({
        data: [ { name: "Jane Doe" }, { name: "John Doe" }]
      });
      var listBox = $("#listBox").kendoListBox({
        dataSource: dataSource,
        template: "<div>#:name#</div>"
      }).data("kendoListBox")
      console.log(listBox.dataItems()) //will output the bound array
    </script>

### destroy

Prepares the **ListBox** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ListView element from DOM.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list view widget
    var listBox = $("#listBox").data("kendoListBox");
    listBox.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        disabled: true,
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list view widget
    var listBox = $("#listBox").data("kendoListBox");
    listBox.enable(true);
    </script>

### enable

Enables or disables the widget items.

#### Parameters

##### node `jQuery|Element|String`

A string, DOM element or jQuery object which represents the node. A string is treated as a jQuery selector.

##### enable `Boolean`

If set to `true` the widget item will be enabled. If set to `false` the widget item will be disabled.

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        disabled: true,
        dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list view widget
    var listBox = $("#listBox").data("kendoListBox");
    listBox.enable(".k-item:first", false);
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view).

#### Returns

`Array` The currently rendered View items (`<div>`, `<li>`, `<tr>` elements, etc., depending on the item template).

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [ "Orange", "Apple" ],
        connectWith: "#listBoxB"
    });
    // get a reference to the first list box widget
    var listBox = $("#listBox").data("kendoListBox");
    var items = listBox.items();
    console.log(items); // logs the items
    </script>

### transfer

Moves the spcified items from current ListBox to the target ListBox specified by the `connectWith` option.

#### Parameters

##### items `jQuery | Array`

Items to select.

    <select id="listBoxA">
        <option>Orange</option>
        <option>Apple</option>
    </select>
    <select id="listBoxB">
        <option>Banana</option>
    </select>
    <script>
    $("#listBoxA").kendoListBox({
        connectWith: "#listBoxB"
    });
    $("#listBoxB").kendoListBox();

    // get a reference to the first list box widget
    var listBoxA = $("#listBoxA").data("kendoListBox");
    // selects first list box item
    listBoxA.select(".k-item:first");
    // transfer selected items
    listBoxA.transfer();
    </script>

### refresh
Reloads the data and repaints the list box. Triggers [dataBound](#events-dataBound) event

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource:  [
            { name: "Jane Doe" },
            { name: "John Doe" }
        ],
        template: "<div>#:name#</div>"
    });
    var listBox = $("#listBox").data("kendoListBox");
    // refreshes the list box
    listBox.refresh();
    </script>

### reorder

Moves the specified item at position set by zero-based index parameter. The rest of the items are reordered accordingly.

#### Parameters

##### item `jQuery`

Item to select.

##### index `Number`

The new position of the item in the list.

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox();
    var listBox = $("#listBox").data("kendoListBox");
    // moves first item to position with index 2
    listBox.reorder(".k-item:first", 2);
    </script>

### remove

Removes a node from the widget.

#### Parameters

##### node `jQuery|Element|String`

The node that is to be removed.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
         dataSource: {
            data: [
                { name: "Jane Doe" },
                { name: "Sam Doe" }
            ]
        },
        template: "<div>#:name#</div>"
    });

    var listBox = $("#listBox").data("kendoListBox");

    var selectedItems = listBox.select();

    listBox.remove(selectedItems);
    </script>

### select

Get/set the selected ListBox item(s).

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 47 },
                { id: 2, name: "John Doe", age: 50 }
            ]
        },
        template: "<div>#:name#</div>"
    });
    // get a reference to the list box widget
    var listBox = $("#listBox").data("kendoListBox");
    // selects first list box item
    listBox.select(listBox.element.children().first());
    </script>

#### Returns

`jQuery` the selected items if called without arguments.

#### Parameters

##### items `jQuery | Array`

Items to select.

### setDataSource

Sets the dataSource of an existing ListBox and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var listbox = $("#listBox").data("kendoListBox");
    listbox.setDataSource(dataSource);
    </script>

## Events

### add

Fires before the list box item is added to the ListBox.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <select id="listBoxA">
        <option>ItemA1</option>
        <option>ItemA2</option>
    </select>
    <select id="listBoxB">
        <option>ItemB1</option>
        <option>ItemB2</option>
    </select>

    <script>
        $("#listBoxA").kendoListBox({
            connectWith: "#listBoxB",
            toolbar: {
                tools: [ "transferTo" ]
            }
        });

        $("#listBoxB").kendoListBox({
            add: function (e) {
                // handle add event
            }
        });
    </script>

#### Event Data

##### e.items `Array`

The item elements to be deleted.

##### e.dataItems `Array`

The data items which to be deleted.

### change
Fires when item's position is changed or when the list view selection has changed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [ "John Doe" ],
        change: function() {
            // handle event
        }
     });
     </script>

#### To set after initialization

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        dataSource: [ "John Doe" ]
    });
    // get a reference to the list box
    var listBox = $("#listBox").data("kendoListBox");
    // bind to the change event
    listBox.bind("change", function(e) {
        // handle event
    });
    </script>

### dataBound

Fires when the list box has received data from the data source and it is already rendered.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
       template: "<div>#: name#</div>",
       dataSource: [
           { name: "John Doe", age: 30 }
       ],
       dataBound: function() {
           //handle event
           console.log("data bound");
       }
    });
    </script>

### dragstart

Fires when ListBox item(s) drag starts.

#### Event Data

##### e.draggableEvent `Object`

The original draggable's dragstart event data.

##### e.item `jQuery`

The element that will be dragged.

##### e.preventDefault `Function`

If invoked prevents the drag start action. The element will remain at its original position. The hint and placeholder will not be initialized.

#### Example - prevent certain item from being dragged by cancelling the drag start action

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
         draggable: true,
         reorderable: true,
         dragstart: function(e) {
             if (e.item.text() === "Orange") {
                 e.preventDefault();
             }
         }
    });
    </script>

### drag

Fires when ListBox's placeholder changes its position.

#### Event Data

##### e.item `jQuery`

The element that is dragged.

##### e.target `jQuery`

The target element under cursor against which placeholder is positioned.

##### e.list `kendo.ui.ListBox`

The ListBox widget instance which the item belongs to (useful in case there are connected ListBox widgets).

##### e.draggableEvent `Object`

The original draggable's drag event data.

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
         draggable: true,
         reorderable: true,
         drag: function(e) {
             console.log("drag event");
         }
    });
    </script>

### drop
Fired when ListBox item is dropped over one of the drop targets.

#### Event Data

##### e.items `Array`

The item elements to be droped.

##### e.dataItems `Array`

The data items which to be droped.

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
         draggable: true,
         reorderable: true,
         drop: function(e) {
             console.log("drop event");
         }
    });
    </script>

### dragend

Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the sort action.

#### Event Data

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same ListBox container; "remove" - indicates that the item was removed from current ListBox widget; "receive" - indicates that the item was received by a connected ListBox widget instance;

##### e.preventDefault `Function`

If invoked prevents the sort action. The element will be reverted at its original position. The hint and placeholder will be destroyed.

##### e.items `Array`

The item elements to be dragged.

##### e.oldIndex `Number`

The original position of the item in the ListBox collection. In case the item is received from connected ListBox the value will be -1

##### e.newIndex `Number`

The position where item will be placed. In case the item is removed from connected ListBox the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

#### Example

    <select id="listBox">
        <option>Orange</option>
        <option>Apple</option>
        <option>Banana</option>
        <option>Peach</option>
    </select>
    <script>
    $("#listBox").kendoListBox({
        draggable: true,
        reorderable: true,
        dragend: function(e) {
            console.log("from " + e.oldIndex + " to " + e.newIndex);

            //prevent first item to be placed at the end of the list
            if(e.newIndex == 2 && e.oldIndex == 0) {
                e.preventDefault();
            }
        }
    });
    </script>

### remove

Fires before the list box item is removed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        template: "<div>#: name#</div>",
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe" },
                { id: 2, name: "John Doe" }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" }
                    }
                }
            }
        },
        remove: function(e) {
            //handle event
            e.preventDefault();
        }
    });
    // get a reference to the list box
    var listBox = $("#listBox").data("kendoListBox");
    listBox.remove(listBox.element.find("li:first"));
    </script>

#### To set after initialization

    <select id="listBox"></select>
    <script>
    $("#listBox").kendoListBox({
        template: "<div>#: name#</div>",
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe" },
                { id: 2, name: "John Doe" }
            ],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        id: { type: "number" },
                        name: { type: "string" }
                    }
                }
            }
        }
    });
    // get a reference to the list box
    var listBox = $("#listBox").data("kendoListBox");
    // bind to the remove event
    listBox.bind("remove", function(e) {
        // handle event
        console.log("remove");
        e.preventDefault();
    });
    listBox.remove(listBox.element.find(".k-item:first"));
    </script>

#### Event Data

##### e.items `Array`

The item elements to be deleted.

##### e.dataItems `Array`

The data items which to be deleted.

### reorder

Fires when items in the widget are reordered.

#### Example

    <select id="listBox">
        <option>Item 1</option>
        <option>Item 2</option>
        <option>Item 3</option>
        <option>Item 4</option>
    </select>
    <script>
        $("#listBox").kendoListBox({
            toolbar: {
                tools: [ "moveUp", "moveDown" ]
            },
            reorder: function (e) {
                // handle event
            }
        });
    </script>

#### Event Data

##### e.dataItems `Array`

The data items to be reordered.

##### e.items `Array`

The item elements to be reordered.

#### e.offset `Number`

The offset is -1 when moving up and 1 when moving down.
