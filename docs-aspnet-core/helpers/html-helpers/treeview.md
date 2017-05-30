---
title: TreeView
page_title: TreeView | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the TreeView HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_treeview_aspnetcore
---

# TreeView HtmlHelper Overview

The TreeView HtmlHelper extension is a server-side wrapper for the [Kendo UI TreeView](http://demos.telerik.com/kendo-ui/treeview/index) widget.

The [Kendo UI TreeView widget](http://docs.telerik.com/kendo-ui/controls/navigation/treeview/overview) displays hierarchical data in a traditional tree structure. It supports user interaction through mouse or touch events to perform re-ordering operations by using the drag-and-drop functionality.

For more information on the HtmlHelper, refer to the article on the [TreeView HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/treeview/overview).

## Basic Usage

The following example demonstrates how to define the TreeView by using the TreeView HtmlHelper.

###### Example

```tab-Razor  

    @(Html.Kendo().TreeView()
        .Name("treeview")
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "TreeView")
            )            
        )
    )

```
```tab-Controller

    public class TreeViewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Employees(int? id)
        {
            var dataContext = new SampleEntities();

            var employees = from e in dataContext.Employees
                            where (id.HasValue ? e.ReportsTo == id : e.ReportsTo == null)
                            select new {
                                id = e.EmployeeID,
                                Name = e.FirstName + " " + e.LastName,
                                hasChildren = e.Employees1.Any()
                            };

            return Json(employees);
        }
    }

```

## Configuration

The following example demonstrates the basic configuration of the TreeView HtmlHelper and how to get the TreeView instance.

###### Example

```tab-Razor

    @(Html.Kendo().TreeView()
        .Name("treeview")
        .Checkboxes(true)
        .DragAndDrop(true)        
        .DataTextField("Name")
        .DataSource(dataSource => dataSource
            .Read(read => read
                .Action("Employees", "TreeView")
            )
        )
        .Events(events => events
            .Change("onChange")
            .Select("onSelect")
            .Check("onCheck")
            .Collapse("onCollapse")
            .Expand("onExpand")
            .DragStart("onDragStart")
            .Drag("onDrag")
            .Drop("onDrop")
            .DragEnd("onDragEnd")
        )
    )

    <script type="text/javascript">
        $(function () {
            //Notice that the Name() of the TreeView is used to get its client-side instance.
            var treeview = $("#treeview").data("kendoTreeView");
            console.log(treeview);
        });
    </script>
    
```

## See Also

* [JavaScript API Reference of the TreeView](http://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
* [TreeView HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/treeview/overview)
* [TreeView Official Demos](http://demos.telerik.com/aspnet-core/treeview/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
