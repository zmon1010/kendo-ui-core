using System;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public partial class OrderDetail
    {
        public long OrderID { get; set; }
        public long ProductID { get; set; }
        public double Discount { get; set; }
        public long Quantity { get; set; }
        public double UnitPrice { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
