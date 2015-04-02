using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI SchedulerViewEditableSettings class
    /// </summary>
    public partial class SchedulerViewEditableSettings<T> where T : class, ISchedulerEvent 
    {
        public bool? Create { get; set; }

        public bool? Destroy { get; set; }

        public bool? Update { get; set; }

        public bool Enabled { get; set; }

        public Scheduler<T> Scheduler { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Create.HasValue)
            {
                settings["create"] = Create;
            }

            if (Destroy.HasValue)
            {
                settings["destroy"] = Destroy;
            }

            if (Update.HasValue)
            {
                settings["update"] = Update;
            }

            return settings;
        }
    }
}
