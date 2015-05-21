// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class CustomerCustomerDemo
    {
        public CustomerCustomerDemo()
        {
        }
        
        // Properties
        public string CustomerID { get; set; }
        public string CustomerTypeID { get; set; }
        
        // Navigation Properties
        public virtual Customer Customer { get; set; }
        public virtual CustomerDemographic CustomerType { get; set; }
    }
}
