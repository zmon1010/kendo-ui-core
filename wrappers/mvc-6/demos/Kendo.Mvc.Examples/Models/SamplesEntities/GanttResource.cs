namespace Kendo.Mvc.Examples.Models
{
	using System.ComponentModel.DataAnnotations;

	public partial class GanttResource
    {
        public int ID { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(10)]
        public string Color { get; set; }
    }
}
