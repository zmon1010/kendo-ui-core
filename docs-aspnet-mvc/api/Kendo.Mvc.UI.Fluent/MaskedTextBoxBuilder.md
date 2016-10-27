---
title: MaskedTextBoxBuilder
---

# Kendo.Mvc.UI.Fluent.MaskedTextBoxBuilder
Defines the fluent interface for configuring the MaskedTextBox component.




## Methods


### Value(System.String)
Sets the initial value of the MaskedTextBox.





### UnmaskOnPost(System.Boolean)
Specifies whether the widget will unmask input value on form post


#### Parameters

##### value `System.Boolean`




#### Returns




### ClearPromptChar(System.Boolean)
Specifies whether the widget will replace the prompt characters with spaces on blur


#### Parameters

##### value `System.Boolean`




#### Returns




### PromptChar(System.String)
Specifies the character used to represent the absence of user input in the widget





### Events(System.Action\<Kendo.Mvc.UI.Fluent.MaskedTextBoxEventBuilder\>)
Configures the client-side events.


#### Parameters

##### EventsAction System.Action<[Kendo.Mvc.UI.Fluent.MaskedTextBoxEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MaskedTextBoxEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().MaskedTextBox()
    .Name("MaskedTextBox")
    .Events(events =>
        events.Change("change")
    )
    %>


### Rules(System.Action\<Kendo.Mvc.UI.Fluent.MaskedTextBoxRulesBuilder\>)
Configures the custom rules.


#### Parameters

##### RulesAction System.Action<[Kendo.Mvc.UI.Fluent.MaskedTextBoxRulesBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/MaskedTextBoxRulesBuilder)>
The rules action.




#### Example (ASPX)
    <%= Html.Kendo().MaskedTextBox()
    .Name("MaskedTextBox")
    .Rules(rules =>
        rules.Add("~", "/[+-]/")
    )
    %>


### Enable(System.Boolean)
Enables or disables the textbox.


#### Parameters

##### value `System.Boolean`




#### Returns




### Mask(System.String)
Sets the mask of the MaskedTextBox.




#### Example (ASPX)
    <%= Html.Kendo().MaskedTextBox()
    .Name("MaskedTextBox")
    .Mask("999 000 000")
    %>


### Culture(System.String)
Specifies the culture info used by the MaskedTextBox widget.




#### Example (ASPX)
    <%= Html.Kendo().MaskedTextBox()
    .Name("MaskedTextBox")
    .Culture("de-DE")
    %>



