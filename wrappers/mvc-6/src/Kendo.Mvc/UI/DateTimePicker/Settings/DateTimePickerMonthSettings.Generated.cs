using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePickerMonthSettings class
    /// </summary>
    public partial class DateTimePickerMonthSettings 
    {

        public string Content { get; set; }

        public string Empty { get; set; }


        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Content.HasValue())
            {
                settings["content"] = Content;
            }

            if (Empty.HasValue())
            {
                settings["empty"] = Empty;
            }


            return settings;
        }
    }
}
