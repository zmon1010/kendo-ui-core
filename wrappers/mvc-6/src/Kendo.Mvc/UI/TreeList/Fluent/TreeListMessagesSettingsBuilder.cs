using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListMessagesSettings
    /// </summary>
    public partial class TreeListMessagesSettingsBuilder
        
    {
        public TreeListMessagesSettingsBuilder(TreeListMessagesSettings container)
        {
            Container = container;
        }

        protected TreeListMessagesSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}
