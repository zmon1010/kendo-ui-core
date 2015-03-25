using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MaskedTextBox component
    /// </summary>
    public partial class MaskedTextBox 
    {
        public bool? ClearPromptChar { get; set; }

        public string Culture { get; set; }

        public string Mask { get; set; }

        public string PromptChar { get; set; }

        public bool? UnmaskOnPost { get; set; }

        public string Value { get; set; }

        public bool? Enable { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();


            if (ClearPromptChar.HasValue)
            {
                settings["clearPromptChar"] = ClearPromptChar;
            }

            if (Culture.HasValue())
            {
                settings["culture"] = Culture;
            }

            if (Mask.HasValue())
            {
                settings["mask"] = Mask;
            }

            if (PromptChar.HasValue())
            {
                settings["promptChar"] = PromptChar;
            }

            if (UnmaskOnPost.HasValue)
            {
                settings["unmaskOnPost"] = UnmaskOnPost;
            }

            if (Value.HasValue())
            {
                settings["value"] = Value;
            }

            if (Enable.HasValue)
            {
                settings["enable"] = Enable;
            }

            return settings;
        }

    }
}
