namespace KendoScaffolder.UI
{
    using System.Globalization;
    using System.Windows.Controls;

    public class ComboBoxRequiredValidationRule : ValidationRule
    {
        public override ValidationResult Validate(object value, CultureInfo cultureInfo)
        {
            if (value != null)
            {
                return new ValidationResult(true, null);
            }

            return new ValidationResult(false, "Required field.");
        }
    }
}