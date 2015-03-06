using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePickerAnimationSettings class
    /// </summary>
    public partial class DateTimePickerAnimationSettings 
    {

        public DateTimePickerAnimationCloseSettings Close { get; } = new DateTimePickerAnimationCloseSettings();
        
        public DateTimePickerAnimationOpenSettings Open { get; } = new DateTimePickerAnimationOpenSettings();
        

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            var close = Close.Serialize();
            if (close.Any())
            {
                settings["close"] = close;
            }
            
            var open = Open.Serialize();
            if (open.Any())
            {
                settings["open"] = open;
            }
            

            return settings;
        }
    }
}
