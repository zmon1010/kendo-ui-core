namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the selectable options.
    /// </summary>
    public enum ListBoxSelectable
    {
        /// <summary>
        /// Single selection
        /// </summary>
        Single,
        /// <summary>
        /// Multiple selections
        /// </summary>
        Multiple
    }

    internal static class ListBoxSelectableExtensions
    {
        internal static string Serialize(this ListBoxSelectable value)
        {
            switch (value)
            {
                case ListBoxSelectable.Single:
                    return "single";
                case ListBoxSelectable.Multiple:
                    return "multiple";
            }

            return value.ToString();
        }
    }
}

