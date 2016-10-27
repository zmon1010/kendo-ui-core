---
title: WidgetFactory
---

# Kendo.Mvc.UI.Fluent.WidgetFactory
Creates the fluent API builders of the Kendo UI widgets




## Methods


### Menu
Creates a Menu




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Items(items => { /* add items here */ });
    %>


### TreeList(System.Collections.Generic.IEnumerable\<T1\>)
Creates a M:Kendo.Mvc.UI.Fluent.WidgetFactory.TreeList``1(System.Collections.Generic.IEnumerable{``0})




#### Example (ASPX)
    <%= Html.Kendo().TreeList(Model)
    .Name("TreeList")
    %>


### GridT1
Creates a new 1 bound to the specified data item type.




#### Example (ASPX)
    <%= Html.Kendo().Grid<Order>()
    .Name("Grid")
    .BindTo(Model)
    %>


### Grid(System.Collections.Generic.IEnumerable\<T1\>)
Creates a new 1 bound to the specified data source.


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T1>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().Grid(Model)
    .Name("Grid")
    %>


### Grid(System.Data.DataTable)
Creates a new 1 bound to a DataTable.


#### Parameters

##### dataSource `System.Data.DataTable`
DataTable from which the grid instance will be bound





### Grid(System.Data.DataView)
Creates a new 1 bound to a DataView.


#### Parameters

##### dataSource `System.Data.DataView`
DataView from which the grid instance will be bound





### Grid(System.String)
Creates a new 1 bound an item in ViewData.


#### Parameters

##### dataSourceViewDataKey `System.String`
The data source view data key.




#### Example (ASPX)
    <%= Html.Kendo().Grid<Order>("orders")
    .Name("Grid")
    %>


### DataSourceT1
Creates a new !:Kendo.Mvc.UI.DataSource<T> bound to the specified data item type.




#### Example (ASPX)
    @(Html.Kendo().DataSource<Order>()
        .Name("DataSource")
        .BindTo(Model)
    )


### ListViewT1
Creates a new 1 bound to the specified data item type.




#### Example (ASPX)
    <%= Html.Kendo().ListView<Order>()
    .Name("ListView")
    .BindTo(Model)
    %>


### ListView(System.Collections.Generic.IEnumerable\<T1\>)
Creates a new 1 bound to the specified data source.


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T1>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().ListView(Model)
    .Name("ListView")
    %>


### ListView(System.String)
Creates a new 1 bound an item in ViewData.


#### Parameters

##### dataSourceViewDataKey `System.String`
The data source view data key.




#### Example (ASPX)
    <%= Html.Kendo().ListView<Order>("orders")
    .Name("ListView")
    %>


### MobileListViewT1
Creates a new 1 bound to the specified data item type.




#### Example (ASPX)
    <%= Html.Kendo().MobileListView<Order>()
    .Name("MobileListView")
    .BindTo(Model)
    %>


### MobileListView
Creates a new MobileListView.




#### Example (ASPX)
    <%= Html.Kendo().MobileListView()
    .Name("MobileListView")
    .Items(items =>
    {
        items.Add().Text("Item");
        items.AddLink().Text("Link Item");
    })
    %>


### MobileListView(System.Collections.Generic.IEnumerable\<T1\>)
Creates a new 1 bound to the specified data source.


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T1>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().MobileListView(Model)
    .Name("MobileListView")
    %>


### MobileListView(System.String)
Creates a new 1 bound an item in ViewData.


#### Parameters

##### dataSourceViewDataKey `System.String`
The data source view data key.




#### Example (ASPX)
    <%= Html.Kendo().MobileListView<Order>("orders")
    .Name("MobileListView")
    %>


### Splitter
Creates a Splitter




#### Example (ASPX)
    <%= Html.Kendo().Splitter()
    .Name("Splitter");
    %>


### TabStrip
Creates a new TabStrip.




#### Example (ASPX)
    <%= Html.Kendo().TabStrip()
    .Name("TabStrip")
    .Items(items =>
    {
        items.Add().Text("First");
        items.Add().Text("Second");
    })
    %>


### DateTimePicker
Creates a new DateTimePicker.




#### Example (ASPX)
    <%= Html.Kendo().DateTimePicker()
    .Name("DateTimePicker")
    %>


