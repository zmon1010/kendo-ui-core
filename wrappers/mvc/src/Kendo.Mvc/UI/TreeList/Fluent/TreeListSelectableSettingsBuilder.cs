
namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListSelectableSettings
    /// </summary>
    public class TreeListSelectableSettingsBuilder<T>
        where T : class
    {
        public TreeListSelectableSettingsBuilder(TreeListSelectableSettings<T> container)
        {
            Container = container;
        }

        protected TreeListSelectableSettings<T> Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Specifies whether multiple or single selection is allowed.
        /// </summary>
        /// <param name="value">The value for Mode</param>
        public TreeListSelectableSettingsBuilder<T> Mode(TreeListSelectionMode value)
        {
            Container.Mode = value;
            return this;
        }

        /// <summary>
        /// Specifies whether row or cell selection is allowed.
        /// </summary>
        /// <param name="value">The value for Type</param>
        public TreeListSelectableSettingsBuilder<T> Type(TreeListSelectionType value)
        {
            Container.Type = value;
            return this;
        }
    }
}
