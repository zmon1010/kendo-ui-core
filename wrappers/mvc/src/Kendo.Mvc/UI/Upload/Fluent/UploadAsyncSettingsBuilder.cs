namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Routing;

    /// <summary>
    /// A builder class for <see cref="IUploadAsyncSettings"/>
    /// </summary>
    public class UploadAsyncSettingsBuilder : IHideObjectMembers
    {
        private readonly IUploadAsyncSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="UploadAsyncSettingsBuilder" /> class.
        /// </summary>
        /// <param name="asyncSettings">The async settings.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Save", "Home", new RouteValueDictionary{ {"id", 1} })
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder(IUploadAsyncSettings asyncSettings)
        {
            settings = asyncSettings;
        }

        /// <summary>
        /// Sets a value indicating whether to start the upload immediately after selecting a file
        /// </summary>
        /// <param name="value">true if the upload should start immediately after selecting a file, false otherwise; true by default</param>
        /// <remarks>
        ///
        /// </remarks>
        public UploadAsyncSettingsBuilder AutoUpload(bool value)
        {
            settings.AutoUpload = value;

            return this;
        }

        /// <summary>
        /// Sets a value indicating whether to upload selected files in one batch (request)
        /// </summary>
        /// <param name="value">true if the files should be uploaded in a single request, false otherwise; false by default</param>
        /// <remarks>
        /// 
        /// </remarks>
        public UploadAsyncSettingsBuilder Batch(bool value)
        {
            settings.Batch = value;

            return this;
        }

         /// When the property is set the selected files will be uploaded chunk by chunk with the declared size. 
        /// Each request sends a separate file blob and additional string metadata to the server. 
        /// This metadata is a stringified JSON and contains chunkIndex, contentType, totalFileSize, totalChunks, uploadUid properties that
        /// allow validating and combining the file on the server side. The response also returns a JSON object with uploaded and fileUid properties
        /// that notifies the client which should be the next chunk.
         /// </summary>
         /// <param name="value">The value for ChunkSize</param>
         public UploadAsyncSettingsBuilder ChunkSize(double value)
         {
             settings.ChunkSize = value;
             return this;
         }
 
         /// <summary>
         /// By default the selected files are uploaded one after another. When set to 'true' all 
         /// the selected files start uploading simultaneously.
         /// (The property is available when the async.chunkSize is set.)
         /// </summary>
         /// <param name="value">The value for Concurrent</param>
         public UploadAsyncSettingsBuilder Concurrent(bool value)
         {
             settings.Concurrent = value;
             return this;
         }
 
         /// <summary>
         /// By default the selected files are uploaded one after another. When set to 'true' all 
         /// the selected files start uploading simultaneously.
         /// (The property is available when the async.chunkSize is set.)
         /// </summary>
         public UploadAsyncSettingsBuilder Concurrent()
         {
             settings.Concurrent = true;
             return this;
         }
 
         /// <summary>
         /// It sets the number of attempts that will be performed if an upload is failing.
         /// The property is only used when the async.autoRetryAfter property is also defined.
         /// </summary>
         /// <param name="value">The value for MaxAutoRetries</param>
         public UploadAsyncSettingsBuilder MaxAutoRetries(double value)
         {
             settings.MaxAutoRetries = value;
             return this;
         }
 
         /// <summary>
         /// If the property is set the failed upload request will be repeated after the declared amount of ticks.
         /// </summary>
         /// <param name="value">The value for AutoRetryAfter</param>
         public UploadAsyncSettingsBuilder AutoRetryAfter(double value)
         {
             settings.AutoRetryAfter = value;
             return this;
         }

        /// <summary>
        /// Sets the action, controller and route values for the save operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Save", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Save(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Save.Action(actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the save operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Save", "Home", new { id = 1 });
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Save(string actionName, string controllerName, object routeValues)
        {
            settings.Save.Action(actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action and controller for the save operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Save", "Home");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Save(string actionName, string controllerName)
        {
            return Save(actionName, controllerName, (object) null);
        }

        /// <summary>
        /// Sets the route name for the save operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Default");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Save(string routeName)
        {
            return Save(routeName, (object)null);
        }

        /// <summary>
        /// Sets the route values for the save operation
        /// </summary>
        /// <param name="routeValues">The route values of the action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save(MVC.Home.Save(1).GetRouteValueDictionary());
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Save(RouteValueDictionary routeValues)
        {
            settings.Save.Action(routeValues);

            return this;
        }

        /// <summary>
        /// Sets the route and values for the save operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Default", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Save(string routeName, RouteValueDictionary routeValues)
        {
            settings.Save.Route(routeName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the route and values for the save operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save("Default", new { id = 1 });
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Save(string routeName, object routeValues)
        {
            settings.Save.Route(routeName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action for the save operation
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Save&lt;HomeController&gt;(controller => controller.Save())
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Save<TController>(Expression<Action<TController>> controllerAction)
            where TController : Controller
        {
            settings.Save.Action(controllerAction);

            return this;
        }

        /// <summary>
        /// Sets the field name for the save operation
        /// </summary>
        /// <param name="fieldName">
        ///     The form field name to use for submiting the files.
        ///     The Upload name is used if not set.
        /// </param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .SaveField("attachment");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder SaveField(string fieldName)
        {
            settings.SaveField = fieldName;
            return this;
        }

        /// <summary>
        /// Sets an absolute or relative Save action URL.
        /// Note that the URL must be in the same domain for the upload to succeed.
        /// </summary>
        /// <param name="url">The Save action URL.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .SaveUrl("/save");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder SaveUrl(string url)
        {
            settings.Save.Url(url);
            return this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the remove operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Remove("Remove", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Remove(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Remove.Action(actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action, controller and route values for the remove operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Remove("Remove", "Home", new { id = 1 });
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Remove(string actionName, string controllerName, object routeValues)
        {
            settings.Remove.Action(actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action and controller for the remove operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Remove("Remove", "Home");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Remove(string actionName, string controllerName)
        {
            return Remove(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Sets the route name for the remove operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Remove("Default");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Remove(string routeName)
        {
            return Remove(routeName, (object)null);
        }

        /// <summary>
        /// Sets the route values for the remove operation
        /// </summary>
        /// <param name="routeValues">The route values of the action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Remove(MVC.Home.Remove(1).GetRouteValueDictionary());
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Remove(RouteValueDictionary routeValues)
        {
            settings.Remove.Action(routeValues);

            return this;
        }

        /// <summary>
        /// Sets the route and values for the remove operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Remove("Default", "Home", new RouteValueDictionary{ {"id", 1} });
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Remove(string routeName, RouteValueDictionary routeValues)
        {
            settings.Remove.Route(routeName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the route and values for the remove operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Remove("Default", new { id = 1 });
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Remove(string routeName, object routeValues)
        {
            settings.Remove.Route(routeName, routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action for the remove operation
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .Remove&lt;HomeController&gt;(controller => controller.Remove())
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder Remove<TController>(Expression<Action<TController>> controllerAction)
            where TController : Controller
        {
            settings.Remove.Action(controllerAction);

            return this;
        }

        /// <summary>
        /// Sets an absolute or relative Remove action URL.
        /// Note that the URL must be in the same domain for the operation to succeed.
        /// </summary>
        /// <param name="url">The Remove action URL.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .RemoveUrl("/remove");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder RemoveUrl(string url)
        {
            settings.Remove.Url(url);
            return this;
        }

        /// <summary>
        /// Sets the field name for the remove operation
        /// </summary>
        /// <param name="fieldName">
        ///     The form field name to use for submiting the files.
        ///     "fileNames" is used if not set.
        /// </param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Upload()
        ///             .Name("Upload")
        ///             .Async(async => async
        ///                 .RemoveField("attachments");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public UploadAsyncSettingsBuilder RemoveField(string fieldName)
        {
            settings.RemoveField = fieldName;
            return this;
        }

        /// <summary>
        /// By default, the files are uploaded as filedata. When set to true, the files are read as file buffer by using FileReader and this buffer is send in the request body.
        /// </summary>
        /// <param name="value">true if arrayBuffer should be send; false by default</param>
        public UploadAsyncSettingsBuilder UseArrayBuffer(bool useArrayBuffer)
        {
            settings.UseArrayBuffer = useArrayBuffer;
            return this;
        }

        /// <summary>
        /// Sets a value indicating whether to send credentials (cookies, headers) for cross-site requests.
        /// </summary>
        /// <param name="value">true if credentials should be sent, false otherwise; true by default</param>
        public UploadAsyncSettingsBuilder WithCredentials(bool withCredentials)
        {
            settings.WithCredentials = withCredentials;
            return this;
        }
    }
}
