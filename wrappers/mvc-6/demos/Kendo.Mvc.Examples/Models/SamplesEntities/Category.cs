// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Category
    {
        public Category()
        {
            Products = new HashSet<Product>();
        }
        
        // Properties
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public byte[] Picture { get; set; }
        
        // Navigation Properties
        public virtual ICollection<Product> Products { get; set; }
    }
}
