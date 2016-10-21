namespace Kendo.Mvc.Export
{
    public class ExportColumnSettings
    {
        /// <summary>
        /// Column title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Holds the column width
        /// </summary>
        public System.Web.UI.WebControls.Unit Width { get; set; }

        /// <summary>
        /// Determines the data field
        /// </summary>
        public string Field { get; set; }

        /// <summary>
        /// Stores the format string
        /// </summary>
        public string Format { get; set; }
        
        /// <summary>
        /// Determines the column visibility
        /// </summary>
        public bool Hidden { get; set; }
    }
}
