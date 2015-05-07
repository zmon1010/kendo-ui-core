using System;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;

namespace Kendo.Mvc.Extensions
{
    public static class WidgetExtensions
    {
        public static string GetValue<T>(this IWidget instance, T value)
        {
            return instance.GetValue<T>(instance.Name, value);
        }

        public static string GetValue<T>(this IWidget instance, string name, T value, string format = "{0}")
        {
            ModelState state;
            string formattedValue = string.Empty;
            ViewDataDictionary viewData = instance.ViewContext.ViewData;

            object valueFromViewData = name.HasValue() ? viewData.Eval(name) : null;

            if (name.HasValue() && viewData.ModelState.TryGetValue(name, out state) && (state.Value != null))
            {
                formattedValue = state.Value.AttemptedValue;
                //TODO
                //if (viewData.ModelState.IsValidField(name))
                {
                    formattedValue = format.FormatWith(state.Value.ConvertTo(typeof(T), state.Value.Culture));
                }
            }
            else if (value != null)
            {
                formattedValue = format.FormatWith(value);
            }
            else if (valueFromViewData != null && valueFromViewData.GetType().IsPredefinedType())
            {
                formattedValue = format.FormatWith(valueFromViewData);
            }

            return formattedValue;
        }
    }
}