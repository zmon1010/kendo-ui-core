using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring RadialGaugeScaleLabelsSettings
    /// </summary>
    public partial class RadialGaugeScaleLabelsSettingsBuilder
        
    {
        /// <summary>
        /// The background color of the labels.
		/// Any valid CSS color string will work here, including hex and rgb
        /// </summary>
        /// <param name="value">The value for Background</param>
        public RadialGaugeScaleLabelsSettingsBuilder Background(string value)
        {
            Container.Background = value;
            return this;
        }

        /// <summary>
        /// The border of the labels.
        /// </summary>
        /// <param name="configurator">The configurator for the border setting.</param>
        public RadialGaugeScaleLabelsSettingsBuilder Border(Action<RadialGaugeScaleLabelsBorderSettingsBuilder> configurator)
        {

            Container.Border.RadialGauge = Container.RadialGauge;
            configurator(new RadialGaugeScaleLabelsBorderSettingsBuilder(Container.Border));

            return this;
        }

        /// <summary>
        /// The text color of the labels.
		/// Any valid CSS color string will work here, including hex and rgb.
        /// </summary>
        /// <param name="value">The value for Color</param>
        public RadialGaugeScaleLabelsSettingsBuilder Color(string value)
        {
            Container.Color = value;
            return this;
        }

        /// <summary>
        /// The font style of the labels.
        /// </summary>
        /// <param name="value">The value for Font</param>
        public RadialGaugeScaleLabelsSettingsBuilder Font(string value)
        {
            Container.Font = value;
            return this;
        }

        /// <summary>
        /// The format of the labels.
        /// </summary>
        /// <param name="value">The value for Format</param>
        public RadialGaugeScaleLabelsSettingsBuilder Format(string value)
        {
            Container.Format = value;
            return this;
        }

        /// <summary>
        /// The margin of the labels.
        /// </summary>
        /// <param name="value">The value for Margin</param>
        public RadialGaugeScaleLabelsSettingsBuilder Margin(double value)
        {
            Container.Margin = value;
            return this;
        }

        /// <summary>
        /// The padding of the labels.
        /// </summary>
        /// <param name="value">The value for Padding</param>
        public RadialGaugeScaleLabelsSettingsBuilder Padding(double value)
        {
            Container.Padding = value;
            return this;
        }

        /// <summary>
        /// The labels positions.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public RadialGaugeScaleLabelsSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// The label template.
		/// Template variables:
        /// </summary>
        /// <param name="value">The value for Template</param>
        public RadialGaugeScaleLabelsSettingsBuilder Template(string value)
        {
            Container.Template = value;
            return this;
        }

        /// <summary>
        /// The label template.
		/// Template variables:
        /// </summary>
        /// <param name="value">The ID of the template element for Template</param>
        public RadialGaugeScaleLabelsSettingsBuilder TemplateId(string templateId)
        {
            Container.TemplateId = templateId;
            return this;
        }

        /// <summary>
        /// The visibility of the labels.
        /// </summary>
        /// <param name="value">The value for Visible</param>
        public RadialGaugeScaleLabelsSettingsBuilder Visible(bool value)
        {
            Container.Visible = value;
            return this;
        }

    }
}
