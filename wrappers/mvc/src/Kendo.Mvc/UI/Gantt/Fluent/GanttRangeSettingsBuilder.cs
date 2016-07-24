namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttRangeSettings settings.
    /// </summary>
    public class GanttRangeSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttRangeSettings container;

        public GanttRangeSettingsBuilder(GanttRangeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// If set to some date the timeline of all views will start from this date.
        /// </summary>
        /// <param name="value">The value that configures the start.</param>
        public GanttRangeSettingsBuilder Start(DateTime value)
        {
            container.Start = value;

            return this;
        }
        
        /// <summary>
        /// If set to some date the timeline of all views will end to this date.
        /// </summary>
        /// <param name="value">The value that configures the end.</param>
        public GanttRangeSettingsBuilder End(DateTime value)
        {
            container.End = value;

            return this;
        }
        
        //<< Fields
    }
}

