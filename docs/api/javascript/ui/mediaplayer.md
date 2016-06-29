---
title: MediaPlayer
page_title: Configuration, methods and events of Kendo UI MediaPlayer
description: Code examples and tips how to configure MediaPlayer widget, use available methods and events.
---

# kendo.ui.MediaPlayer

Represents the Kendo UI MediaPlayer widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used render table rows. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - specify different prompt char

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        dataSource: [					
            { name: "video1", url: ".//video/video1.mp4" },
            { name: "video2", url: ".//video/video2.mp4" }
        ]
    });
    </script>

