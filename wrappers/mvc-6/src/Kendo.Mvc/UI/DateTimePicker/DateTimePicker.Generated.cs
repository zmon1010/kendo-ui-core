using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePicker component
    /// </summary>
    public partial class DateTimePicker 
    {

        public DateTimePickerAnimationSettings Animation { get; } = new DateTimePickerAnimationSettings();
        
        public string ARIATemplateId { get; set; }
                              
        public string Culture { get; set; }
                              
        public DateTime[] Dates { get; set; }
                              
        public string Depth { get; set; }
                              
        public string Footer { get; set; }
                              
        public string Format { get; set; }
                              
        public double? Interval { get; set; }
                              
        public DateTime? Max { get; set; }
                              
        public DateTime? Min { get; set; }
                              
        public DateTimePickerMonthSettings Month { get; } = new DateTimePickerMonthSettings();
        
        public string[] ParseFormats { get; set; }
                              
        public string Start { get; set; }
                              
        public string TimeFormat { get; set; }
                              
        public DateTime? Value { get; set; }
                              

        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            var animation = Animation.Serialize();
            if (animation.Any())
            {
                settings["animation"] = animation;
            }
                    
            if (ARIATemplateId.HasValue())
            {
                settings["ARIATemplate"] = ARIATemplateId;
            } 
        
            if (Culture.HasValue())
            {
                settings["culture"] = Culture;
            } 
        
            if (Dates != null && Dates.Any())
            {
                settings["dates"] = Dates;
            } 
        
            if (Depth.HasValue())
            {
                settings["depth"] = Depth;
            } 
        
            if (Footer.HasValue())
            {
                settings["footer"] = Footer;
            } 
        
            if (Format.HasValue())
            {
                settings["format"] = Format;
            } 
        
            if (Interval.HasValue)
            {
                settings["interval"] = Interval;
            } 
        
            if (Max.HasValue)
            {
                settings["max"] = Max;
            } 
        
            if (Min.HasValue)
            {
                settings["min"] = Min;
            } 

            var month = Month.Serialize();
            if (month.Any())
            {
                settings["month"] = month;
            }
                    
            if (ParseFormats != null && ParseFormats.Any())
            {
                settings["parseFormats"] = ParseFormats;
            } 
        
            if (Start.HasValue())
            {
                settings["start"] = Start;
            } 
        
            if (TimeFormat.HasValue())
            {
                settings["timeFormat"] = TimeFormat;
            } 
        
            if (Value.HasValue)
            {
                settings["value"] = Value;
            } 

            return settings;
        }
    }
}
