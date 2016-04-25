using System;
using System.Linq;

namespace Kendo.Mvc.Examples.Models
{
    public class NavigationItem
    {
        public string Name { get; set; }
        public string Text { get; set; }
        public string[] Packages { get; set; }

        public bool ShouldInclude
        {
            get
            {
                if (Packages == null || Packages.Length == 0)
                {
                    return true;
                }

                foreach (var packageName in Packages)
                {
                    if (packageName.StartsWith("!mvc")) { // !mvc; !mvc-offline; !mvc-core
                        return false;
                    }
                }

                return true;
            }
        }
    }
}
