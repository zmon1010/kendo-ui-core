namespace Kendo.Mvc.Examples.Models
{
	using System;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	[Table("Weather")]
    public partial class Weather
    {
        [Key]
        [Column(Order = 0)]
        public int ID { get; set; }

        [Key]
        [Column(Order = 1)]
        [StringLength(255)]
        public string Station { get; set; }

        [Key]
        [Column(Order = 2)]
        public DateTime Date { get; set; }

        [Key]
        [Column(Order = 3)]
        public decimal TMax { get; set; }

        [Key]
        [Column(Order = 4)]
        public decimal TMin { get; set; }

        [Key]
        [Column(Order = 5)]
        public decimal Wind { get; set; }

        public decimal? Gust { get; set; }

        [Key]
        [Column(Order = 6)]
        public decimal Rain { get; set; }

        public decimal? Snow { get; set; }

        [StringLength(255)]
        public string Events { get; set; }
    }
}
