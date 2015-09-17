using System;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// General purpose extension methods
    /// </summary>
    public static class CommonExtensions
    {             
        /// <summary>
        /// Converts the value to pixels string, i.e 10.0 to "10px"
        /// </summary>
        /// <param name="value">The value to convert</param>
        /// <returns>Converted value</returns>
        public static string ToPixels(this double value)
        {
            return Math.Round(value).ToString() + "px";
        }
    }
}
