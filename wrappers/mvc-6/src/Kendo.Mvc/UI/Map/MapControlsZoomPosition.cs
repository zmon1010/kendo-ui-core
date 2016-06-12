namespace Kendo.Mvc.UI
{
    /// <summary>
    /// The position of the zoom control. Predefined values are "topLeft", "topRight", "left", "bottomRight", "bottomLeft".
    /// </summary>
    public enum MapControlsZoomPosition
    {
        TopLeft,
        TopRight,
        BottomRight,
        BottomLeft
    }

    internal static class MapControlsZoomPositionExtensions
    {
        internal static string Serialize(this MapControlsZoomPosition value)
        {
            switch (value)
            {
                case MapControlsZoomPosition.TopLeft:
                    return "topLeft";
                case MapControlsZoomPosition.TopRight:
                    return "topRight";
                case MapControlsZoomPosition.BottomRight:
                    return "bottomRight";
                case MapControlsZoomPosition.BottomLeft:
                    return "bottomLeft";
            }

            return value.ToString();
        }
    }
}

