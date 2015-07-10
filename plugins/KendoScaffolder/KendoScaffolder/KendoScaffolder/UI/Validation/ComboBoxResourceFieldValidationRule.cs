namespace KendoScaffolder.UI
{
    using KendoScaffolder.UI.Models;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Reflection;
    using System.Windows.Controls;
    using System.Windows.Data;
    using System.Windows.Documents;

    public class ComboBoxResourceFieldValidationRule : ValidationRule
    {
        public override ValidationResult Validate(object value, CultureInfo cultureInfo)
        {
            BindingExpression bindingExpression = (BindingExpression)value;
            SchedulerConfigurationViewModel viewModel = (SchedulerConfigurationViewModel)bindingExpression.DataItem;

            if (viewModel.SelectedResourceModelType != null)
            {
                string propertyName = "Selected" + ((ComboBox)bindingExpression.Target).Name;
                PropertyInfo property = viewModel.GetType().GetProperty(propertyName);
                var propertyValue = property.GetValue(viewModel);

                List<string> otherPropertyNames = viewModel
                    .SchedulerResourceFields
                    .Select((item, index) => new { item, index })
                    .Where(prop => !prop.item.Contains(propertyName))
                    .Select(prop => prop.item).ToList();

                foreach (string prop in otherPropertyNames)
                {
                    PropertyInfo filteredProperty = viewModel.GetType().GetProperty(prop);
                    if (filteredProperty.GetValue(viewModel) == property.GetValue(viewModel))
                    {
                        return new ValidationResult(false, string.Format("Current field have the same value as {0} field", filteredProperty.Name));
                    }
                }
            }

            return new ValidationResult(true, null);
        }
    }
}
