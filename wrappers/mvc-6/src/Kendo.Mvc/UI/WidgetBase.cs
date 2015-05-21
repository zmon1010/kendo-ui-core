using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.ViewComponents;
using Microsoft.AspNet.Routing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;

namespace Kendo.Mvc.UI
{
    public abstract class WidgetBase : IHtmlAttributesContainer
    {
        internal static readonly string DeferredScriptsKey = "$DeferredScriptsKey$";
        private static readonly Regex UnicodeEntityExpression = new Regex(@"\\+u(\d+)\\*#(\d+;)", RegexOptions.Compiled);

        public WidgetBase(ViewContext viewContext)
        {
            Events = new Dictionary<string, object>();
            HtmlAttributes = new RouteValueDictionary();
            IsSelfInitialized = true;
            Initializer = new JavaScriptInitializer();
            ViewContext = viewContext;

            Activate();			
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
                return SanitizeId(HtmlAttributes.ContainsKey("id") ? (string) HtmlAttributes["id"] : ViewContext.GetFullHtmlFieldName(Name));
            }
        }

        public IJavaScriptInitializer Initializer
        {
            get;
            set;
        }

        public bool IsInClientTemplate
        {
            get;
            private set;
        }

        public bool IsSelfInitialized
        {
            get;
            set;
        }

        public bool HasDeferredInitialization
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
            set;
        }

        [Activate]
        public IHtmlHelper HtmlHelper { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        public string Name
        {
            get;
            set;
        }

        public string Selector
        {
            get
            {
                return IdPrefix + Id;
            }
        }

		public string IdPrefix
		{
			get
			{
				return IsInClientTemplate ? "\\#" : "#";
			}
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

        [Activate]
        protected IKendoHtmlGenerator Generator { get; set; }

        /// <summary>
        /// Renders the component.
        /// </summary>
        public void Render()
        {
            WriteHtml(ViewContext.Writer);
        }

        /// <summary>
        /// Serialize manual settings here
        /// </summary>
        /// <returns></returns>
        protected virtual Dictionary<string, object> SerializeSettings()
        {
            return new Dictionary<string, object>(Events);
        }

        public HtmlString ToClientTemplate()
        {
			IsInClientTemplate = true;

			var html = ToHtmlString().Replace("</script>", "<\\/script>");

			//TODO: Handle AntiXssEncoder
			//if (HttpEncoder.Current != null && HttpEncoder.Current.GetType().ToString().Contains("AntiXssEncoder"))
			//{
			//	html = Regex.Replace(html, "\\u0026", "&", RegexOptions.IgnoreCase);
			//	html = Regex.Replace(html, "%23", "#", RegexOptions.IgnoreCase);
			//	html = Regex.Replace(html, "%3D", "=", RegexOptions.IgnoreCase);
			//	html = Regex.Replace(html, "&#32;", " ", RegexOptions.IgnoreCase);
			//	html = Regex.Replace(html, @"\\u0026#32;", " ", RegexOptions.IgnoreCase);
			//}
			//escape entities in attributes encoded by the TextWriter Unicode encoding
			html = UnicodeEntityExpression.Replace(html, (m) =>
			{
				return WebUtility.HtmlDecode(Regex.Unescape(@"\u" + m.Groups[1].Value + "#" + m.Groups[2].Value));
			});

			//must decode unicode symbols otherwise they will be rendered as HTML entities
			//which will break the client template
			html = WebUtility.HtmlDecode(html);

			return new HtmlString(html);
		}

        public string ToHtmlString()
        {
            using (var output = new StringWriter())
            {
                WriteHtml(output);
                return output.ToString();
            }
        }

        public virtual void VerifySettings()
        {
            if (!Name.Contains("<#=") && Name.IndexOf(" ") != -1)
            {
                throw new InvalidOperationException(Resources.Exceptions.NameCannotContainSpaces);
            }

            ((IHtmlAttributesContainer) this).ThrowIfClassIsPresent("k-" + GetType().Name.ToLowerInvariant() + "-rtl", Resources.Exceptions.Rtl);
        }

        /// <summary>
        /// Writes the initialization script.
        /// </summary>
        /// <param name="writer">The writer.</param>
        public abstract void WriteInitializationScript(TextWriter writer);

        /// <summary>
        /// Writes the HTML.
        /// </summary>
        protected virtual void WriteHtml(TextWriter writer)
        {
            VerifySettings();

            if (IsSelfInitialized)
            {
                if (HasDeferredInitialization)
                {
                    WriteDeferredScriptInitialization();
                }
                else
                {
                    writer.Write("<script>");
                    WriteInitializationScript(writer);
                    writer.Write("</script>");
                }
            }
        }

        protected virtual void WriteDeferredScriptInitialization()
        {
            var scripts = new StringWriter();
            WriteInitializationScript(scripts);
            AppendScriptToContext(scripts.ToString());
        }

        private void Activate()
        {            
            var activator = ViewContext.GetService<IViewComponentActivator>();

            activator.Activate(this, ViewContext);

            ((ICanHasViewContext)HtmlHelper).Contextualize(ViewContext);
        }

        private void AppendScriptToContext(string script)
        {
            var items = ViewContext.HttpContext.Items;

            var scripts = new List<KeyValuePair<string,string>>();

            if (items.ContainsKey(DeferredScriptsKey))
            {
                scripts = (List<KeyValuePair<string, string>>)items[DeferredScriptsKey];
            }
            else
            {
                items[DeferredScriptsKey] = scripts;
            }

            scripts.Add(new KeyValuePair<string, string>(Name, script));
        }

        private bool IsValidCharacter(char c)
        {
            if (c == '?' || c == '!' || c == '#' || c == '.' || c == '[' || c == ']')
            {
                return false;
            }

            return true;
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
                    builder.Append(HtmlHelper.IdAttributeDotReplacement);
                }
            }
        }

        private string SanitizeId(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return string.Empty;
            }

            var builder = new StringBuilder(id.Length);
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
    }
}
