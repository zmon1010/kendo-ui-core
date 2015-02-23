using System.Collections.Generic;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// The server side wrapper for Kendo UI Grid
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public partial class Grid<T> : WidgetBase
        where T : class
    {
        public Grid(ViewContext viewContext) : base (viewContext)
        { }

        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            // Do custom serialization here

            return settings;
        }
    }
}