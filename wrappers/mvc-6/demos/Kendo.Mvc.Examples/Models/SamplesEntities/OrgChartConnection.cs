namespace Kendo.Mvc.Examples.Models
{
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class OrgChartConnection
    {
        public int Id { get; set; }

        public int? FromShapeId { get; set; }

        public int? ToShapeId { get; set; }

        [Column(TypeName = "ntext")]
        public string Text { get; set; }

        public int? FromPointX { get; set; }

        public int? FromPointY { get; set; }

        public int? ToPointX { get; set; }

        public int? ToPointY { get; set; }
    }
}
