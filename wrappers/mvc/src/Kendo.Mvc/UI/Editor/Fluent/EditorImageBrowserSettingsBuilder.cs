using System.Web.Mvc;
using Kendo.Mvc.Extensions;
using System.Web.Routing;
using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the ImageBrowser.
    /// </summary>
    public class EditorImageBrowserSettingsBuilder : IHideObjectMembers
    {
        private readonly EditorImageBrowserSettings settings;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        /// <summary>
        /// Initializes a new instance of the <see cref="EditorImageBrowserSettingsBuilder{T}"/> class.
        /// </summary>
        /// <param name="settings">The Image Browser settings.</param>
        /// <param name="viewContext">The view context</param>
        /// <param name="urlGenerator">The URL generator.</param>
        public EditorImageBrowserSettingsBuilder(EditorImageBrowserSettings settings, ViewContext viewContext, IUrlGenerator urlGenerator)
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
        public EditorImageBrowserSettingsBuilder Read(string actionName, string controllerName)
        {
            return Read(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Read action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorImageBrowserSettingsBuilder Read(string actionName, string controllerName, RouteValueDictionary routeValues)
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
        public EditorImageBrowserSettingsBuilder Read(string actionName, string controllerName, object routeValues)
        {
            settings.Read.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Read);

            return this;
        }

        /// <summary>
        /// Defines the Read action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorImageBrowserSettingsBuilder Read(Action<EditorImageBrowserOperationBuilder> configurator)
        {
            configurator(new EditorImageBrowserOperationBuilder(settings.Read, viewContext, urlGenerator));

            return this;
        }

        private void SetUrl(INavigatable operation)
        {
            operation.Url = operation.GenerateUrl(viewContext, urlGenerator);
        }

        /// <summary>
        /// Defines the Thumbnail action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorImageBrowserSettingsBuilder Thumbnail(string actionName, string controllerName)
        {
            return Thumbnail(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Thumbnail action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorImageBrowserSettingsBuilder Thumbnail(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Thumbnail.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Thumbnail);

            return this;
        }

        /// <summary>
        /// Defines the Thumbnail action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorImageBrowserSettingsBuilder Thumbnail(string actionName, string controllerName, object routeValues)
        {
            settings.Thumbnail.Action(actionName, controllerName, routeValues);

            SetUrl(settings.Thumbnail);

            return this;
        }

        /// <summary>
        /// Defines the Thumbnail action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorImageBrowserSettingsBuilder Thumbnail(Action<EditorImageBrowserOperationBuilder> configurator)
        {
            configurator(new EditorImageBrowserOperationBuilder(settings.Thumbnail, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the Image action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorImageBrowserSettingsBuilder Image(string actionName, string controllerName)
        {
            return Image(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Image action.
        /// </summary>
        /// <param name="url">The URL.</param>
        public EditorImageBrowserSettingsBuilder Image(string url)
        {
            settings.Image.Url = urlGenerator.Generate(viewContext.RequestContext, url);
            return this;
        }

        /// <summary>
        /// Defines the Image action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorImageBrowserSettingsBuilder Image(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            settings.Image.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Image);
            return this;
        }

        /// <summary>
        /// Defines the Image action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorImageBrowserSettingsBuilder Image(string actionName, string controllerName, object routeValues)
        {
            settings.Image.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Image);
            return this;
        }

        /// <summary>
        /// Defines the Image action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorImageBrowserSettingsBuilder Image(Action<EditorImageBrowserOperationBuilder> configurator)
        {
            configurator(new EditorImageBrowserOperationBuilder(settings.Image, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the Upload action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorImageBrowserSettingsBuilder Upload(string actionName, string controllerName)
        {
            return Upload(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Upload action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorImageBrowserSettingsBuilder Upload(string actionName, string controllerName, RouteValueDictionary routeValues)
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
        public EditorImageBrowserSettingsBuilder Upload(string actionName, string controllerName, object routeValues)
        {
            settings.Upload.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Upload);
            return this;
        }

        /// <summary>
        /// Defines the Upload action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorImageBrowserSettingsBuilder Upload(Action<EditorImageBrowserOperationBuilder> configurator)
        {
            configurator(new EditorImageBrowserOperationBuilder(settings.Upload, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the Destroy action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorImageBrowserSettingsBuilder Destroy(string actionName, string controllerName)
        {
            return Destroy(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Destroy action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorImageBrowserSettingsBuilder Destroy(string actionName, string controllerName, RouteValueDictionary routeValues)
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
        public EditorImageBrowserSettingsBuilder Destroy(string actionName, string controllerName, object routeValues)
        {
            settings.Destroy.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Destroy);
            return this;
        }

        /// <summary>
        /// Defines the Destroy action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorImageBrowserSettingsBuilder Destroy(Action<EditorImageBrowserOperationBuilder> configurator)
        {
            configurator(new EditorImageBrowserOperationBuilder(settings.Destroy, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the Create action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        public EditorImageBrowserSettingsBuilder Create(string actionName, string controllerName)
        {
            return Create(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Defines the Create action.
        /// </summary>
        /// <param name="actionName">The name of the action.</param>
        /// <param name="controllerName">The name of the controller</param>
        /// <param name="routeValues">The route values.</param>
        public EditorImageBrowserSettingsBuilder Create(string actionName, string controllerName, RouteValueDictionary routeValues)
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
        public EditorImageBrowserSettingsBuilder Create(string actionName, string controllerName, object routeValues)
        {
            settings.Create.Action(actionName, controllerName, routeValues);
            SetUrl(settings.Create);
            return this;
        }

        /// <summary>
        /// Defines the Create action.
        /// </summary>
        /// <param name="configurator">The configuration action.</param>
        public EditorImageBrowserSettingsBuilder Create(Action<EditorImageBrowserOperationBuilder> configurator)
        {
            configurator(new EditorImageBrowserOperationBuilder(settings.Create, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Defines the file types.
        /// </summary>
        /// <param name="value">The file types.</param>
        public EditorImageBrowserSettingsBuilder FileTypes(string value)
        {
            settings.FileTypes = value;

            return this;
        }
    }
}
