using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartAxisDefaultsLabelsRotationSettings
    /// </summary>
    public partial class ChartAxisDefaultsLabelsRotationSettingsBuilder<T>
        where T : class 
    {
        /// <summary>
        /// The alignment of the rotated labels relative to the slot center. The supported values are "end" and "center". By default the closest end of the label will be aligned to the center. If set to "center", the center of the rotated label will be aligned instead.
        /// </summary>
        /// <param name="value">The value for Align</param>
        public ChartAxisDefaultsLabelsRotationSettingsBuilder<T> Align(string value)
        {
            Container.Align = value;
            return this;
        }

        /// <summary>
        /// The rotation angle of the labels. By default the labels are not rotated. Can be set to "auto" if the axis is horizontal in which case the labels will be rotated only if the slot size is not sufficient for the entire labels.
        /// </summary>
        /// <param name="value">The value for Angle</param>
        public ChartAxisDefaultsLabelsRotationSettingsBuilder<T> Angle(double value)
        {
            Container.Angle = value;
            return this;
        }

    }
}
