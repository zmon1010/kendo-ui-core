// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class CustomerDemographic
    {
        public CustomerDemographic()
        {
            CustomerCustomerDemo = new HashSet<CustomerCustomerDemo>();
        }
        
        // Properties
        public string CustomerTypeID { get; set; }
        public string CustomerDesc { get; set; }
        
        // Navigation Properties
        public virtual ICollection<CustomerCustomerDemo> CustomerCustomerDemo { get; set; }
    }
}
