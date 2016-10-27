---
title: NumericTextBoxBuilder
---

# Kendo.Mvc.UI.Fluent.NumericTextBoxBuilder
Defines the fluent interface for configuring the 1 component.




## Methods


### Value(System.Nullable\<T\>)
Sets the initial value of the NumericTextBox.





### Step(T)
Sets the step, used ti increment/decrement the value of the textbox.





### Min(System.Nullable\<T\>)
Sets the minimal possible value allowed to the user.





### Max(System.Nullable\<T\>)
Sets the maximal possible value allowed to the user.





### Placeholder(System.String)
Sets the text which will be displayed if the textbox is empty.





### RestrictDecimals(System.Boolean)
Enables or disables the restriction of the decimals length


#### Parameters

##### restrictDecimals `System.Boolean`




#### Returns




### Round(System.Boolean)
Enables or disables the rounding of the widget value


#### Parameters

##### round `System.Boolean`




#### Returns




### Spinners(System.Boolean)
Enables or disables the spin buttons.


#### Parameters

##### allowSpinner `System.Boolean`




#### Returns




### Events(System.Action\<Kendo.Mvc.UI.Fluent.NumericTextBoxEventBuilder\>)
Configures the client-side events.


#### Parameters

##### EventsAction System.Action<[Kendo.Mvc.UI.Fluent.NumericTextBoxEventBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/NumericTextBoxEventBuilder)>
The client events action.




#### Example (ASPX)
    <%= Html.Kendo().NumericTextBox()
    .Name("NumericTextBox")
    .Events(events =>
        events.OnLoad("onLoad").OnChange("onChange")
    )
    %>


### Enable(System.Boolean)
Enables or disables the textbox.


#### Parameters

##### allowSpinner `System.Boolean`




#### Returns




### Format(System.String)
Stes the format of the NumericTextBox.




#### Example (ASPX)
    <%= Html.Kendo().NumericTextBox()
    .Name("NumericTextBox")
    .Format("c3")
    %>


### Culture(System.String)
Specifies the culture info used by the NumericTextBox widget.




#### Example (ASPX)
    <%= Html.Kendo().NumericTextBox()
    .Name("NumericTextBox")
    .Culture("de-DE")
    %>


### Decimals(System.Int32)
Specifies the number precision. If not set precision defined by current culture is used.




#### Example (ASPX)
    <%= Html.Kendo().NumericTextBox()
    .Name("NumericTextBox")
    .Decimals(3)
    %>


### IncreaseButtonTitle(System.String)
Sets the title of the NumericTextBox increase button.





### DecreaseButtonTitle(System.String)
Sets the title of the NumericTextBox decrease button.






