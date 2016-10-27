---
title: EditorBuilder
---

# Kendo.Mvc.UI.Fluent.EditorBuilder
The fluent API for configuring Kendo UI Editor for ASP.NET MVC.




## Methods


### Value(System.Action)
Sets the HTML content that will show initially in the editor.


#### Parameters

##### value `System.Action`
The action which renders the HTML content.





### Value(System.Func\<System.Object,System.Object\>)
Sets the HTML content that will show initially in the editor.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The predicate which renders the HTML content.





### Value(System.String)
Sets the HTML content which the item should display as a string.


#### Parameters

##### value `System.String`
An HTML string.





### Events(System.Action\<Kendo.Mvc.UI.Fluent.EditorEventBuilder\>)
Configure the client events.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorEventBuilder)>
An action that configures the events.





### Tools(System.Action\<Kendo.Mvc.UI.Fluent.EditorToolFactory\>)
Configure the available tools in the toolbar.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorToolFactory](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorToolFactory)>
An action that configures the tools.





### Tag(System.String)
Allow rendering of contentEditable elements instead of the default textarea editor.
            Note: contentEditable elements are not posted to the server.


#### Parameters

##### tagName `System.String`
The tag that will be rendered as contentEditable





### Encode(System.Boolean)
Encode HTML content.





### StyleSheets(System.Action\<Kendo.Mvc.UI.Fluent.EditorStyleSheetBuilder\>)
Sets the CSS files that will be registered in the Editor's iframe





### FileBrowser(System.Action\<Kendo.Mvc.UI.Fluent.EditorFileBrowserSettingsBuilder\>)
Configure the file browser dialog.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorFileBrowserSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorFileBrowserSettingsBuilder)>
An action that configures the dialog.





### ImageBrowser(System.Action\<Kendo.Mvc.UI.Fluent.EditorImageBrowserSettingsBuilder\>)
Configure the image browser dialog.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorImageBrowserSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorImageBrowserSettingsBuilder)>
An action that configures the dialog.





### Deserialization(System.Action\<Kendo.Mvc.UI.Fluent.EditorDeserializationSettingsBuilder\>)
Fine-tune deserialization in the Editor widget. Deserialization is the process of parsing the HTML string input from the value() method or from the viewHtml dialog into editable content.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorDeserializationSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorDeserializationSettingsBuilder)>
The action that configures the deserialization.





### Domain(System.String)
Relaxes the same-origin policy when using the iframe-based editor.
            This is done automatically for all cases except when the policy is relaxed by document.domain = document.domain.
            In that case, this property must be used to allow the editor to function properly across browsers.
            This property has been introduced in internal builds after 2014.1.319.


#### Parameters

##### value `System.String`
The value that configures the domain.





### Immutables
If enabled, the editor disables the editing and command execution in elements marked with editablecontent="false" attribute.





### Immutables(System.Boolean)
If enabled, the editor disables the editing and command execution in elements marked with editablecontent="false" attribute.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the immutables option.





### Immutables(System.Action\<Kendo.Mvc.UI.Fluent.EditorImmutablesSettingsBuilder\>)
If enabled, the editor disables the editing and command execution in elements marked with editablecontent="false" attribute.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorImmutablesSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorImmutablesSettingsBuilder)>
The action that configures the immutables.





### Messages(System.Action\<Kendo.Mvc.UI.Fluent.EditorMessagesSettingsBuilder\>)
Defines the text of the labels that are shown within the editor. Used primarily for localization.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorMessagesSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorMessagesSettingsBuilder)>
The action that configures the messages.





### PasteCleanup(System.Action\<Kendo.Mvc.UI.Fluent.EditorPasteCleanupSettingsBuilder\>)
Options for controlling how the pasting content is modified before it is added in the editor.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorPasteCleanupSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorPasteCleanupSettingsBuilder)>
The action that configures the pastecleanup.





### Resizable
If enabled, the editor renders a resize handle to allow users to resize it.





### Resizable(System.Boolean)
If enabled, the editor renders a resize handle to allow users to resize it.


#### Parameters

##### enabled `System.Boolean`
Enables or disables the resizable option.





### Resizable(System.Action\<Kendo.Mvc.UI.Fluent.EditorResizableSettingsBuilder\>)
If enabled, the editor renders a resize handle to allow users to resize it.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorResizableSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorResizableSettingsBuilder)>
The action that configures the resizable.





### Serialization(System.Action\<Kendo.Mvc.UI.Fluent.EditorSerializationSettingsBuilder\>)
Allows setting of serialization options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.EditorSerializationSettingsBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/EditorSerializationSettingsBuilder)>
The action that configures the serialization.






