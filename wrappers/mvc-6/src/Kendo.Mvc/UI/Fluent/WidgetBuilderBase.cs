using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Razor;
using Microsoft.AspNet.Mvc.Rendering;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI.Fluent
{
    public class WidgetBuilderBase<TViewComponent, TBuilder> : HelperResult
        where TViewComponent : WidgetBase
        where TBuilder : WidgetBuilderBase<TViewComponent, TBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the WidgetBuilderBase class.
        /// </summary>
        /// <param name="component">The component.</param>
        public WidgetBuilderBase(TViewComponent component) : base(null)
        {
            Component = component;
        }

        /// <summary>
        /// Gets the view component.
        /// </summary>
        /// <value>The component.</value>
        protected internal TViewComponent Component
        {
            get;
            set;
        }

        public static implicit operator TViewComponent(WidgetBuilderBase<TViewComponent, TBuilder> builder)
        {
            return builder.ToComponent();
        }

        /// <summary>
        /// Returns the internal view component.
        /// </summary>
        /// <returns></returns>
        public TViewComponent ToComponent()
        {
            return Component;
        }

        /// <summary>
        /// Sets the name of the component.
        /// </summary>
        /// <param name="componentName">The name.</param>
        /// <returns></returns>
        public virtual TBuilder Name(string componentName)
        {
            Component.Name = componentName;

            return this as TBuilder;
        }

        /// <summary>
        /// Suppress initialization script rendering. Note that this options should be used in conjunction with <see cref="WidgetFactory.DeferredScripts"/>
        /// </summary>        
        /// <returns></returns>
        public virtual TBuilder Deferred(bool deferred = true)
        {
            Component.HasDeferredInitialization = deferred;

            return this as TBuilder;
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual TBuilder HtmlAttributes(object attributes)
        {
			IDictionary<string, object> htmlAttributeDictionary = null;
			if (attributes != null)
			{
				htmlAttributeDictionary = attributes as IDictionary<string, object>;
				if (htmlAttributeDictionary == null)
				{
					htmlAttributeDictionary = HtmlHelper.AnonymousObjectToHtmlAttributes(attributes);
				}
			}

			Component.HtmlAttributes = htmlAttributeDictionary;

			return this as TBuilder;
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual TBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {
			Component.HtmlAttributes = attributes;

			return this as TBuilder;
        }

        public TBuilder ModelMetadata(ModelMetadata modelMetadata)
        {
            Component.ModelMetadata = modelMetadata;

            return this as TBuilder;
        }

        /// <summary>
        /// Renders the component.
        /// </summary>
        public virtual void Render()
        {
            //Component.Render();
        }

        public virtual string ToHtmlString()
        {
            return ToComponent().ToHtmlString();
        }

        public override void WriteTo(TextWriter writer)
        {
            writer.Write(ToHtmlString());
        }

        public virtual HtmlString ToClientTemplate()
        {
            return ToComponent().ToClientTemplate();
        }
    }
}