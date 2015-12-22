using System;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public partial class GanttDependency
    {
        public long ID { get; set; }
        public long PredecessorID { get; set; }
        public long SuccessorID { get; set; }
        public long Type { get; set; }
    }
}
