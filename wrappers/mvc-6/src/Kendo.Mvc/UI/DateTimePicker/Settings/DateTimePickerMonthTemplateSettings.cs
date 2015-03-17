using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePickerMonthTemplateSettings class
    /// </summary>
    public partial class DateTimePickerMonthTemplateSettings 
    {
		public string IdPrefix { get; set; }

		public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

			if (ContentId.HasValue())
			{
				settings["content"] = new ClientHandlerDescriptor { HandlerName = string.Format("jQuery('{0}{1}').html()", IdPrefix, ContentId) };
			}
			else if (Content.HasValue())
			{
				settings["content"] = Content;
			}

			if (EmptyId.HasValue())
			{
				settings["empty"] = new ClientHandlerDescriptor { HandlerName = string.Format("jQuery('{0}{1}').html()", IdPrefix, EmptyId) };
			}
			else if (Empty.HasValue())
			{
				settings["empty"] = Empty;
			}

			return settings;
        }
    }
}
