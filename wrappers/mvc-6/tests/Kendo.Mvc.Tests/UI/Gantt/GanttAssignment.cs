using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttAssignment
    {
        public int ID { get; set; }
        public int TaskID { get; set; }
        public int ResourceID { get; set; }
        public decimal Units { get; set; }
    }
}
