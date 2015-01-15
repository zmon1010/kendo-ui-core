using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI.Fluent
{
    public class WidgetFactory
    {
        public WidgetFactory(IHtmlHelper htmlHelper)
        {
            HtmlHelper = htmlHelper;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public IHtmlHelper HtmlHelper
        {
            get;
            set;
        }

        /// <summary>
        /// Returns the initialization scripts for widgets set as deferred
        /// </summary>
        /// <param name="renderScriptTags">Determines if the script should be rendered within a script tag</param>
        /// <returns></returns>
        public virtual HtmlString DeferredScripts(bool renderScriptTags = true)
        {
            var items = HtmlHelper.ViewContext.HttpContext.Items;

            if (items.ContainsKey(WidgetBase.DeferredScriptsKey))
            {
                var scripts = (List<KeyValuePair<string, string>>)items[WidgetBase.DeferredScriptsKey];                

                return DeferredScripts(scripts.Select(kv => kv.Value), renderScriptTags);
            }

            return HtmlString.Empty;
        }

        private HtmlString DeferredScripts(IEnumerable<string> scripts, bool renderScriptTags)
        {
            var result = new StringBuilder();

            if (renderScriptTags)
            {
                result.Append("<script>");
            }

            foreach (var script in scripts)
            {
                result.Append(script);
            }

            if (renderScriptTags)
            {
                result.Append("</script>");
            }

            return new HtmlString(result.ToString());
        }

        /// <summary>
        /// Returns the initialization scripts for the specified widget.
        /// </summary>
        /// <param name="name">The name of the widget.</param>
        /// <param name="renderScriptTags">Determines if the script should be rendered within a script tag</param>
        /// <returns></returns>
        public virtual HtmlString DeferredScriptsFor(string name, bool renderScriptTags = true)
        {
            var items = HtmlHelper.ViewContext.HttpContext.Items;

            if (items.ContainsKey(WidgetBase.DeferredScriptsKey))
            {
                var scripts = (List<KeyValuePair<string, string>>)items[WidgetBase.DeferredScriptsKey];
                var match = scripts.Any(kv => kv.Key == name);

                if (match)
                {
                    var entry = scripts.First(kv => kv.Key == name);
                    return DeferredScripts(new[] { entry.Value }, renderScriptTags);
                }
            }

            return HtmlString.Empty;
        }

        /// <summary>
        /// Creates a new <see cref="DateTimePicker"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().DateTimePicker()
        ///             .Name("DateTimePicker")
        /// %&gt;
        /// </code>
        /// </example>
        public virtual DateTimePickerBuilder DateTimePicker()
        {
            return new DateTimePickerBuilder(new DateTimePicker(HtmlHelper.ViewContext));
        }
    }
}