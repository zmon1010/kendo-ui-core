using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartYAxisNotesSettings
    /// </summary>
    public partial class ChartYAxisNotesSettingsBuilder
        
    {
        /// <summary>
        /// The position of the y axis notes.
        /// </summary>
        /// <param name="value">The value for Position</param>
        public ChartYAxisNotesSettingsBuilder Position(string value)
        {
            Container.Position = value;
            return this;
        }

        /// <summary>
        /// The icon of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the icon setting.</param>
        public ChartYAxisNotesSettingsBuilder Icon(Action<ChartYAxisNotesIconSettingsBuilder> configurator)
        {

            Container.Icon.Chart = Container.Chart;
            configurator(new ChartYAxisNotesIconSettingsBuilder(Container.Icon));

            return this;
        }

        /// <summary>
        /// The label of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the label setting.</param>
        public ChartYAxisNotesSettingsBuilder Label(Action<ChartYAxisNotesLabelSettingsBuilder> configurator)
        {

            Container.Label.Chart = Container.Chart;
            configurator(new ChartYAxisNotesLabelSettingsBuilder(Container.Label));

            return this;
        }

        /// <summary>
        /// The line of the notes.
        /// </summary>
        /// <param name="configurator">The configurator for the line setting.</param>
        public ChartYAxisNotesSettingsBuilder Line(Action<ChartYAxisNotesLineSettingsBuilder> configurator)
        {

            Container.Line.Chart = Container.Chart;
            configurator(new ChartYAxisNotesLineSettingsBuilder(Container.Line));

            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the notes. The available argument fields are:
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public ChartYAxisNotesSettingsBuilder Visual(string handler)
        {
            Container.Visual = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// A function that can be used to create a custom visual for the notes. The available argument fields are:
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public ChartYAxisNotesSettingsBuilder Visual(Func<object, object> handler)
        {
            Container.Visual = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
    }
}