### DatePicker
Creates a new DatePicker.




#### Example (ASPX)
    <%= Html.Kendo().DatePicker()
    .Name("DatePicker")
    %>


### TimePicker
Creates a new TimePicker.




#### Example (ASPX)
    <%= Html.Kendo().TimePicker()
    .Name("TimePicker")
    %>


### Barcode
Creates a new Barcode.




#### Example (ASPX)
    <%= Html.Kendo().Barcode()
    .For("Container")
    %>


### Sortable
Creates a new Sortable.




#### Example (ASPX)
    <%= Html.Kendo().Sortable()
    .For("Container")
    %>


### Tooltip
Creates a new Tooltip.




#### Example (ASPX)
    <%= Html.Kendo().Tooltip()
    .For("Container")
    %>


### ColorPalette
Creates a new ColorPalette.




#### Example (ASPX)
    <%= Html.Kendo().ColorPalette()
    .Name("ColorPalette")
    %>


### FlatColorPicker
Creates a new FlatColorPicker.




#### Example (ASPX)
    <%= Html.Kendo().FlatColorPicker()
    .Name("FlatColorPicker")
    %>


### Calendar
Creates a new Calendar.




#### Example (ASPX)
    <%= Html.Kendo().Calendar()
    .Name("Calendar")
    %>


### PanelBar
Creates a new PanelBar.




#### Example (ASPX)
    <%= Html.Kendo().PanelBar()
    .Name("PanelBar")
    .Items(items =>
    {
        items.Add().Text("First");
        items.Add().Text("Second");
    })
    %>


### RecurrenceEditor
Creates a new RecurrenceEditor.




#### Example (ASPX)
    <%= Html.Kendo().RecurrenceEditor()
    .Name("recurrenceEditor")
    .FirstWeekDay(0)
    .Timezone("Etc/UTC")
    %>


### TimezoneEditor
Creates a new TimezoneEditor.




#### Example (ASPX)
    <%= Html.Kendo().TimezoneEditor()
    .Name("timezoneEditor")
    .Value("Etc/UTC")
    %>


### SchedulerT1
Creates a new 1.




#### Example (ASPX)
    <%= Html.Kendo().Scheduler<SchedulerEvent>()
    .Name("Scheduler")
    %>


### PivotGrid
Creates a new 1.




#### Example (ASPX)
    <%= Html.Kendo().PivotGrid()
    .Name("PivotGrid")
    %>


### PivotGridT1
Creates a new 1.




#### Example (ASPX)
    <%= Html.Kendo().PivotGrid<EventData>()
    .Name("PivotGrid")
    %>


### PivotConfigurator
Creates a new PivotConfigurator.




#### Example (ASPX)
    <%= Html.Kendo().PivotConfigurator()
    .Name("PivotConfigurator")
    %>


### NumericTextBox
Creates a new NumericTextBox.




#### Example (ASPX)
    <%= Html.Kendo().NumericTextBox()
    .Name("NumericTextBox")
    %>


### NumericTextBoxT1
Creates a new 1.




#### Example (ASPX)
    <%= Html.Kendo().NumericTextBox<double>()
    .Name("NumericTextBox")
    %>


### CurrencyTextBox
Creates a new CurrencyTextBox.




#### Example (ASPX)
    <%= Html.Kendo().CurrencyTextBox()
    .Name("CurrencyTextBox")
    %>


### PercentTextBox
Creates a new PercentTextBox.




#### Example (ASPX)
    <%= Html.Kendo().PercentTextBox()
    .Name("PercentTextBox")
    %>


### IntegerTextBox
Creates a new IntegerTextBox.




#### Example (ASPX)
    <%= Html.Kendo().IntegerTextBox()
    .Name("IntegerTextBox")
    %>


### MaskedTextBox
Creates a new MaskedTextBox.




#### Example (ASPX)
    <%= Html.Kendo().MaskedTextBox()
    .Name("MaskedTextBox")
    %>


### MediaPlayer
Creates a new MediaPlayer




#### Example (ASPX)
    <%= Html.Kendo().MediaPlayer()
    .Name("MediaPlayer")
    %>


### CheckBox
Creates a new CheckBox.




#### Example (ASPX)
    <%= Html.Kendo().CheckBox()
    .Name("CheckBox")
    %>


