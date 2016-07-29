using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Models
{
    public class NavigationExample : NavigationItem
    {
        public string Url { get; set; }
        public IDictionary<string, string> Api { get; set; }
        public bool New { get; set; }
        public bool External { get; set; }
        public bool DisableInMobile { get; set; }
        public bool Mobile { get; set; }
        public string Group { get; set; }
    }
}
