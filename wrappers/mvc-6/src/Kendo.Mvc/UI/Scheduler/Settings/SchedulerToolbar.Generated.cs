using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI SchedulerToolbar class
    /// </summary>
    public partial class SchedulerToolbar<T> where T : class, ISchedulerEvent 
    {
        public string Name { get; set; }


        public Scheduler<T> Scheduler { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Name?.HasValue() == true)
            {
                settings["name"] = Name;
            }

            return settings;
        }
    }
}
