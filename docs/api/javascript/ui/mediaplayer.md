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

### autoBind `Boolean` *(default: true)*

If set to `false` the widget will not bind to the data source during initialization. In this case data binding will occur when the [change](/api/javascript/data/datasource#events-change) event of the
data source is fired.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.

#### Example - disable automatic binding

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoBind: false,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" }
        ]
    });
    </script>

### autoPlay `Boolean` *(default: false)*

If set to `true` the widget will start playing the video\vidoes after initializing

#### Example - enable automatic play

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" }
        ]
    });
    </script>

### autoRepeat `Boolean` *(default: false)*

If set to `true` the widget will start playing the video\vidoes after initializing

#### Example - enable automatic play

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" }
        ]
    });
    </script>

### volume `Number` *(default: 100)*

A value between 0 and 100 that specifies the volume of the video 

#### Example - set volume

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        volume: 50,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" }
        ]
    });
    </script>

### fullScreen `Boolean` *(default: false)*

If set to `true` the widget will enter in full-sreen mode

#### Example - enable full-screen

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        fullScreen: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" }
        ]
    });
    </script>

### mute `Boolean` *(default: false)*

If set to `true` the video will be played without sound

#### Example - enable full-screen

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        mute: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" }
        ]
    });
    </script>

### forwardSeek `Boolean` *(default: false)*

If set to `true` the fowr

#### Example - enable full-screen

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        forwardSeek: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" }
        ]
    });
    </script>

### playlist `Boolean` *(default: false)*

If set to `true` a playlist for the videos inside the data source will be created

#### Example - enable full-screen

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        playlist: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" },
            { title: "Digital Transformation: A New Way of Thinking", url: "https://www.youtube.com/watch?v=gNlya720gbk" },
            { title: "Learn How York Solved Its Database Problem", url: "https://www.youtube.com/watch?v=_S63eCewxRg" }
        ]
    });
    </script>

## Methods

### pause

Halts the video currently played video

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        playlist: true,
        autoPlay: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" },
            { title: "Digital Transformation: A New Way of Thinking", url: "https://www.youtube.com/watch?v=gNlya720gbk" },
            { title: "Learn How York Solved Its Database Problem", url: "https://www.youtube.com/watch?v=_S63eCewxRg" }
        ]
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // pauses the video
    mediaPlayer.pause();
    </script>

### play

Forces the video to start playing

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        playlist: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" },
            { title: "Digital Transformation: A New Way of Thinking", url: "https://www.youtube.com/watch?v=gNlya720gbk" },
            { title: "Learn How York Solved Its Database Problem", url: "https://www.youtube.com/watch?v=_S63eCewxRg" }
        ]
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // Starts the playing of the video
    mediaPlayer.play();
    </script>

### play

Forces the video to start playing

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        playlist: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" },
            { title: "Digital Transformation: A New Way of Thinking", url: "https://www.youtube.com/watch?v=gNlya720gbk" },
            { title: "Learn How York Solved Its Database Problem", url: "https://www.youtube.com/watch?v=_S63eCewxRg" }
        ]
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // Starts the playing of the video
    mediaPlayer.play();
    </script>

### Seek

Proceeds the video to a certain time

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        playlist: true,
        autoPlay: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" },
            { title: "Digital Transformation: A New Way of Thinking", url: "https://www.youtube.com/watch?v=gNlya720gbk" },
            { title: "Learn How York Solved Its Database Problem", url: "https://www.youtube.com/watch?v=_S63eCewxRg" }
        ]
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // Starts playing the video at the first second
    mediaPlayer.seek(1000);
    </script>

#### Parameters

##### miliseconds `Number`

The time offset in miliseconds

### stop

Stops the currently played video

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        playlist: true,
        autoPlay: true,
        dataSource: [					
            { title: "Progress: Transforming Experiences", url: "https://www.youtube.com/watch?v=QUjwpqkStOA" },
            { title: "Digital Transformation: A New Way of Thinking", url: "https://www.youtube.com/watch?v=gNlya720gbk" },
            { title: "Learn How York Solved Its Database Problem", url: "https://www.youtube.com/watch?v=_S63eCewxRg" }
        ]
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // Stop the video
    mediaPlayer.stop();
    </script>