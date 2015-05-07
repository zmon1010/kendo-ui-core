using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Microsoft.AspNet.Mvc.ModelBinding.Validation;

namespace Kendo.Mvc.Examples.Models
{
	public class CustomValidationProductViewModel
	{
		public int ProductID { get; set; }

		[Required]
		[CustomProductNameValidation(ErrorMessage = "ProductName should start with capital letter")]
		public string ProductName { get; set; }

		[DataType(DataType.Currency)]
		public decimal UnitPrice { get; set; }
	}

	public class CustomProductNameValidationAttribute : ValidationAttribute, IClientModelValidator
	{		
		public override bool IsValid(object value)
		{
			var productName = (string)value;
			if (!string.IsNullOrEmpty(productName))
			{
				return Regex.IsMatch(productName, "^[A-Z]");
			}
			return true;
		}

		public IEnumerable<ModelClientValidationRule> GetClientValidationRules(ClientModelValidationContext context)
		{
			yield return new ModelClientValidationRule("productnamevalidation", ErrorMessage);
		}
	}
}