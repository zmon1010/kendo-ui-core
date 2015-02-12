namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the EditorResizableSettings settings.
    /// </summary>
    public class EditorResizableSettingsBuilder: IHideObjectMembers
    {
        private readonly EditorResizableSettings container;

        public EditorResizableSettingsBuilder(EditorResizableSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The minimum height that the editor can be resized to.
        /// </summary>
        /// <param name="value">The value that configures the min.</param>
        public EditorResizableSettingsBuilder Min(double value)
        {
            container.Min = value;

            return this;
        }
        
        /// <summary>
        /// The maximum height that the editor can be resized to.
        /// </summary>
        /// <param name="value">The value that configures the max.</param>
        public EditorResizableSettingsBuilder Max(double value)
        {
            container.Max = value;

            return this;
        }
        
        //<< Fields
    }
}

