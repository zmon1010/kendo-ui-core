namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo Window resizing settings
    /// </summary>
    public class WindowResizingSettingsBuilder
    {
        private readonly WindowResizingSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="WindowResizingSettingsBuilder" /> class.
        /// </summary>
        /// <param name="settings">The resizing settings.</param>
        public WindowResizingSettingsBuilder(WindowResizingSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Enables or disables the resizing.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Resizable(x => x.Enabled(true))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowResizingSettingsBuilder Enabled(bool enable)
        {
            settings.Enabled = enable;

            return this;
        }

        /// <summary>
        /// Sets the min width.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Resizable(x => x.MinWidth(100))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowResizingSettingsBuilder MinWidth(int minWidth)
        {
            settings.MinWidth = minWidth;

            return this;
        }

        /// <summary>
        /// Sets the max width.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Resizable(x => x.MaxWidth(100))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowResizingSettingsBuilder MaxWidth(int maxWidth)
        {
            settings.MaxWidth = maxWidth;

            return this;
        }

        /// <summary>
        /// Sets the min height.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Resizable(x => x.MinHeight(100))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowResizingSettingsBuilder MinHeight(int minHeight)
        {
            settings.MinHeight = minHeight;

            return this;
        }

        /// <summary>
        /// Sets the max height.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Window()
        ///             .Name("Window")
        ///             .Resizable(x => x.MaxHeight(100))
        /// %&gt;
        /// </code>
        /// </example>
        public WindowResizingSettingsBuilder MaxHeight(int maxHeight)
        {
            settings.MaxHeight = maxHeight;

            return this;
        }
    }
}
