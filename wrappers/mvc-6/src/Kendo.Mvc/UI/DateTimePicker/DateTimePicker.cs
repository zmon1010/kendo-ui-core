using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePicker component
    /// </summary>
    public partial class DateTimePicker : WidgetBase, IInputComponent<DateTime>
    {
        public DateTimePicker(ViewContext viewContext) : base(viewContext)
        {
            Enabled = true;
            Value = null;
        }

		public PopupAnimation Animation { get; } = new PopupAnimation();

		public CultureInfo CultureInfo
        {
            get
            {
                CultureInfo info = null;
                if (Culture.HasValue())
                {
                    info = new CultureInfo(Culture);
                }
                else
                {
                    info = CultureInfo.CurrentCulture;
                }

                return info;
            }
        }

        public bool Enabled
        {
            get;
            set;
        }
		public bool EnableFooter
		{
			get;
			set;
		} = true;

		public string FooterId
		{
			get;
			set;
		}

		protected override void WriteHtml(TextWriter writer)
        {
            var metadata = ExpressionMetadataProvider.FromStringExpression(Name, HtmlHelper.ViewData, HtmlHelper.MetadataProvider).Metadata;
            var tag = Generator.GenerateDateTimeInput(ViewContext, metadata, Id, Name, Value, Format, HtmlAttributes);

            if (!Enabled)
            {
                tag.MergeAttribute("disabled", "disabled");
            }

            writer.Write(tag.ToString(TagRenderMode.SelfClosing));

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

			var idPrefix = "#";
			if (IsInClientTemplate)
			{
				idPrefix = "\\" + idPrefix;
			}

			var animation = Animation.ToJson();
			if (animation.Any())
			{
				settings["animation"] = animation["animation"];
			}

			if (EnableFooter)
			{
				if (FooterId.HasValue())
				{
					settings["footer"] = new ClientHandlerDescriptor { HandlerName = string.Format("jQuery('{0}{1}').html()", idPrefix, FooterId) };
				}
				else if (Footer.HasValue())
				{
					settings["footer"] = Footer;
				}
			}
			else
			{
				settings["footer"] = EnableFooter;
			}
			
			var month = MonthTemplate.Serialize();
			if (month.Any())
			{
				settings["month"] = month;
			}

			writer.Write(Initializer.Initialize(Selector, "DateTimePicker", settings));
        }
    }
}

