namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

    public class DateInputHtmlBuilder
    {
        private readonly DateInput component;

        /// <summary>
        /// Initializes a new instance of the <see cref="DateInputHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The DateInput component.</param>
        public DateInputHtmlBuilder(DateInput component)
        {
            this.component = component;
        }

        /// <summary>
        /// Builds the DateInput markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = CreateElement();
            html.Attribute("data-role", "dateinput")
                .Attribute("id", component.Id);

            return html;
        }

        protected virtual IHtmlNode CreateElement()
        {
            return new HtmlElement("input");
        }

        
        protected virtual void AddEventAttributes(IHtmlNode html, IDictionary<string, object> events)
        {
            foreach (var keyValuePair in events)
            {
                var value = keyValuePair.Value as ClientHandlerDescriptor;
                var key = "data-" + keyValuePair.Key;

                if (value.HandlerName.HasValue())
                {
                    html.Attribute(key, value.HandlerName);
                }

            }
        }
        
    }
}

