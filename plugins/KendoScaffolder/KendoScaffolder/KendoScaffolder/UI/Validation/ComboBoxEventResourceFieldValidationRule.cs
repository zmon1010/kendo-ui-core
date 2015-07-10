namespace KendoScaffolder.UI
{
    using KendoScaffolder.UI.Models;
    using System.Globalization;
    using System.Windows.Controls;
    using System.Windows.Data;

    public class ComboBoxEventResourceFieldValidationRule : ValidationRule
    {
        public override ValidationResult Validate(object value, CultureInfo cultureInfo)
        {
            BindingExpression expression = (BindingExpression)value;
            SchedulerConfigurationViewModel viewModel = (SchedulerConfigurationViewModel)expression.DataItem;

            if (!viewModel.UseResources || viewModel.SelectedModelResourceField != null)
            {
                return new ValidationResult(true, null);
            }

            return new ValidationResult(false, "Resource field is required when UseResources is checked.");
        }
    }
}
