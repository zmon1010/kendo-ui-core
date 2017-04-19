namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the listbox toolbar positions.
    /// </summary>
    public enum ListBoxToolbarPosition
    {
        /// <summary>
        /// The listbox's toolbar is positioned on the top
        /// </summary>
        Top,
        /// <summary>
        /// The listbox's toolbar is positioned on the bottom
        /// </summary>
        Bottom,
        /// <summary>
        /// The listbox's toolbar is positioned on the left
        /// </summary>
        Left,
        /// <summary>
        /// The listbox's toolbar is positioned on the right
        /// </summary>
        Right
    }

    internal static class ListBoxToolbarPositionExtensions
    {
        internal static string Serialize(this ListBoxToolbarPosition value)
        {
            switch (value)
            {
                case ListBoxToolbarPosition.Top:
                    return "top";
                case ListBoxToolbarPosition.Bottom:
                    return "bottom";
                case ListBoxToolbarPosition.Left:
                    return "left";
                case ListBoxToolbarPosition.Right:
                    return "right";
            }

            return value.ToString();
        }
    }
}

