// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Customer
    {
        public Customer()
        {
            CustomerCustomerDemo = new HashSet<CustomerCustomerDemo>();
            Orders = new HashSet<Order>();
        }
        
        // Properties
        public string CustomerID { get; set; }
        public string Address { get; set; }
        public bool? Bool { get; set; }
        public string City { get; set; }
        public string CompanyName { get; set; }
        public string ContactName { get; set; }
        public string ContactTitle { get; set; }
        public string Country { get; set; }
        public string Fax { get; set; }
        public string Phone { get; set; }
        public string PostalCode { get; set; }
        public string Region { get; set; }
        
        // Navigation Properties
        public virtual ICollection<CustomerCustomerDemo> CustomerCustomerDemo { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
