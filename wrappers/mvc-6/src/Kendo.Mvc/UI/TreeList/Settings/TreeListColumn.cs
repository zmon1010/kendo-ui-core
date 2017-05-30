using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
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
		public object Editor {	get; set; }

		public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

			if (Editor != null)
			{
				settings.Add("editor", Editor);
			}

            return settings;
        }
    }
}
