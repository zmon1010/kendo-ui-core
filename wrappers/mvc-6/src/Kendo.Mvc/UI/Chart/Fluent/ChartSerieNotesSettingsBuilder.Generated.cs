using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartSerieNotesSettings
    /// </summary>
    public partial class ChartSerieNotesSettingsBuilder
        
    {
        /// <summary>
        /// The position of the series note.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartSerieNotesSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// The icon of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the icon setting.</param>
        public ChartSerieNotesSettingsBuilder Icon(Action<ChartSerieNotesIconSettingsBuilder> configurator)
        {

            Container.Icon.Chart = Container.Chart;
            configurator(new ChartSerieNotesIconSettingsBuilder(Container.Icon));

            return this;
        }

        /// <summary>
        /// The label of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the label setting.</param>
        public ChartSerieNotesSettingsBuilder Label(Action<ChartSerieNotesLabelSettingsBuilder> configurator)
        {

            Container.Label.Chart = Container.Chart;
            configurator(new ChartSerieNotesLabelSettingsBuilder(Container.Label));

            return this;
        }

        /// <summary>
        /// The line of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartSerieNotesSettingsBuilder Line(Action<ChartSerieNotesLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartSerieNotesLineSettingsBuilder(Container.Line));

            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the notes. The available argument fields are:
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartSerieNotesSettingsBuilder Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the notes. The available argument fields are:
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartSerieNotesSettingsBuilder Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
    }
}
