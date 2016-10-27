---
title: MaskedTextBoxRulesBuilder
---

# Kendo.Mvc.UI.Fluent.MaskedTextBoxRulesBuilder
Defines the fluent interface for configuring the NumericTextBox events.




## Methods


### Add(System.Char,System.String)
Adds custom mask rule.


#### Parameters

##### name `System.Char`
The name of the rule.

##### regexp `System.String`
The JavaScript RegExp object assigned to defined rule.




#### Example (ASPX)
    @(Html.Kendo().MaskedTextBox()
        .Name("MaskedTextBox")
        .Events(events => events.Change(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )


### Add(System.Char,System.Func\<System.Object,System.Object\>)
Adds custom mask rule.


#### Parameters

##### name `System.Char`
The name of the rule.

##### handler `System.Func<System.Object,System.Object>`
The handler code wrapped in a text tag (Razor syntax).




#### Example (ASPX)
    @(Html.Kendo().MaskedTextBox()
        .Name("MaskedTextBox")
        .Events(events => events.Change(
                @<text>
                    function(e) {
                    //event handling code
                    }
                    </text>
                    ))
                )



