// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class GanttDependency
    {
        public GanttDependency()
        {
        }
        
        // Properties
        public int ID { get; set; }
        public int PredecessorID { get; set; }
        public int SuccessorID { get; set; }
        public int Type { get; set; }
        
        // Navigation Properties
    }
}
