using Microsoft.AspNet.Mvc;
using System;

namespace Kendo.Mvc.UI.DateTimePicker.Fluent
{
    public class DateTimePickerBuilder
    {
        public static implicit operator typeof(DateTimePicker)(DateTimePickerBuilder builder)
        {

            return builder.ToComponent();
        }
    }
}