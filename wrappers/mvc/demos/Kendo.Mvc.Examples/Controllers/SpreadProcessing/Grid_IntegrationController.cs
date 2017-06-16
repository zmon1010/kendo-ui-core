using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Windows.Media;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.Pdf;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.TextBased.Csv;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.TextBased.Txt;
using Telerik.Windows.Documents.Spreadsheet.Model;
using Telerik.Windows.Documents.Spreadsheet.Utilities;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SpreadProcessingController : Controller
    {
        [Demo]
        public ActionResult Grid_Integration()
        {
            var item = new ItemsModel();
            item.Products = GetProducts();

            return View(item);
        }

        public ActionResult GridIntegration_Read([DataSourceRequest]DataSourceRequest request)
        {
            return Json(GetProducts().ToDataSourceResult(request));
        }

        [HttpPost]
        public ActionResult GenerateFile(ItemsModel productsGrid, string fileFormat, string headerColor, string rowColor)
        {
            IWorkbookFormatProvider fileFormatProvider = null;
            Workbook document = GenerateWorkbook(productsGrid, headerColor, rowColor);
            string mimeType = String.Empty;
            string fileDownloadName = "{0}.{1}";

            fileDownloadName = String.Format(fileDownloadName, "SampleDocument", fileFormat);

            switch (fileFormat)
            {
                case "xlsx":
                    fileFormatProvider = new XlsxFormatProvider();
                    mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    break;
                case "csv":
                    fileFormatProvider = new CsvFormatProvider();
                    mimeType = "text/csv";
                    break;
                case "txt":
                    fileFormatProvider = new TxtFormatProvider();
                    mimeType = "text/plain";
                    break;
                default:
                    fileFormatProvider = new TxtFormatProvider();
                    mimeType = "text/plain";
                    break;
            }

            byte[] renderedBytes = null;

            using (MemoryStream ms = new MemoryStream())
            {
                fileFormatProvider.Export(document, ms);
                renderedBytes = ms.ToArray();
            }

            return File(renderedBytes, mimeType, fileDownloadName);
        }


        private static readonly int NameColumnIndex = 0;
        private static readonly int PriceColumnIndex = 1;
        private static readonly int StockColumnIndex = 2;

        private static readonly int StartRowIndex = 0;
        private Workbook GenerateWorkbook(ItemsModel grid, string headerColor, string rowColor)
        {
            Workbook workbook = new Workbook();
            workbook.Sheets.Add(SheetType.Worksheet);

            Worksheet worksheet = workbook.ActiveWorksheet;

            var products = grid.Products;

            this.PrepareGridDocument(worksheet, products.Count(), headerColor, rowColor);

            int currentRow = StartRowIndex + 1;
           
            foreach (var product in products)
            {
                worksheet.Cells[currentRow, NameColumnIndex].SetValue(product.ProductName);
                worksheet.Cells[currentRow, PriceColumnIndex].SetValue((double)product.UnitPrice);
                worksheet.Cells[currentRow, StockColumnIndex].SetValue(product.UnitsInStock);
                currentRow++;
            }

            
            worksheet.Columns[NameColumnIndex].SetWidth(new ColumnWidth(300, true));
            worksheet.Columns[PriceColumnIndex].SetWidth(new ColumnWidth(80, true));
            worksheet.Columns[StockColumnIndex].ExpandToFitNumberValuesWidth();

            return workbook;
        }

        private void PrepareGridDocument(Worksheet worksheet, int itemsCount, string headerColor, string rowColor)
        {
            int lastItemIndexRow = StartRowIndex + itemsCount;

            CellIndex firstUsedCellIndex = new CellIndex(0, 0);
            CellIndex lastUsedCellIndex = new CellIndex(lastItemIndexRow + 1, StockColumnIndex);
            
            ThemableColor headerBackground = new ThemableColor((Color)ColorConverter.ConvertFromString(headerColor));
            ThemableColor rowsBackground = new ThemableColor((Color)ColorConverter.ConvertFromString(rowColor));

            worksheet.Cells[StartRowIndex, NameColumnIndex].SetValue("Name");
            worksheet.Cells[StartRowIndex, PriceColumnIndex].SetValue("Price");
            worksheet.Cells[StartRowIndex, StockColumnIndex].SetValue("Stock");
            

            worksheet.Cells[StartRowIndex, 0, StartRowIndex, StockColumnIndex].SetFill(new GradientFill(GradientType.Horizontal, headerBackground, headerBackground));
            worksheet.Cells[StartRowIndex+1, 0, lastItemIndexRow, StockColumnIndex].SetFill(new GradientFill(GradientType.Vertical, rowsBackground, rowsBackground));
            
            worksheet.Cells[StartRowIndex, PriceColumnIndex, lastItemIndexRow, PriceColumnIndex].SetFormat(new CellValueFormat(AccountFormatString));
            
        }

    }
}
