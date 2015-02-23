using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// The server side wrapper for Kendo UI Grid
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public partial class Grid<T>
    {
        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            // TODO: Automatically serialized settings go here

            writer.Write(Initializer.Initialize(Selector, "Grid", settings));
        }
    }
}