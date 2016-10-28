namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;
    using System.Linq.Expressions;

    /// <summary>
    /// Defines the fluent API for configuring the EditorImportSettings settings.
    /// </summary>
    public class EditorImportSettingsBuilder: IHideObjectMembers
    {
        private readonly EditorImportSettings container;

        public EditorImportSettingsBuilder(EditorImportSettings settings)
        {
            container = settings;
        }

        /// <summary>
        /// Lists which file extensions are allowed to be uploaded. Recognizes entries of both .type and type values.
        /// </summary>
        /// <param name="value">The value that configures the allowedextensions.</param>
        public EditorImportSettingsBuilder AllowedExtensions(string[] value)
        {
            container.AllowedExtensions = value;

            return this;
        }

        /// <summary>
        /// Defines the maximum file size that can be uploaded in bytes.
        /// </summary>
        /// <param name="value">The value that configures the maxFileSize.</param>
        public EditorImportSettingsBuilder MaxFileSize(double? value)
        {
            container.MaxFileSize = value;

            return this;
        }

        /// <summary>
        /// Sets the action and controller for the import operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Import(import => import
        ///                 .Proxy("EditorImport", "Home");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Proxy(string actionName, string controllerName)
        {
            container.Proxy.Action(actionName, controllerName, (object)null);

            return this;
        }

        /// <summary>
        /// Sets the action for the import operation
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .Import(import => import
        ///                 .Proxy&lt;HomeController&gt;(controller => controller.Import())
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Proxy<TController>(Expression<Action<TController>> controllerAction)
            where TController : System.Web.Mvc.Controller
        {
            container.Proxy.Action(controllerAction);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Error client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Error(@<text>function(e){ console.log(e.files[0].name); }</text>)
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Error(Func<object, object> inlineCodeBlock)
        {
            container.Error.TemplateDelegate = inlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Error client-side event.
        /// </summary>
        /// <param name="onErrorHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Error("onError")
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Error(string onErrorHandlerName)
        {
            container.Error.HandlerName = onErrorHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Complete client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Complete(@<text>function(e){ console.log(e); }</text>)
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Complete(Func<object, object> inlineCodeBlock)
        {
            container.Complete.TemplateDelegate = inlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Complete client-side event.
        /// </summary>
        /// <param name="onCompleteHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Complete("onComplete")
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Complete(string onCompleteHandlerName)
        {
            container.Complete.HandlerName = onCompleteHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Select(@<text>function(e){ console.log(e); }</text>)
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Select(Func<object, object> inlineCodeBlock)
        {
            container.Select.TemplateDelegate = inlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Select client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Select("onSelect")
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Select(string onSelectHandlerName)
        {
            container.Select.HandlerName = onSelectHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Success client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Success(@<text>function(e){ console.log(e); }</text>)
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Success(Func<object, object> inlineCodeBlock)
        {
            container.Success.TemplateDelegate = inlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Success client-side event.
        /// </summary>
        /// <param name="onSuccessHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Success("onSuccess")
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Success(string onSuccessHandlerName)
        {
            container.Success.HandlerName = onSuccessHandlerName;

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Progress client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Progress(@<text>function(e){ console.log(e); }</text>)
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Progress(Func<object, object> inlineCodeBlock)
        {
            container.Progress.TemplateDelegate = inlineCodeBlock;

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the Progress client-side event.
        /// </summary>
        /// <param name="onProgressHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        ///     &lt;%= Html.Kendo().Editor()
        ///         .Name("Editor")
        ///         .Import(import => import
        ///                 .Progress("onProgress")
        ///          )
        /// </code>
        /// </example>
        public EditorImportSettingsBuilder Progress(string onProgressHandlerName)
        {
            container.Progress.HandlerName = onProgressHandlerName;

            return this;
        }
    }
}