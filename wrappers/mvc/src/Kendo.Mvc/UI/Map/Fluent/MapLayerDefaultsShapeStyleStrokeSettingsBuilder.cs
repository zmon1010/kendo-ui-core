namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsShapeStyleStrokeSettings settings.
    /// </summary>
    public class MapLayerDefaultsShapeStyleStrokeSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsShapeStyleStrokeSettings container;

        public MapLayerDefaultsShapeStyleStrokeSettingsBuilder(MapLayerDefaultsShapeStyleStrokeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The default stroke color for layer shapes. Accepts a valid CSS color string, including hex and rgb.
        /// </summary>
        /// <param name="value">The value that configures the color.</param>
        public MapLayerDefaultsShapeStyleStrokeSettingsBuilder Color(string value)
        {
            container.Color = value;

            return this;
        }
        
        /// <summary>
        /// The default dash type for layer shapes. The following dash types are supported: "dash" - a line consisting of dashes; "dashDot" - a line consisting of a repeating pattern of dash-dot; "dot" - a line consisting of dots; "longDash" - a line consisting of a repeating pattern of long-dash; "longDashDot" - a line consisting of a repeating pattern of long-dash-dot; "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot or "solid" - a solid line.
        /// </summary>
        /// <param name="value">The value that configures the dashtype.</param>
        public MapLayerDefaultsShapeStyleStrokeSettingsBuilder DashType(string value)
        {
            container.DashType = value;

            return this;
        }
        
        /// <summary>
        /// The default stroke opacity (0 to 1) for layer shapes.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerDefaultsShapeStyleStrokeSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        /// <summary>
        /// The default stroke width for layer shapes.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public MapLayerDefaultsShapeStyleStrokeSettingsBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields
    }
}

