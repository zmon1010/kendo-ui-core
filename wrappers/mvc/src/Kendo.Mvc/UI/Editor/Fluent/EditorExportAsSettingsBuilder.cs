using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using System.Web.Routing;
using System;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the FileBrowser.
    /// </summary>
    public class EditorExportAsSettingsBuilder : IHideObjectMembers
    {
        private readonly EditorExportAsSettings settings;

        public EditorExportAsSettingsBuilder(EditorExportAsSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Sets the name of the file in which the content will be exported.
        /// </summary>
        /// <param name="fileName">The name of the exported file.</param>
        public EditorExportAsSettingsBuilder FileName(string fileName)
        {
            settings.FileName = fileName;

            return this;
        }

       /// <summary>
        /// Sets the action and controller for the export operation
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .exportAs(exportAs => exportAs
        ///                 .Proxy("EditorExport", "Home");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public EditorExportAsSettingsBuilder Proxy(string actionName, string controllerName)
        {
            this.settings.Proxy.Action(actionName, controllerName, (object) null);

            return this;
        }

        /// <summary>
        /// Sets the route name for the export operation
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .ExportAs(exportAs => exportAs
        ///                 .Proxy("Default");
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public EditorExportAsSettingsBuilder Proxy(string routeName)
        {
            settings.Proxy.Route(routeName, (object) null);

            return this;
        }

        /// <summary>
        /// Sets the action for the export operation
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .ExportAs(exportAs => exportAs
        ///                 .Proxy&lt;HomeController&gt;(controller => controller.Export())
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public EditorExportAsSettingsBuilder Proxy<TController>(Expression<Action<TController>> controllerAction)
            where TController : Controller
        {
            settings.Proxy.Action(controllerAction);

            return this;
        }
    }
}
