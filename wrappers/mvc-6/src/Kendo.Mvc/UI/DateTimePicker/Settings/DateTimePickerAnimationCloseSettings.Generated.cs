using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePickerAnimationCloseSettings class
    /// </summary>
    public partial class DateTimePickerAnimationCloseSettings 
    {

        public string Effects { get; set; }
                              
        public double? Duration { get; set; }
                              

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();
        
            if (Effects.HasValue())
            {
                settings["effects"] = Effects;
            } 
        
            if (Duration.HasValue)
            {
                settings["duration"] = Duration;
            } 


            return settings;
        }
    }
}
