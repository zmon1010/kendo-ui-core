using System.ComponentModel.DataAnnotations;

namespace Kendo.Mvc.Examples.Models
{
    public class Product
    {
		public int ProductID { get; set; }		
		public decimal UnitPrice { get; set; }
		[Required]		
		public string ProductName { get; set; }
	}
}