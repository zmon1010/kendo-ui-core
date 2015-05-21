// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class EmployeeDirectory
    {
        public EmployeeDirectory()
        {
        }
        
        // Properties
        public int EmployeeID { get; set; }
        public string Address { get; set; }
        public DateTime? BirthDate { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int? Extension { get; set; }
        public string FirstName { get; set; }
        public DateTime? HireDate { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Position { get; set; }
        public int? ReportsTo { get; set; }
        
        // Navigation Properties
        public virtual EmployeeDirectory EmployeeDirectory2 { get; set; }
        public virtual ICollection<EmployeeDirectory> EmployeeDirectory1 { get; set; }
    }
}
