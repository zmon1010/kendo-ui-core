---
title: MediaPlayerBuilder
---

# Kendo.Mvc.UI.Fluent.MediaPlayerBuilder
Defines the fluent API for configuring the Kendo UI MediaPlayer




## Methods


### AutoPlay(System.Boolean)
If set to true the widget will start playing the video\vidoes after initializing


#### Parameters

##### value `System.Boolean`
The value for AutoPlay





### AutoPlay
If set to true the widget will start playing the video\vidoes after initializing





### AutoRepeat(System.Boolean)
If set to true the widget will start playing the video\vidoes after initializing


#### Parameters

##### value `System.Boolean`
The value for AutoRepeat





### AutoRepeat
If set to true the widget will start playing the video\vidoes after initializing





### ForwardSeek(System.Boolean)
If set to false the user will be prevented from seeking the video forward


#### Parameters

##### value `System.Boolean`
The value for ForwardSeek





### FullScreen(System.Boolean)
If set to true the widget will enter in full-sreen mode


#### Parameters

##### value `System.Boolean`
The value for FullScreen





### FullScreen
If set to true the widget will enter in full-sreen mode





### Messages(System.Action\<Kendo.Mvc.UI.Fluent.MediaPlayerMessagesBuilder\>)
The object which holds the localization strings


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MediaPlayerMessagesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MediaPlayerMessagesBuilder)>
The configurator for the messages setting.





### Mute(System.Boolean)
If set to true the video will be played without sound


#### Parameters

##### value `System.Boolean`
The value for Mute





### Mute
If set to true the video will be played without sound





### Navigatable(System.Boolean)
If set to true will enable the keyboard navigation for the widget


#### Parameters

##### value `System.Boolean`
The value for Navigatable





### Navigatable
If set to true will enable the keyboard navigation for the widget





### Volume(System.Double)
A value between 0 and 100 that specifies the volume of the video


#### Parameters

##### value `System.Double`
The value for Volume





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MediaPlayerEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MediaPlayerEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MediaPlayerEventBuilder)>
The client events action.




#### Example (ASPX)
    @(Html.Kendo().MediaPlayer()
        .Name("MediaPlayer")
        .Events(events => events
            .End("onEnd")
        )
    )


### Media(System.Action\<Kendo.Mvc.UI.Fluent.MediaPlayerMediaBuilder\>)
Specifies the object which holds the information about the media that will be played


#### Parameters

##### value System.Action<[Kendo.Mvc.UI.Fluent.MediaPlayerMediaBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MediaPlayerMediaBuilder)>
The value for Media






