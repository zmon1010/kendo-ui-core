namespace Kendo.Mvc.Examples.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class Task
    {
        public Task()
        {
            Tasks1 = new HashSet<Task>();
        }

        public int TaskID { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        [Column(TypeName = "ntext")]
        [Required]
        public string Title { get; set; }

        [Column(TypeName = "ntext")]
        public string Description { get; set; }

        public int? OwnerID { get; set; }

        public bool IsAllDay { get; set; }

        [Column(TypeName = "ntext")]
        public string RecurrenceRule { get; set; }

        public int? RecurrenceID { get; set; }

        [Column(TypeName = "ntext")]
        public string RecurrenceException { get; set; }

        [Column(TypeName = "ntext")]
        public string StartTimezone { get; set; }

        [Column(TypeName = "ntext")]
        public string EndTimezone { get; set; }

        public virtual ICollection<Task> Tasks1 { get; set; }

        public virtual Task Task1 { get; set; }
    }
}
