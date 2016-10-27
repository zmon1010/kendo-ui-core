---
title: ListBuilderBase
---

# Kendo.Mvc.UI.Fluent.ListBuilderBase
Defines the fluent interface for configuring the DropDownList, ComboBox and MultiSelect components.




## Methods


### Animation(System.Boolean)
Use to enable or disable animation of the popup element.


#### Parameters

##### enable `System.Boolean`
The boolean value.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Animation(false) //toggle effect
    %>


### Animation(System.Action\<Kendo.Mvc.UI.Fluent.PopupAnimationBuilder\>)
Configures the animation effects of the widget.


#### Parameters

##### animationAction System.Action<[Kendo.Mvc.UI.Fluent.PopupAnimationBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/PopupAnimationBuilder)>
The action which configures the animation effects.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Animation(animation =>
    {
        animation.Open(open =>
        {
            open.SlideIn(SlideDirection.Down);
            });
        })
    %>


### DataTextField(System.String)
Sets the field of the data item that provides the text content of the list items.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .DataTextField("Text")
    %>


### DataSource(System.Action\<Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder\>)
Configures the DataSource options.


#### Parameters

##### configurator System.Action<[Kendo.Mvc.UI.Fluent.ReadOnlyDataSourceBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/ReadOnlyDataSourceBuilder)>
The DataSource configurator action.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .DataSource(source =>
    {
        source.Read(read =>
        {
            read.Action("GetProducts", "Home");
            });
        })
    %>


### Delay(System.Int32)
Specifies the delay in ms after which the widget will start filtering the dataSource.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Delay(300)
    %>


### Enable(System.Boolean)
Enables or disables the combobox.





### FixedGroupTemplate(System.String)
Fixed group template which will be rendered as a static group header of the popup element.





### FixedGroupTemplateId(System.String)
FixedGroupTemplateId to be used for rendering the static header of the popup element.





### GroupTemplate(System.String)
Group template which will be rendered as a group header of each new group in the popup.





### GroupTemplateId(System.String)
GroupTemplateId to be used for rendering the static header of the popup element.





### IgnoreCase(System.Boolean)
Use it to enable case insensitive bahavior of the combobox. If true the combobox will select the first matching item ignoring its casing.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .IgnoreCase(true)
    %>


### Height(System.Int32)
Sets the height of the drop-down list in pixels.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Height(300)
    %>


### HeaderTemplate(System.String)
Header template which will be rendered as a static header of the popup element.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .HeaderTemplate("Customers")
    %>


### HeaderTemplateId(System.String)
HeaderTemplateId to be used for rendering the static header of the popup element.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .HeaderTemplateId("widgetHeaderTemplateId")
    %>


### FooterTemplate(System.String)
Footer template which will be rendered as a static footer of the popup element.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .FooterTemplate("Total #: instance.dataSource.total() # items found")
    %>


### FooterTemplateId(System.String)
FooterTemplateId to be used for rendering the static footer of the popup element.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .FooterTemplateId("widgetFooterTemplateId")
    %>


### NoDataTemplate(System.String)
No data template which will be rendered as a static no-data template of the popup element.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .NoDataTemplate("No Data!")
    %>


### NoDataTemplateId(System.String)
NoDataTemplateId to be used for rendering the static no-data template of the popup element.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .NoDataTemplateId("widgetNoDataTemplateId")
    %>


### Popup(System.Action\<Kendo.Mvc.UI.Fluent.PopupSettingsBuilder\>)
Configures the popup settings of the widget.





### Virtual(System.Boolean)
Configures the virtualization settings of the widget.





### Virtual(System.Action\<Kendo.Mvc.UI.Fluent.VirtualSettingsBuilder\>)
Configures the virtualization settings of the widget.






