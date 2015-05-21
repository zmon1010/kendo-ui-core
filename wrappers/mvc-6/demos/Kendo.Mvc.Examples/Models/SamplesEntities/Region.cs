// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Region
    {
        public Region()
        {
            Territories = new HashSet<Territory>();
        }
        
        // Properties
        public int RegionID { get; set; }
        public string RegionDescription { get; set; }
        
        // Navigation Properties
        public virtual ICollection<Territory> Territories { get; set; }
    }
}
