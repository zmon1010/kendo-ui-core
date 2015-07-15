using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization;
using Telerik.Windows.Documents.Spreadsheet.Core;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx;
using Telerik.Windows.Documents.Spreadsheet.Model;

using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;

namespace Kendo.Spreadsheet
{
    public partial class Workbook
    {
        static Workbook()
        {
            WorkbookFormatProvidersManager.RegisterFormatProvider(new XlsxFormatProvider());
        }

        public static Workbook FromDocument(Document document)
        {
            return null;
        }

        public Document ToDocument()
        {
            var document = new Document();
            document.History.IsEnabled = false;

            using (new UpdateScope(document.SuspendLayoutUpdate, document.ResumeLayoutUpdate))
            {
                foreach (var sheet in Sheets)
                {
                    var documentSheet = document.Worksheets.Add();

                    foreach (var row in sheet.Rows)
                    {
                        foreach (var cell in row.Cells)
                        {
                            var stringValue = cell.Value == null ? null : cell.Value.ToString();
                            var selection = documentSheet.Cells[row.Index, cell.Index];
                            double numericValue;

                            if (!string.IsNullOrEmpty(cell.Formula))
                            {
                                selection.SetValueAsFormula(cell.Formula);
                            }
                            else if (double.TryParse(stringValue, out numericValue))
                            {
                                selection.SetValue(numericValue);
                            }
                            else
                            {
                                selection.SetValueAsText(stringValue);
                            }

                            if (!string.IsNullOrEmpty(cell.Format))
                            {
                                selection.SetFormat(new CellValueFormat(cell.Format));
                            }
                        }
                    }

                    foreach (var mergedRange in sheet.MergedCells)
                    {
                        documentSheet.Cells.GetCellSelection(mergedRange).Merge();
                    }

                    //if (dtoSheet.FrozenColumns > 0 || dtoSheet.FrozenRows > 0)
                    //{
                    //    sheet.ViewState.FreezePanes(dtoSheet.FrozenRows, dtoSheet.FrozenColumns);
                    //}
                }
            }

            document.History.IsEnabled = true;

            return document;
        }

        public static Document Load(string path)
        {
            Document document;
            using (var file = File.OpenRead(path))
            {
                var extension = Path.GetExtension(path);
                document = WorkbookFormatProvidersManager.Import(extension, file);
            }

            return document;
        }

        public void Save(string path)
        {
            var document = new Document();

            using (var file = File.OpenWrite(path))
            {
                var extension = Path.GetExtension(path);
                WorkbookFormatProvidersManager.Export(document, extension, file);
            }
        }
    }
}
