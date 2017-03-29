using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring CalendarMessagesSettings
    /// </summary>
    public partial class CalendarMessagesSettingsBuilder
        
    {
        /// <summary>
        /// Allows customization of the week column header text. Set the value to make the widget compliant with web accessibility standards.
        /// </summary>
        /// <param name="value">The value for WeekColumnHeader</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Calendar()
        ///             .Name("calendar")
        ///             .WeekNumber(true)
        ///             .Messages(m => m.WeekColumnHeader("W"))
        /// %&gt;
        /// </code>
        /// </example>
        public CalendarMessagesSettingsBuilder WeekColumnHeader(string value)
        {
            Container.WeekColumnHeader = value;
            return this;
        }

    }
}
