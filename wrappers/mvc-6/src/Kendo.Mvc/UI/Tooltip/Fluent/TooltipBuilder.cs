using System;
using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Routing;
using Microsoft.Framework.DependencyInjection;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Tooltip
    /// </summary>
    public partial class TooltipBuilder: WidgetBuilderBase<Tooltip, TooltipBuilder>
        
    {

        public TooltipBuilder(Tooltip component) : base(component)
        {
        }

        /// <summary>
        /// The selector which to match the DOM element to which the Tooltip widget will be instantiated
        /// </summary>
        /// <param name="selector">jQuery selector</param>
        /// <returns></returns>
        public virtual TooltipBuilder For(string selector)
        {
            Component.Container = selector;
            return this;
        }

        // Hide the Name
        new protected TooltipBuilder Name(string componentName)
        {
            return base.Name(componentName);
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///         .For("#element")
        ///         .LoadContentFrom(MVC.Home.Index().GetRouteValueDictionary());
        /// %&gt;
        /// </code>
        /// </example>
        public TooltipBuilder LoadContentFrom(RouteValueDictionary routeValues)
        {
            return routeValues.ApplyTo<TooltipBuilder>(LoadContentFrom) as TooltipBuilder;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content. 
        /// </summary>
        /// <param name="actionName">The action name.</param>
        /// <param name="controllerName">The controller name.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .LoadContentFrom("AjaxView_OpenSource", "Tooltip")
        /// %&gt;
        /// </code>
        /// </example>
        public TooltipBuilder LoadContentFrom(string actionName, string controllerName)
        {
            return LoadContentFrom(actionName, controllerName, (object)null) as TooltipBuilder;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content.
        /// </summary>
        /// <param name="actionName">The action name.</param>
        /// <param name="controllerName">The controller name.</param>
        /// <param name="routeValues">Route values.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .LoadContentFrom("AjaxView_OpenSource", "Tooltip", new { id = 10})
        /// %&gt;
        /// </code>
        /// </example>
        public TooltipBuilder LoadContentFrom(string actionName, string controllerName, object routeValues)
        {
            return LoadContentFrom(actionName, controllerName, new RouteValueDictionary(routeValues)) as TooltipBuilder;
        }

        private static IUrlHelper GetUrlHelper(ViewContext context)
        {
            return context.HttpContext.RequestServices.GetRequiredService<IUrlHelper>();
        }

        public TooltipBuilder LoadContentFrom(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            var urlHelper = GetUrlHelper(Component.ViewContext);

            return LoadContentFrom(urlHelper.Action(actionName, controllerName, routeValues)) as TooltipBuilder;
        }

        /// <summary>
        /// Sets the Url, which will be requested to return the content.
        /// </summary>
        /// <param name="value">The url.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .LoadContentFrom(Url.Action("AjaxView_OpenSource", "Tooltip"))
        /// %&gt;
        /// </code>
        /// </example>
        public TooltipBuilder LoadContentFrom(string value)
        {
            Component.ContentUrl = value;

            return this;
        }

        /// <summary>
        /// Sets the HTML content which the tooltip should display as a string.
        /// </summary>
        /// <param name="value">The action which renders the content.</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Content("&lt;strong&gt; First Item Content&lt;/strong&gt;")
        /// %&gt;
        /// </code>        
        public TooltipBuilder Content(string value)
        {
            Component.Content = value;
            return this;
        }

        /// <summary>
        /// Sets the id of kendo template which will be used as tooltip content.
        /// </summary>
        /// <param name="value">The id of the template</param>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Content("template")
        /// %&gt;
        /// </code>        
        public TooltipBuilder ContentTemplateId(string value)
        {
            Component.ContentTemplateId = value;
            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the content for the tooltip.
        /// </summary>                
        public TooltipBuilder ContentHandler(Func<object, object> handler)
        {
            Component.ContentHandler.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// Sets JavaScript function which to return the content for the tooltip.
        /// </summary>
        /// <param name="handler">JavaScript function name</param>        
        public TooltipBuilder ContentHandler(string handler)
        {
            Component.ContentHandler.HandlerName = handler;

            return this;
        }

        /// <summary>
        /// Configures the animation effects of the window.
        /// </summary>
        /// <param name="enable">Whether the component animation is enabled.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Animation(false)
        /// </code>
        /// </example>
        public TooltipBuilder Animation(bool enable)
        {
            Component.Animation.Enabled = enable;

            return this;
        }

        /// <summary>
        /// Configures the animation effects of the panelbar.
        /// </summary>
        /// <param name="animationAction">The action that configures the animation.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Tooltip()
        ///             .For("#element")
        ///             .Animation(animation => animation.Expand)
        /// </code>
        /// </example>
        public TooltipBuilder Animation(Action<PopupAnimationBuilder> animationAction)
        {

            animationAction(new PopupAnimationBuilder(Component.Animation));

            return this;
        }
    }
}

