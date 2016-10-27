---
title: ButtonBuilder
---

# Kendo.Mvc.UI.Fluent.ButtonBuilder
Defines the fluent interface for configuring the !:Button<T>component.




## Methods


### Content(System.Action)
Sets the HTML content of the Button.


#### Parameters

##### content `System.Action`
The action which renders the HTML content.





### Content(System.Func\<System.Object,System.Object\>)
Sets the HTML content of the Button.


#### Parameters

##### content `System.Func<System.Object,System.Object>`
The Razor template for the HTML content.





### Content(System.String)
Sets the HTML content of the Button.


#### Parameters

##### content `System.String`
The HTML content.





### Enable(System.Boolean)
Sets whether Button should be enabled.





### Icon(System.String)
Sets the icon name of the Button.





### ImageUrl(System.String)
Sets the image URL of the Button.





### SpriteCssClass(System.String)
Sets the sprite CSS class(es) of the Button.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.ButtonEventBuilder\>)
Configures the client-side events.


#### Parameters

##### events System.Action<[Kendo.Mvc.UI.Fluent.ButtonEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ButtonEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().Button()
    .Name("Button")
    .Events(events =>
        events.Click("onClick"))
    %>


### Tag(System.String)
Sets the Button HTML tag. A button tag is used by default.




#### Example (ASPX)
    <%= Html.Kendo().Button()
    .Name("Button")
    .Tag("span")
    %>