### RadioButton
Creates a new RadioButton.




#### Example (ASPX)
    <%= Html.Kendo().RadioButton()
    .Name("RadioButton")
    %>


### TextBox
Creates a new TextBox.




#### Example (ASPX)
    <%= Html.Kendo().TextBox()
    .Name("TextBox")
    %>


### TextBoxT1
Creates a new 1.




#### Example (ASPX)
    <%= Html.Kendo().TextBox<double>()
    .Name("TextBox")
    %>


### Window
Creates a new Window.




#### Example (ASPX)
    <%= Html.Kendo().Window()
    .Name("Window")
    %>


### LinearGauge
Creates a new LinearGauge.




#### Example (ASPX)
    <%= Html.Kendo().LinearGauge()
    .Name("linearGauge")
    %>


### RadialGauge
Creates a new RadialGauge.




#### Example (ASPX)
    <%= Html.Kendo().RadialGauge()
    .Name("radialGauge")
    %>


### DropDownList
Creates a new DropDownList.




#### Example (ASPX)
    <%= Html.Kendo().DropDownList()
    .Name("DropDownList")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### ComboBox
Creates a new ComboBox.




#### Example (ASPX)
    <%= Html.Kendo().ComboBox()
    .Name("ComboBox")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### AutoComplete
Creates a new AutoComplete.




#### Example (ASPX)
    <%= Html.Kendo().AutoComplete()
    .Name("AutoComplete")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### MultiSelect
Creates a new MultiSelect.




#### Example (ASPX)
    <%= Html.Kendo().MultiSelect()
    .Name("MultiSelect")
    .Items(items =>
    {
        items.Add().Text("First Item");
        items.Add().Text("Second Item");
    })
    %>


### SliderT1
Creates a new Slider.




#### Example (ASPX)
    <%= Html.Kendo().Slider()
    .Name("Slider")
    %>


### Slider
Creates a new Slider.




#### Example (ASPX)
    <%= Html.Kendo().Slider()
    .Name("Slider")
    %>


### RangeSliderT1
Creates a new RangeSlider.




#### Example (ASPX)
    <%= Html.Kendo().RangeSlider()
    .Name("RangeSlider")
    %>


### RangeSlider
Creates a new RangeSlider.




#### Example (ASPX)
    <%= Html.Kendo().RangeSlider()
    .Name("RangeSlider")
    %>


### ProgressBar
Creates a new ProgressBar




#### Example (ASPX)
    <%= Html.Kendo().ProgressBar()
    .Name("progressBar")
    %>


### Upload
Creates a Upload




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("ProcessAttachments", "Home")
        .Remove("RemoveAttachment", "Home")
    )
    %>


### Button
Creates a Button




#### Example (ASPX)
    <%= Html.Kendo().Button()
    .Name("Button1");
    %>


### Notification
Creates a Notification




#### Example (ASPX)
    <%= Html.Kendo().Notification()
    .Name("Notification1");
    %>


### ChartT1
Creates a 1




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    %>


### Chart(System.Collections.Generic.IEnumerable\<T1\>)
Creates a new 1 bound to the specified data source.


#### Parameters

##### data `System.Collections.Generic.IEnumerable<T1>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().Chart(Model)
    .Name("Chart")
    %>


### Chart(System.String)
Creates a new 1 bound an item in ViewData.


#### Parameters

##### dataViewDataKey `System.String`
The data source view data key.




#### Example (ASPX)
    <%= Html.Kendo().Chart<SalesData>("sales")
    .Name("Chart")
    %>


### Chart
Creates a new unbound Chart.




#### Example (ASPX)
    <%= Html.Kendo().Chart()
    .Name("Chart")
    .Series(series => {
        series.Bar(new int[] { 1, 2, 3 }).Name("Total Sales");
    })
    %>


### StockChartT1
Creates a 1




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("StockChart")
    %>


### StockChart(System.Collections.Generic.IEnumerable\<T1\>)
Creates a new 1 bound to the specified data source.


#### Parameters

##### data `System.Collections.Generic.IEnumerable<T1>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().StockChart(Model)
    .Name("StockChart")
    %>


### StockChart(System.String)
Creates a new 1 bound an item in ViewData.


#### Parameters

##### dataViewDataKey `System.String`
The data source view data key.




