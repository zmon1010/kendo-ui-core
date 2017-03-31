using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Kendo.Mvc.UI
{
    public class MenuScrollable : JsonObject
    {
        public MenuScrollable()
        {
            Enabled = false;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public int? Distance
        {
            get;
            set;
        }

        protected override void Serialize(System.Collections.Generic.IDictionary<string, object> json)
        {
            if (Enabled || Distance.HasValue)
            {
                json["enabled"] = true;
                if (Distance.HasValue)
                {
                    json["distance"] = Distance;
                }
            }
        }
    }
}