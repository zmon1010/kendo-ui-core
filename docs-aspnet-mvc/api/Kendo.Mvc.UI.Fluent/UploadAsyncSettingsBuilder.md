---
title: UploadAsyncSettingsBuilder
---

# Kendo.Mvc.UI.Fluent.UploadAsyncSettingsBuilder
A builder class for IUploadAsyncSettings




## Methods


### AutoUpload(System.Boolean)
Sets a value indicating whether to start the upload immediately after selecting a file


#### Parameters

##### value `System.Boolean`
true if the upload should start immediately after selecting a file, false otherwise; true by default





### Batch(System.Boolean)
Sets a value indicating whether to upload selected files in one batch (request)


#### Parameters

##### value `System.Boolean`
true if the files should be uploaded in a single request, false otherwise; false by default





### Save(System.String,System.String,System.Web.Routing.RouteValueDictionary)
Sets the action, controller and route values for the save operation


#### Parameters

##### actionName `System.String`
Name of the action.

##### controllerName `System.String`
Name of the controller.

##### routeValues `System.Web.Routing.RouteValueDictionary`
The route values.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("Save", "Home", new RouteValueDictionary{ {"id", 1} });
    )
    %>


### Save(System.String,System.String,System.Object)
Sets the action, controller and route values for the save operation


#### Parameters

##### actionName `System.String`
Name of the action.

##### controllerName `System.String`
Name of the controller.

##### routeValues `System.Object`
The route values.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("Save", "Home", new { id = 1 });
    )
    %>


### Save(System.String,System.String)
Sets the action and controller for the save operation


#### Parameters

##### actionName `System.String`
Name of the action.

##### controllerName `System.String`
Name of the controller.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("Save", "Home");
    )
    %>


### Save(System.String)
Sets the route name for the save operation


#### Parameters

##### routeName `System.String`
Name of the route.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("Default");
    )
    %>


### Save(System.Web.Routing.RouteValueDictionary)
Sets the route values for the save operation


#### Parameters

##### routeValues `System.Web.Routing.RouteValueDictionary`
The route values of the action method.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save(MVC.Home.Save(1).GetRouteValueDictionary());
    )
    %>


### Save(System.String,System.Web.Routing.RouteValueDictionary)
Sets the route and values for the save operation


#### Parameters

##### routeName `System.String`
Name of the route.

##### routeValues `System.Web.Routing.RouteValueDictionary`
The route values.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("Default", "Home", new RouteValueDictionary{ {"id", 1} });
    )
    %>


### Save(System.String,System.Object)
Sets the route and values for the save operation


#### Parameters

##### routeName `System.String`
Name of the route.

##### routeValues `System.Object`
The route values.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save("Default", new { id = 1 });
    )
    %>


### Save(System.Linq.Expressions.Expression\<System.Action\<T1\>\>)
Sets the action for the save operation


#### Parameters

##### controllerAction `System.Linq.Expressions.Expression<System.Action<T1>>`
The action.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Save<HomeController>(controller => controller.Save())
    )
    %>


### SaveField(System.String)
Sets the field name for the save operation


#### Parameters

##### fieldName `System.String`
The form field name to use for submiting the files.
                The Upload name is used if not set.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .SaveField("attachment");
    )
    %>


### SaveUrl(System.String)
Sets an absolute or relative Save action URL.
            Note that the URL must be in the same domain for the upload to succeed.


#### Parameters

##### url `System.String`
The Save action URL.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .SaveUrl("/save");
    )
    %>


### Remove(System.String,System.String,System.Web.Routing.RouteValueDictionary)
Sets the action, controller and route values for the remove operation


#### Parameters

##### actionName `System.String`
Name of the action.

##### controllerName `System.String`
Name of the controller.

##### routeValues `System.Web.Routing.RouteValueDictionary`
The route values.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Remove("Remove", "Home", new RouteValueDictionary{ {"id", 1} });
    )
    %>


### Remove(System.String,System.String,System.Object)
Sets the action, controller and route values for the remove operation


#### Parameters

##### actionName `System.String`
Name of the action.

##### controllerName `System.String`
Name of the controller.

##### routeValues `System.Object`
The route values.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Remove("Remove", "Home", new { id = 1 });
    )
    %>


### Remove(System.String,System.String)
Sets the action and controller for the remove operation


#### Parameters

##### actionName `System.String`
Name of the action.

##### controllerName `System.String`
Name of the controller.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Remove("Remove", "Home");
    )
    %>


### Remove(System.String)
Sets the route name for the remove operation


#### Parameters

##### routeName `System.String`
Name of the route.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Remove("Default");
    )
    %>


### Remove(System.Web.Routing.RouteValueDictionary)
Sets the route values for the remove operation


#### Parameters

##### routeValues `System.Web.Routing.RouteValueDictionary`
The route values of the action method.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Remove(MVC.Home.Remove(1).GetRouteValueDictionary());
    )
    %>


### Remove(System.String,System.Web.Routing.RouteValueDictionary)
Sets the route and values for the remove operation


#### Parameters

##### routeName `System.String`
Name of the route.

##### routeValues `System.Web.Routing.RouteValueDictionary`
The route values.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Remove("Default", "Home", new RouteValueDictionary{ {"id", 1} });
    )
    %>


### Remove(System.String,System.Object)
Sets the route and values for the remove operation


#### Parameters

##### routeName `System.String`
Name of the route.

##### routeValues `System.Object`
The route values.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Remove("Default", new { id = 1 });
    )
    %>


### Remove(System.Linq.Expressions.Expression\<System.Action\<T1\>\>)
Sets the action for the remove operation


#### Parameters

##### controllerAction `System.Linq.Expressions.Expression<System.Action<T1>>`
The action.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .Remove<HomeController>(controller => controller.Remove())
    )
    %>


### RemoveUrl(System.String)
Sets an absolute or relative Remove action URL.
            Note that the URL must be in the same domain for the operation to succeed.


#### Parameters

##### url `System.String`
The Remove action URL.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .RemoveUrl("/remove");
    )
    %>


### RemoveField(System.String)
Sets the field name for the remove operation


#### Parameters

##### fieldName `System.String`
The form field name to use for submiting the files.
                "fileNames" is used if not set.




#### Example (ASPX)
    <%= Html.Kendo().Upload()
    .Name("Upload")
    .Async(async => async
        .RemoveField("attachments");
    )
    %>


### WithCredentials(System.Boolean)
Sets a value indicating whether to send credentials (cookies, headers) for cross-site requests.


#### Parameters

##### value `System.Boolean`
true if credentials should be sent, false otherwise; true by default