#### Example (ASPX)
    <%= Html.Kendo().StockChart<SalesData>("sales")
    .Name("StockChart")
    %>


### StockChart
Creates a new unbound StockChart.




#### Example (ASPX)
    <%= Html.Kendo().StockChart()
    .Name("StockChart")
    .Series(series => {
        series.Bar(new int[] { 1, 2, 3 }).Name("Total Sales");
    })
    %>


### SparklineT1
Creates a 1




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    %>


### Sparkline(System.Collections.Generic.IEnumerable\<T1\>)
Creates a new 1 bound to the specified data source.


#### Parameters

##### data `System.Collections.Generic.IEnumerable<T1>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline(Model)
    .Name("Sparkline")
    %>


### Sparkline(System.String)
Creates a new 1 bound an item in ViewData.


#### Parameters

##### dataViewDataKey `System.String`
The data source view data key.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline<SalesData>("sales")
    .Name("Sparkline")
    %>


### Sparkline
Creates a new unbound Sparkline.




#### Example (ASPX)
    <%= Html.Kendo().Sparkline()
    .Name("Sparkline")
    .Series(series => {
        series.Bar(new int[] { 1, 2, 3 }).Name("Total Sales");
    })
    %>


### QRCode
Creates a QRCode




#### Example (ASPX)
    <%= Html.Kendo().QRCode()
    .Name("qrCode")
    .Value("Hello World")
    %>


### Culture(System.Boolean)
Returns the kendo culture script for the current .NET culture.


#### Parameters

##### renderScriptTags `System.Boolean`
Determines if the script should be rendered within a script tag





### Culture(System.String,System.Boolean)
Returns the kendo culture scripts for the specified .NET culture.


#### Parameters

##### name `System.String`
The name of the culture.

##### renderScriptTags `System.Boolean`
Determines if the script should be rendered within a script tag





### DeferredScripts(System.Boolean)
Returns the initialization scripts for widgets set as deferred


#### Parameters

##### renderScriptTags `System.Boolean`
Determines if the script should be rendered within a script tag



#### Returns




### DeferredScriptsFor(System.String,System.Boolean)
Returns the initialization scripts for the specified widget.


#### Parameters

##### name `System.String`
The name of the widget.

##### renderScriptTags `System.Boolean`
Determines if the script should be rendered within a script tag



#### Returns




### ContextMenu
Creates a Menu




#### Example (ASPX)
    <%= Html.Kendo().Menu()
    .Name("Menu")
    .Items(items => { /* add items here */ });
    %>


### ColorPicker
Creates a ColorPicker




#### Example (ASPX)
    <%= Html.Kendo().ColorPicker()
    .Name("ColorPicker")
    %>


### Dialog
Creates a Dialog




#### Example (ASPX)
    <%= Html.Kendo().Dialog()
    .Name("Dialog")
    %>


### Editor
Creates a Editor




#### Example (ASPX)
    <%= Html.Kendo().Editor()
    .Name("Editor")
    %>


### GanttT1
Creates a 2




#### Example (ASPX)
    <%= Html.Kendo().Gantt()
    .Name("Gantt")
    %>


### Map
Creates a Map




#### Example (ASPX)
    <%= Html.Kendo().Map()
    .Name("Map")
    %>


### ResponsivePanel
Creates a ResponsivePanel




#### Example (ASPX)
    <%= Html.Kendo().ResponsivePanel()
    .Name("ResponsivePanel")
    %>


### Spreadsheet
Creates a Spreadsheet




#### Example (ASPX)
    <%= Html.Kendo().Spreadsheet()
    .Name("Spreadsheet")
    %>


### ToolBar
Creates a ToolBar




#### Example (ASPX)
    <%= Html.Kendo().ToolBar()
    .Name("ToolBar")
    %>


### TreeListT1
Creates a M:Kendo.Mvc.UI.Fluent.WidgetFactory.TreeList``1(System.Collections.Generic.IEnumerable{``0})




#### Example (ASPX)
    <%= Html.Kendo().TreeList()
    .Name("TreeList")
    %>


### TreeMap
Creates a TreeMap




#### Example (ASPX)
    <%= Html.Kendo().TreeMap()
    .Name("TreeMap")
    %>


### TreeView
Creates a TreeView




