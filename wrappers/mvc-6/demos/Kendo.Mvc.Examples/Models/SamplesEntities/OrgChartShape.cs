namespace Kendo.Mvc.Examples.Models
{
	using System.ComponentModel.DataAnnotations;

	public partial class OrgChartShape
    {
        public int Id { get; set; }

        [StringLength(200)]
        public string JobTitle { get; set; }

        [StringLength(50)]
        public string Color { get; set; }
    }
}
