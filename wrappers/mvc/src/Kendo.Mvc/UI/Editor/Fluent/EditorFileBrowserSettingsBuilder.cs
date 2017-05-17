using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using System.Web.Routing;
using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the FileBrowser.
    /// </summary>
    public class EditorFileBrowserSettingsBuilder : IHideObjectMembers
    {
        private readonly EditorFileBrowserSettings settings;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        /// <summary>
        /// Initializes a new instance of the <see cref="EditorFileBrowserSettingsBuilder{T}"/> class.
        /// </summary>
        /// <param name="settings">The File Browser settings.</param>
        /// <param name="viewContext">The view context</param>
        /// <param name="urlGenerator">The URL generator.</param>
        public EditorFileBrowserSettingsBuilder(EditorFileBrowserSettings settings, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.settings = settings;
        }

        /// <summary>
        /// Defines the Read action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorFileBrowserSettingsBuilder Read(string actionName, string controllerName)
        {
            return Read(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Read action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder Read(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Read.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Read);

            return this;
        }

        /// <summary>
        /// Defines the Read action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder Read(string actionName, string controllerName, object routeValues)
        {
            settings.Read.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Read);

            return this;
        }

        /// <summary>
        /// Defines the Read action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorFileBrowserSettingsBuilder Read(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.Read, viewContext, urlGenerator));

            return this;
        }

        private void SetUrl(INavigatable operation)
        {
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }

        /// <summary>
        /// Defines the File action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorFileBrowserSettingsBuilder File(string actionName, string controllerName)
        {
            return File(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the File action.
        /// </summary>
        /// <param name="url">The URL.</param>
        public EditorFileBrowserSettingsBuilder File(string url)
        {
            settings.File.Url = urlGenerator.Generate(viewContext.RequestContext, url);
            return this;
        }

        /// <summary>
        /// Defines the File action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder File(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.File.Action(actionName, controllerName, routeValues);
            SetUrl(settings.File);
            return this;
        }

        /// <summary>
        /// Defines the File action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder File(string actionName, string controllerName, object routeValues)
        {
            settings.File.Action(actionName, controllerName, routeValues);
            SetUrl(settings.File);
            return this;
        }

        /// <summary>
        /// Defines the File action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorFileBrowserSettingsBuilder File(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.File, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the Upload action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName)
        {
            return Upload(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Upload action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Upload.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Upload);

            return this;
        }

        /// <summary>
        /// Defines the Upload action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder Upload(string actionName, string controllerName, object routeValues)
        {
            settings.Upload.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Upload);
            return this;
        }

        /// <summary>
        /// Defines the Upload action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorFileBrowserSettingsBuilder Upload(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.Upload, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the Destroy action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorFileBrowserSettingsBuilder Destroy(string actionName, string controllerName)
        {
            return Destroy(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Destroy action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder Destroy(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Destroy.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Destroy);
            return this;
        }

        /// <summary>
        /// Defines the Destroy action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder Destroy(string actionName, string controllerName, object routeValues)
        {
            settings.Destroy.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Destroy);
            return this;
        }

        /// <summary>
        /// Defines the Destroy action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorFileBrowserSettingsBuilder Destroy(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.Destroy, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the Create action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorFileBrowserSettingsBuilder Create(string actionName, string controllerName)
        {
            return Create(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Create action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder Create(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Create.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Create);
            return this;
        }

        /// <summary>
        /// Defines the Create action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorFileBrowserSettingsBuilder Create(string actionName, string controllerName, object routeValues)
        {
            settings.Create.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Create);
            return this;
        }

        /// <summary>
        /// Defines the Create action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorFileBrowserSettingsBuilder Create(Action<EditorFileBrowserOperationBuilder> configurator)
        {
            configurator(new EditorFileBrowserOperationBuilder(settings.Create, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the file types.
        /// </summary>
        /// <param name="value">The file types.</param>
        public EditorFileBrowserSettingsBuilder FileTypes(string value)
        {
            settings.FileTypes = value;

            return this;
        }
    }
}
