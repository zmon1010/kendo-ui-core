using System;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public partial class GanttTask
    {
        public int ID { get; set; }
        public string End { get; set; }
        public string Expanded { get; set; }
        public int OrderID { get; set; }
        public int? ParentID { get; set; }
        public double PercentComplete { get; set; }
        public string Start { get; set; }
        public string Summary { get; set; }
        public string Title { get; set; }

        public virtual GanttTask Parent { get; set; }
        public virtual ICollection<GanttTask> InverseParent { get; set; }
    }
}
