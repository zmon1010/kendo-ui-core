using Newtonsoft.Json;
using System.IO;
using Telerik.Documents.SpreadsheetStreaming;

namespace Kendo.Mvc
{
    public static class Export
    {
        public static Stream JsonToStream(SpreadDocumentFormat format, string data, string model, string title)
        {
            var modelObject = JsonConvert.DeserializeObject<dynamic>(model);
            var dataObject = JsonConvert.DeserializeObject<dynamic>(data);

            MemoryStream stream = new MemoryStream();
            using (IWorkbookExporter workbook = SpreadExporter.CreateWorkbookExporter(format, stream))
            {
                using (IWorksheetExporter worksheet = workbook.CreateWorksheetExporter(title))
                {
                    using (IRowExporter row = worksheet.CreateRowExporter())
                    {
                        for (int idx = 0; idx < modelObject.Count; idx++)
                        {
                            var modelCol = modelObject[idx];
                            string columnName = modelCol.title ?? modelCol.field;
                            using (ICellExporter cell = row.CreateCellExporter())
                            {
                                cell.SetValue(columnName);
                            }
                        }
                    }
                    for (int rowIdx = 0; rowIdx < dataObject.Count; rowIdx++)
                    {
                        using (IRowExporter row = worksheet.CreateRowExporter())
                        {
                            for (int colIdx = 0; colIdx < modelObject.Count; colIdx++)
                            {
                                using (ICellExporter cell = row.CreateCellExporter())
                                {
                                    cell.SetValue(dataObject[rowIdx][modelObject[colIdx].field.ToString()].ToString());
                                }
                            }
                        }
                    }
                }
                return stream;
            }
        }
    }
}
