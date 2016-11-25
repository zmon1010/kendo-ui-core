namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the frequency types supported by Kendo UI RecurrenceEditor for ASP.NET MVC
    /// </summary>
    public enum RecurrenceEditorFrequency
    {
        /// <summary>
        /// The event will have a single occurrence
        /// </summary>
        Never,
        /// <summary>
        /// The event will reapeate every day
        /// </summary>
        Daily,
        /// <summary>
        /// The event will reapeate every week
        /// </summary>
        Weekly,
        /// <summary>
        /// The event will reapeate every month
        /// </summary>
        Monthly,
        /// <summary>
        /// The event will reapeate every year
        /// </summary>
        Yearly
    }
}
