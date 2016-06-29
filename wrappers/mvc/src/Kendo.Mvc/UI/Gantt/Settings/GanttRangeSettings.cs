namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttRangeSettings : JsonObject
    {
        public GanttRangeSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public DateTime? Start { get; set; }
        
        public DateTime? End { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Start.HasValue)
            {
                json["start"] = Start;
            }
                
            if (End.HasValue)
            {
                json["end"] = End;
            }
                
        //<< Serialization
        }
    }
}
