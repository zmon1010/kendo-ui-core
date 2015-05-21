// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class EmployeeTerritories
    {
        public EmployeeTerritories()
        {
        }
        
        // Properties
        public int EmployeeID { get; set; }
        public string TerritoryID { get; set; }
        
        // Navigation Properties
        public virtual Employee Employee { get; set; }
        public virtual Territory Territory { get; set; }
    }
}
