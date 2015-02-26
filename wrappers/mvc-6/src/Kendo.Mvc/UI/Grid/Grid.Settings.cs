using System.IO;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// The server side wrapper for Kendo UI Grid
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public partial class Grid<T>
    {
		protected virtual void InitializeSettings()
		{
			Excel = new GridExcelSettings();
		}

		public GridExcelSettings Excel
        {
            get;
            private set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

			var excel = Excel.ToJson();
			if (excel.Any())
			{
				settings["excel"] = excel;
			}

			// TODO: Automatically serialized settings go here

			writer.Write(Initializer.Initialize(Selector, "Grid", settings));
        }
    }
}