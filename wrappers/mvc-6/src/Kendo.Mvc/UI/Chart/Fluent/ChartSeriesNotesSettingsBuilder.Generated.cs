using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSeriesNotesSettings
    /// </summary>
    public partial class ChartSeriesNotesSettingsBuilder
        
    {
        /// <summary>
        /// The position of the series note.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartSeriesNotesSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// The icon of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the icon setting.</param>
        public ChartSeriesNotesSettingsBuilder Icon(Action<ChartSeriesNotesIconSettingsBuilder> configurator)
        {

            Container.Icon.Chart = Container.Chart;
            configurator(new ChartSeriesNotesIconSettingsBuilder(Container.Icon));

            return this;
        }

        /// <summary>
        /// The label of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the label setting.</param>
        public ChartSeriesNotesSettingsBuilder Label(Action<ChartSeriesNotesLabelSettingsBuilder> configurator)
        {

            Container.Label.Chart = Container.Chart;
            configurator(new ChartSeriesNotesLabelSettingsBuilder(Container.Label));

            return this;
        }

        /// <summary>
        /// The line of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartSeriesNotesSettingsBuilder Line(Action<ChartSeriesNotesLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartSeriesNotesLineSettingsBuilder(Container.Line));

            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the notes. The available argument fields are:
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartSeriesNotesSettingsBuilder Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the notes. The available argument fields are:
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartSeriesNotesSettingsBuilder Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
    }
}
