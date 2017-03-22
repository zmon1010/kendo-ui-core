namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DateInputMessagesSettings : JsonObject
    {
        public DateInputMessagesSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Year { get; set; }
        
        public string Month { get; set; }
        
        public string Day { get; set; }
        
        public string Weekday { get; set; }
        
        public string Hour { get; set; }
        
        public string Minute { get; set; }
        
        public string Second { get; set; }
        
        public string Dayperiod { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Year.HasValue())
            {
                json["year"] = Year;
            }
            
            if (Month.HasValue())
            {
                json["month"] = Month;
            }
            
            if (Day.HasValue())
            {
                json["day"] = Day;
            }
            
            if (Weekday.HasValue())
            {
                json["weekday"] = Weekday;
            }
            
            if (Hour.HasValue())
            {
                json["hour"] = Hour;
            }
            
            if (Minute.HasValue())
            {
                json["minute"] = Minute;
            }
            
            if (Second.HasValue())
            {
                json["second"] = Second;
            }
            
            if (Dayperiod.HasValue())
            {
                json["dayperiod"] = Dayperiod;
            }
            
        //<< Serialization
        }
    }
}
