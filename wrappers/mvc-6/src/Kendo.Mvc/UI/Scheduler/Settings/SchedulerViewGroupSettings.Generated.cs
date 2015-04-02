using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI SchedulerViewGroupSettings class
    /// </summary>
    public partial class SchedulerViewGroupSettings<T> where T : class, ISchedulerEvent 
    {
        public string Orientation { get; set; }


        public Scheduler<T> Scheduler { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Orientation?.HasValue() == true)
            {
                settings["orientation"] = Orientation;
            }

            return settings;
        }
    }
}
