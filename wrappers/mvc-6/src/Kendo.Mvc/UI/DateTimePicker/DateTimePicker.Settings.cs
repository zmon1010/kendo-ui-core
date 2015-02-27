using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePicker component
    /// </summary>
    public partial class DateTimePicker 
    {

        public string ARIATemplateId { get; set; }
    
        public string Culture { get; set; }
    
        public DateTime[] Dates { get; set; }
    
        public string Depth { get; set; }
    
        public string Footer { get; set; }
    
        public string Format { get; set; }
    
        public double? Interval { get; set; }
    
        public DateTime? Max { get; set; }
    
        public DateTime? Min { get; set; }
    
        public string[] ParseFormats { get; set; }
    
        public string Start { get; set; }
    
        public string TimeFormat { get; set; }
    
        public DateTime? Value { get; set; }
    

        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            // TODO: Automatically serialized settings go here

            return settings;
        }
    }
}
