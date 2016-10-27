---
title: EditorSerializationSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.EditorSerializationSettingsBuilder
Defines the fluent API for configuring the EditorSerializationSettings settings.




## Methods


### Custom(System.Func\<System.Object,System.Object\>)
Define custom serialization for the editable content. The method accepts a single parameter as a string and is expected to return a string.


#### Parameters

##### value `System.Func<System.Object,System.Object>`
The value that configures the custom action.





### Custom(System.String)
Define custom serialization for the editable content. The method accepts a single parameter as a string and is expected to return a string.


#### Parameters

##### value `System.String`
The value that configures the custom action.





### Entities(System.Boolean)
Indicates whether the characters outside the ASCII range will be encoded as HTML entities. By default, they are encoded.


#### Parameters

##### value `System.Boolean`
The value that configures the entities.





### Scripts(System.Boolean)
Indicates whether inline scripts will be serialized and posted to the server.


#### Parameters

##### value `System.Boolean`
The value that configures the scripts.





### Semantic(System.Boolean)
Indicates whether the font styles will be saved as semantic (strong / em / span) tags,
            or as presentational (b / i / u / font) tags. Used for outputting content for legacy systems.


#### Parameters

##### value `System.Boolean`
The value that configures the semantic.






