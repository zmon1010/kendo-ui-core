---
title: ProgressBarAnimationBuilder
---

# Kendo.Mvc.UI.Fluent.ProgressBarAnimationBuilder
Defines the fluent API for configuring the ProgressBarAnimation object.




## Methods


### Enable(System.Boolean)
Enables or disables the progress animation


#### Parameters

##### enable `System.Boolean`
The boolean value




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Animation(a => a.Enable(false))
    %>


### Duration(System.Int32)
Specifies the duration of the progress animation


#### Parameters

##### enable `System.Int32`
The boolean value




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    .Animation(a => a.Duration(200))
    %>



