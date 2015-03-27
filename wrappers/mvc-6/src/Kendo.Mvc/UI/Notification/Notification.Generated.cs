using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Notification component
    /// </summary>
    public partial class Notification 
    {
        public double? AllowHideAfter { get; set; }

        public string AppendTo { get; set; }

        public double? AutoHideAfter { get; set; }

        public bool? Button { get; set; }

        public string Height { get; set; }

        public bool? HideOnClick { get; set; }

        public NotificationPositionSettings Position { get; } = new NotificationPositionSettings();

        public string Width { get; set; }

        public NotificationStackingSettings? Stacking { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();


            if (AllowHideAfter.HasValue)
            {
                settings["allowHideAfter"] = AllowHideAfter;
            }

            if (AppendTo.HasValue())
            {
                settings["appendTo"] = AppendTo;
            }

            if (AutoHideAfter.HasValue)
            {
                settings["autoHideAfter"] = AutoHideAfter;
            }

            if (Button.HasValue)
            {
                settings["button"] = Button;
            }

            if (Height.HasValue())
            {
                settings["height"] = Height;
            }

            if (HideOnClick.HasValue)
            {
                settings["hideOnClick"] = HideOnClick;
            }

            var position = Position.Serialize();
            if (position.Any())
            {
                settings["position"] = position;
            }

            if (Width.HasValue())
            {
                settings["width"] = Width;
            }

            if (Stacking.HasValue)
            {
                settings["stacking"] = Stacking?.Serialize();
            }

            return settings;
        }

    }
}
