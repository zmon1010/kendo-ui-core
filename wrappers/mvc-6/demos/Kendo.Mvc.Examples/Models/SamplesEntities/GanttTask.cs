namespace Kendo.Mvc.Examples.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class GanttTask
    {
        public GanttTask()
        {
            GanttTasks1 = new HashSet<GanttTask>();
        }

        public int ID { get; set; }

        public int? ParentID { get; set; }

        public int OrderID { get; set; }

        [Column(TypeName = "ntext")]
        [Required]
        public string Title { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public decimal PercentComplete { get; set; }

        public bool Expanded { get; set; }

        public bool Summary { get; set; }

        public virtual ICollection<GanttTask> GanttTasks1 { get; set; }

        public virtual GanttTask GanttTask1 { get; set; }
    }
}
