// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Order_Detail
    {
        public Order_Detail()
        {
        }
        
        // Properties
        public int OrderID { get; set; }
        public int ProductID { get; set; }
        public double Discount { get; set; }
        public short Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        
        // Navigation Properties
        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
