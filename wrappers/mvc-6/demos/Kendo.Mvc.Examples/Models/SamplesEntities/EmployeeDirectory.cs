namespace Kendo.Mvc.Examples.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	[Table("EmployeeDirectory")]
    public partial class EmployeeDirectory
    {
        public EmployeeDirectory()
        {
            EmployeeDirectory1 = new HashSet<EmployeeDirectory>();
        }

        [Key]
        public int EmployeeID { get; set; }

        [StringLength(255)]
        public string FirstName { get; set; }

        [StringLength(255)]
        public string LastName { get; set; }

        public int? ReportsTo { get; set; }

        [StringLength(255)]
        public string Address { get; set; }

        [StringLength(255)]
        public string City { get; set; }

        [StringLength(100)]
        public string Country { get; set; }

        [StringLength(100)]
        public string Phone { get; set; }

        public int? Extension { get; set; }

        public DateTime? BirthDate { get; set; }

        public DateTime? HireDate { get; set; }

        [StringLength(255)]
        public string Position { get; set; }

        public virtual ICollection<EmployeeDirectory> EmployeeDirectory1 { get; set; }

        public virtual EmployeeDirectory EmployeeDirectory2 { get; set; }
    }
}
