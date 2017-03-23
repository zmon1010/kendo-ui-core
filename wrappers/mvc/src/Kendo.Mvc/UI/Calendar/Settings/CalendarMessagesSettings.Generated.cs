using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI CalendarMessagesSettings class
    /// </summary>
    public partial class CalendarMessagesSettings 
    {
        public string WeekColumnHeader { get; set; }


        public Calendar Calendar { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (WeekColumnHeader?.HasValue() == true)
            {
                settings["weekColumnHeader"] = WeekColumnHeader;
            }

            return settings;
        }
    }
}
