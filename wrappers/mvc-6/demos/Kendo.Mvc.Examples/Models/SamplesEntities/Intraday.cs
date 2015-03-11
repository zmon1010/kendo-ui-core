namespace Kendo.Mvc.Examples.Models
{
	using System;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	[Table("Intraday")]
    public partial class Intraday
    {
        public int ID { get; set; }

        [Required]
        [StringLength(10)]
        public string Symbol { get; set; }

        public DateTime Date { get; set; }

        public decimal Open { get; set; }

        public decimal High { get; set; }

        public decimal Low { get; set; }

        public decimal Close { get; set; }

        public long Volume { get; set; }
    }
}
