namespace Kendo.Mvc.UI
{
    /// <summary>
    /// The position of the attribution control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
    /// </summary>
    public enum MapControlsAttributionPosition
    {
        TopLeft,
        TopRight,
        BottomRight,
        BottomLeft
    }

    internal static class MapControlsAttributionPositionExtensions
    {
        internal static string Serialize(this MapControlsAttributionPosition value)
        {
            switch (value)
            {
                case MapControlsAttributionPosition.TopLeft:
                    return "topLeft";
                case MapControlsAttributionPosition.TopRight:
                    return "topRight";
                case MapControlsAttributionPosition.BottomRight:
                    return "bottomRight";
                case MapControlsAttributionPosition.BottomLeft:
                    return "bottomLeft";
            }

            return value.ToString();
        }
    }
}

