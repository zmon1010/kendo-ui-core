// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Product
    {
        public Product()
        {
            Order_Details = new HashSet<Order_Detail>();
        }
        
        // Properties
        public int ProductID { get; set; }
        public int? CategoryID { get; set; }
        public bool Discontinued { get; set; }
        public string ProductName { get; set; }
        public string QuantityPerUnit { get; set; }
        public short? ReorderLevel { get; set; }
        public int? SupplierID { get; set; }
        public decimal? UnitPrice { get; set; }
        public short? UnitsInStock { get; set; }
        public short? UnitsOnOrder { get; set; }
        
        // Navigation Properties
        public virtual ICollection<Order_Detail> Order_Details { get; set; }
        public virtual Category Category { get; set; }
        public virtual Supplier Supplier { get; set; }
    }
}
