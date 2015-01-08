using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Routing;
using System;
using System.Collections.Generic;
using System.Text;

namespace Kendo.Mvc.UI
{
    public abstract class WidgetBase
    {
        public WidgetBase(ViewContext viewContext)
        {            
            Events = new Dictionary<string, object>();
            HtmlAttributes = new RouteValueDictionary();
            IsSelfInitialized = true;
            ViewContext = viewContext;
        }

        /// <summary>
        /// Gets the client events of the widget.
        /// </summary>
        /// <value>The client events.</value>
        public IDictionary<string, object> Events {
            get;
            private set;
        }

        /// <summary>
        /// Gets the unique ID of the widget
        /// </summary>
        /// <value>The unique ID of the widget</value>
        public string Id
        {
            get
            {
                // Return from htmlattributes if user has specified
                // otherwise build it from name
                return this.SanitizeId(HtmlAttributes.ContainsKey("id") ? (string)HtmlAttributes["id"] : Name);
            }
        }

        public bool IsSelfInitialized
        {
            get;
            set;
        }

        /// <summary>
        /// Gets the HTML attributes of the widget.
        /// </summary>
        /// <value>The HTML attributes.</value>
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        public string Name
        {
            get;
            set;
        }

        /// <summary>
        /// Gets or sets the view context to rendering a view.
        /// </summary>
        /// <value>The view context.</value>
        public ViewContext ViewContext
        {
            get;
            private set;
        }

        public string SanitizeId(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return string.Empty;
            }

            StringBuilder builder = new StringBuilder(id.Length);
            int startSharpIndex = id.IndexOf("#");
            int endSharpIndex = id.LastIndexOf("#");

            if (endSharpIndex > startSharpIndex)
            {
                ReplaceInvalidCharacters(id.Substring(0, startSharpIndex), builder);
                builder.Append(id.Substring(startSharpIndex, endSharpIndex - startSharpIndex + 1));
                ReplaceInvalidCharacters(id.Substring(endSharpIndex + 1), builder);
            }
            else
            {
                ReplaceInvalidCharacters(id, builder);
            }

            return builder.ToString();
        }

        private void ReplaceInvalidCharacters(string part, StringBuilder builder)
        {
            for (int i = 0; i < part.Length; i++)
            {
                char character = part[i];
                if (IsValidCharacter(character))
                {
                    builder.Append(character);
                }
                else
                {
                    builder.Append("_");
                    // TODO:  HtmlHelper.IdAttributeDotReplacement is no longer static
                }
            }
        }

        private bool IsValidCharacter(char c)
        {
            if (c == '?' || c == '!' || c == '#' || c == '.' || c == '[' || c == ']')
            {
                return false;
            }

            return true;
        }
    }
}