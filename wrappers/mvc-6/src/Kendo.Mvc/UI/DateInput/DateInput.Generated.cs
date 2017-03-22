using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateInput component
    /// </summary>
    public partial class DateInput 
    {
        public string Format { get; set; }

        public DateTime? Max { get; set; }

        public DateTime? Min { get; set; }

        public DateTime? Value { get; set; }

        public DateInputMessagesSettings Messages { get; } = new DateInputMessagesSettings();


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (Format?.HasValue() == true)
            {
                settings["format"] = Format;
            }

            if (Max.HasValue)
            {
                settings["max"] = Max;
            }

            if (Min.HasValue)
            {
                settings["min"] = Min;
            }

            if (Value.HasValue)
            {
                settings["value"] = Value;
            }

            var messages = Messages.Serialize();
            if (messages.Any())
            {
                settings["messages"] = messages;
            }

            return settings;
        }
    }
}
