using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    public class DateTimePicker : WidgetBase
    {
        public DateTimePicker(ViewContext viewContext) : base(viewContext)
        {

        }

        public DateTime? Value
        {
            get;
            set;
		}

		protected override void WriteHtml(TextWriter writer)
		{
			var tag = new TagBuilder("input");

			tag.GenerateId(Id, "_"); // HtmlHelper.IdAttributeDotReplacement
			tag.MergeAttribute("name", Name);

			/*, type = InputType */
			//tag.MergeAttribute("value", value, value.HasValue())
			//.Attributes(Component.GetUnobtrusiveValidationAttributes())
			//.ToggleAttribute("disabled", "disabled", !Component.Enabled)
			//.Attributes(Component.HtmlAttributes)
			//.ToggleClass("input-validation-error", !Component.IsValid());

			writer.Write(tag.ToString(TagRenderMode.SelfClosing));

			base.WriteHtml(writer);
		}

		public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            writer.Write(Initializer.Initialize(Selector, "DateTimePicker", options));

            base.WriteInitializationScript(writer);
        }
	}
}