#### Example (ASPX)
    <%= Html.Kendo().TreeView()
    .Name("TreeView")
    %>


### Diagram
Creates a Diagram




#### Example (ASPX)
    <%= Html.Kendo().Diagram()
    .Name("Diagram")
    %>


### DiagramT1
Creates a Diagram




#### Example (ASPX)
    <%= Html.Kendo().Diagram()
    .Name("Diagram")
    %>


### Gantt(System.Collections.Generic.IEnumerable\<T1\>,System.Collections.Generic.IEnumerable\<T1\>)
Creates a new !:Kendo.Mvc.UI.Gantt<T> bound to the specified data source.


#### Parameters

##### dataSource `System.Collections.Generic.IEnumerable<T1>`
The data source.




#### Example (ASPX)
    <%= Html.Kendo().Gantt(ViewBag.Tasks)
    .Name("Gantt")
    %>


### Gantt(System.String,System.String)
Creates a new !:Kendo.Mvc.UI.Gantt<T> bound an item in ViewData.


#### Parameters

##### dataSourceViewDataKey `System.String`
The data source view data key.




#### Example (ASPX)
    <%= Html.Kendo().Gantt("tasks")
    .Name("Gantt")
    %>


### MobileActionSheet
Creates a MobileActionSheet




#### Example (ASPX)
    <%= Html.Kendo().MobileActionSheet()
    .Name("MobileActionSheet")
    %>


### MobileApplication
Creates a MobileApplication




#### Example (ASPX)
    <%= Html.Kendo().MobileApplication()
    .Name("MobileApplication")
    %>


### MobileBackButton
Creates a MobileBackButton




#### Example (ASPX)
    <%= Html.Kendo().MobileBackButton()
    .Name("MobileBackButton")
    %>


### MobileButton
Creates a MobileButton




#### Example (ASPX)
    <%= Html.Kendo().MobileButton()
    .Name("MobileButton")
    %>


### MobileButtonGroup
Creates a MobileButtonGroup




#### Example (ASPX)
    <%= Html.Kendo().MobileButtonGroup()
    .Name("MobileButtonGroup")
    %>


### MobileCollapsible
Creates a MobileCollapsible




#### Example (ASPX)
    <%= Html.Kendo().MobileCollapsible()
    .Name("MobileCollapsible")
    %>


### MobileDetailButton
Creates a MobileDetailButton




#### Example (ASPX)
    <%= Html.Kendo().MobileDetailButton()
    .Name("MobileDetailButton")
    %>


### MobileDrawer
Creates a MobileDrawer




#### Example (ASPX)
    <%= Html.Kendo().MobileDrawer()
    .Name("MobileDrawer")
    %>


### MobileLayout
Creates a MobileLayout




#### Example (ASPX)
    <%= Html.Kendo().MobileLayout()
    .Name("MobileLayout")
    %>


### MobileModalView
Creates a MobileModalView




#### Example (ASPX)
    <%= Html.Kendo().MobileModalView()
    .Name("MobileModalView")
    %>


### MobileNavBar
Creates a MobileNavBar




#### Example (ASPX)
    <%= Html.Kendo().MobileNavBar()
    .Name("MobileNavBar")
    %>


### MobilePopOver
Creates a MobilePopOver




#### Example (ASPX)
    <%= Html.Kendo().MobilePopOver()
    .Name("MobilePopOver")
    %>


### MobileScrollView
Creates a MobileScrollView




#### Example (ASPX)
    <%= Html.Kendo().MobileScrollView()
    .Name("MobileScrollView")
    %>


### MobileSplitView
Creates a MobileSplitView




#### Example (ASPX)
    <%= Html.Kendo().MobileSplitView()
    .Name("MobileSplitView")
    %>


### MobileSwitch
Creates a MobileSwitch




#### Example (ASPX)
    <%= Html.Kendo().MobileSwitch()
    .Name("MobileSwitch")
    %>


### MobileTabStrip
Creates a MobileTabStrip




#### Example (ASPX)
    <%= Html.Kendo().MobileTabStrip()
    .Name("MobileTabStrip")
    %>


### MobileView
Creates a MobileView




#### Example (ASPX)
    <%= Html.Kendo().MobileView()
    .Name("MobileView")
    %>



