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
		public GridExcelSettings Excel
        {
            get;
            private set;
        } = new GridExcelSettings();

		public PDFSettings Pdf
		{
			get;
			private set;
		} = new PDFSettings();

		public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

			var excel = Excel.ToJson();
			if (excel.Any())
			{
				settings["excel"] = excel;
			}

			var pdf = Pdf.ToJson();
			if (pdf.Any())
			{
				settings["pdf"] = pdf;
			}

			// TODO: Automatically serialized settings go here

			writer.Write(Initializer.Initialize(Selector, "Grid", settings));
        }
    }
}