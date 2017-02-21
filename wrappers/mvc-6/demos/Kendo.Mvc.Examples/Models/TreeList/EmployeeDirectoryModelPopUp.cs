using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kendo.Mvc.Examples.Models.TreeList
{
    using System.ComponentModel.DataAnnotations;

    public class EmployeeDirectoryModelPopUp
    {
        [ScaffoldColumn(false)]
        public int EmployeeId { get; set; }

        [Required]
        [Display(Name = "First name")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last name")]
        public string LastName { get; set; }

        [ScaffoldColumn(false)]
        public int? ReportsTo { get; set; }

        public string Phone { get; set; }

        [Required]
        [Range(0, 9999)]
        [DataType("Integer")]
        public int? Extension { get; set; }

        public string Position { get; set; }

        [ScaffoldColumn(false)]
        public bool hasChildren { get; set; }

        private DateTime? hireDate;
        [DataType(DataType.Date)]
        [Display(Name = "Hire Date")]
        public DateTime? HireDate
        {
            get
            {
                return hireDate;
            }
            set
            {
                if (value.HasValue)
                {
                    hireDate = value.Value;
                }
                else
                {
                    hireDate = null;
                }
            }
        }

        public EmployeeDirectory ToEntity()
        {
            return new EmployeeDirectory
            {
                EmployeeID = EmployeeId,
                FirstName = FirstName,
                LastName = LastName,
                ReportsTo = ReportsTo,
                Phone = Phone,
                Extension = Extension,
                Position = Position,
                HireDate = HireDate
            };
        }
    }
}
