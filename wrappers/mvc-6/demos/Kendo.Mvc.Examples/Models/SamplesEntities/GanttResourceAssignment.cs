using System;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public partial class GanttResourceAssignment
    {
        public long ID { get; set; }
        public long ResourceID { get; set; }
        public long TaskID { get; set; }
        public double Units { get; set; }
    }
}
