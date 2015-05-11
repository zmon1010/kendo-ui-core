// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class GanttTask
    {
        public GanttTask()
        {
        }
        
        // Properties
        public int ID { get; set; }
        public DateTime End { get; set; }
        public bool Expanded { get; set; }
        public int OrderID { get; set; }
        public int? ParentID { get; set; }
        public decimal PercentComplete { get; set; }
        public DateTime Start { get; set; }
        public bool Summary { get; set; }
        public string Title { get; set; }
        
        // Navigation Properties
        public virtual GanttTask Parent { get; set; }
    }
}
