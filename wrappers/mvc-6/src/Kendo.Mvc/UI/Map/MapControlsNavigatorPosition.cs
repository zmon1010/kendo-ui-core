namespace Kendo.Mvc.UI
{
    /// <summary>
    /// The position of the navigator control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
    /// </summary>
    public enum MapControlsNavigatorPosition
    {
        TopLeft,
        TopRight,
        BottomRight,
        BottomLeft
    }

    internal static class MapControlsNavigatorPositionExtensions
    {
        internal static string Serialize(this MapControlsNavigatorPosition value)
        {
            switch (value)
            {
                case MapControlsNavigatorPosition.TopLeft:
                    return "topLeft";
                case MapControlsNavigatorPosition.TopRight:
                    return "topRight";
                case MapControlsNavigatorPosition.BottomRight:
                    return "bottomRight";
                case MapControlsNavigatorPosition.BottomLeft:
                    return "bottomLeft";
            }

            return value.ToString();
        }
    }
}

