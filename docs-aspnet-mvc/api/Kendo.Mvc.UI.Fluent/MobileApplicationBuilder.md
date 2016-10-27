---
title: MobileApplicationBuilder
---

# Kendo.Mvc.UI.Fluent.MobileApplicationBuilder
Defines the fluent API for configuring the Kendo MobileApplication for ASP.NET MVC.




## Methods


### BrowserHistory(System.Boolean)
Introduced in the 2014 Q3 release. If set to false, the navigation will not update or read the browser location fragment.


#### Parameters

##### value `System.Boolean`
The value that configures the browserhistory.





### HashBang(System.Boolean)
Introduced in the 2014 Q1 Service Pack 1 release. If set to true, the navigation will parse and prefix the url fragment value with !,
            which should be SEO friendly.


#### Parameters

##### value `System.Boolean`
The value that configures the hashbang.





### HideAddressBar(System.Boolean)
Whether to hide the browser address bar. Supported only in iPhone and iPod. Doesn't affect standalone mode as there the address bar is always hidden.


#### Parameters

##### value `System.Boolean`
The value that configures the hideaddressbar.





### Initial(System.String)
The id of the initial mobile View to display.


#### Parameters

##### value `System.String`
The value that configures the initial.





### Layout(System.String)
The id of the default Application layout.


#### Parameters

##### value `System.String`
The value that configures the layout.





### Loading(System.String)
The text displayed in the loading popup. Setting this value to false will disable the loading popup.Note: The text should be wrapped inside <h1> tag.


#### Parameters

##### value `System.String`
The value that configures the loading.





### ModelScope(System.Object)
The view model scope. By default, the views will try to resolve their models from the global scope (window).


#### Parameters

##### value `System.Object`
The value that configures the modelscope.





### Platform(System.String)
Which platform look to force on the application. Supported values are "ios" (meaning iOS 6 look), "ios7","android", "blackberry" and "wp".
            You can also set platform variants with it ("android-light" or "android-dark"), but keep in mind that it will still override the platform. If this is not desired, use the skin option.


#### Parameters

##### value `System.String`
The value that configures the platform.





### Root(System.String)
Applicable if pushState is used and the application is deployed to a path different than /. If the application start page is hosted on http://foo.com/myapp/, the root option should be set to /myapp/.


#### Parameters

##### value `System.String`
The value that configures the root.





### Retina(System.Boolean)
If set to true, the application will set the meta viewport tag scale value according to the device pixel ratio, and re-scale the app by setting root element font size to the respective value.
            This will result in the widget borders/separators being real 1px  wide.
            For example, in iPhone 4/5, the device pixel ratio is 2, which means that the scale will be set to 0.5, while the app root will receive a font-size: 2 * 0.92 inline style set.


#### Parameters

##### value `System.Boolean`
The value that configures the retina.





### ServerNavigation(System.Boolean)
If set to true, the application will not use AJAX to load remote views.


#### Parameters

##### value `System.Boolean`
The value that configures the servernavigation.





### Skin(System.String)
The skin to apply to the application. Currently, Kendo UI Mobile ships with nova, flat, material-light and material-dark skins in addition to the native looking ones.
            You can also set platform variants with it ("android-light" or "android-dark").Note: The Material themes were renamed to material-light and material-dark in 2014 Q3 SP1. With 2014 Q3 (v2014.3.1119) and older Kendo UI versions,
            material and materialblack skin names should be used.


#### Parameters

##### value `System.String`
The value that configures the skin.





### StatusBarStyle(System.String)
Set the status bar style meta tag in iOS used to control the styling of the status bar in a pinned to the Home Screen app. Available as of Q2 2013 SP.


#### Parameters

##### value `System.String`
The value that configures the statusbarstyle.





### Transition(System.String)
The default View transition. For a list of supported transitions, check the Getting Started help topic.


#### Parameters

##### value `System.String`
The value that configures the transition.





### UpdateDocumentTitle(System.Boolean)
Whether to update the document title.


#### Parameters

##### value `System.Boolean`
The value that configures the updatedocumenttitle.





### UseNativeScrolling(System.Boolean)
By default, the mobile application uses flexbox for the mobile views layout. The content element is made scrollable, either by initializing a mobile scroller or with the browser supported overflow: auto and -webkit-overflow-scrolling: touch CSS declarations.
            When the useNativeScrolling configuration option is set to true, the view header and footer are positioned using position: fixed CSS declaration. The view content vertical padding is adjusted to match the header and footer height; The default browser scroller is utilized for the content scrolling.For more information regarding native scrolling check this article.


#### Parameters

##### value `System.Boolean`
The value that configures the usenativescrolling.





### WebAppCapable(System.Boolean)
Disables the default behavior of Kendo UI Mobile apps to be web app capable (open in a chromeless browser). Introduced in Q2 2013.


#### Parameters

##### value `System.Boolean`
The value that configures the webappcapable.





### PushState(System.Boolean)
Specifies how history should be handled


#### Parameters

##### value `System.Boolean`
The value that configures the pushstate.





### Icon(System.String)
Specify default icon url


#### Parameters

##### url `System.String`
The icon url





### Icon(System.Action\<Kendo.Mvc.UI.Fluent.MobileApplicationIconBuilder\>)
Specify icon url per dimension


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileApplicationIconBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileApplicationIconBuilder)>
Configurator for icon url per dimension





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MobileApplicationEventBuilder\>)
Configures the client-side events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.MobileApplicationEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MobileApplicationEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MobileApplication()
    .Events(events => events
        .Init("onInit")
    )
    %>



