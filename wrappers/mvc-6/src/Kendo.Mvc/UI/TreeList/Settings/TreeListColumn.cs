using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListColumn class
    /// </summary>
    public partial class TreeListColumn<T> 
    {
		public string EditorHtml {	get; set; }

		public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

			if (EditorHtml.HasValue())
			{
				settings.Add("editor", EditorHtml);
			}

            return settings;
        }
    }
}
