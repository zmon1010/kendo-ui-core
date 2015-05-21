// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Territory
    {
        public Territory()
        {
            EmployeeTerritories = new HashSet<EmployeeTerritories>();
        }
        
        // Properties
        public string TerritoryID { get; set; }
        public int RegionID { get; set; }
        public string TerritoryDescription { get; set; }
        
        // Navigation Properties
        public virtual ICollection<EmployeeTerritories> EmployeeTerritories { get; set; }
        public virtual Region Region { get; set; }
    }
}
