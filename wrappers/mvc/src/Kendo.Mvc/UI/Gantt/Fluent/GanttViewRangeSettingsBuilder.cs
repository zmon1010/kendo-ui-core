namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the GanttViewRangeSettings settings.
    /// </summary>
    public class GanttViewRangeSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttViewRangeSettings container;

        public GanttViewRangeSettingsBuilder(GanttViewRangeSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// If set to some date the timeline of the view will start from this date.Overrides the range.start option of the gantt.
        /// </summary>
        /// <param name="value">The value that configures the start.</param>
        public GanttViewRangeSettingsBuilder Start(DateTime value)
        {
            container.Start = value;

            return this;
        }
        
        /// <summary>
        /// If set to some date the timeline of the view will end to this date.Overrides the range.end option of the gantt.
        /// </summary>
        /// <param name="value">The value that configures the end.</param>
        public GanttViewRangeSettingsBuilder End(DateTime value)
        {
            container.End = value;

            return this;
        }
        
        //<< Fields
    }
}

