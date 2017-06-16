using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
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
        public ActionResult Generate_Documents()
        {
            return View();
        }

        public ActionResult GenerateDocument_Read([DataSourceRequest]DataSourceRequest request)
        {
            return Json(GetProducts().Take(15).ToDataSourceResult(request));
        }

        private IEnumerable<ProductViewModel> GetProducts()
        {
            var northwind = new SampleEntities();

            return northwind.Products
                .Where(p => p.UnitsInStock > 0)
                .Select(p => new ProductViewModel
                {
                    ProductID = p.ProductID,
                    ProductName = p.ProductName,
                    UnitsInStock = (int)p.UnitsInStock,
                    UnitPrice = (decimal)p.UnitPrice
                });
        }

        [HttpPost]
        public ActionResult GenerateDocument(string fileFormat)
        {
            IWorkbookFormatProvider fileFormatProvider = null;
            Workbook document = CreateWorkbook();
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


        #region File Generation

        private static readonly int IndexColumnQuantity = 1;
        private static readonly int IndexColumnUnitPrice = 2;
        private static readonly int IndexColumnSubTotal = 3;
        private static readonly int IndexRowItemStart = 1;

        private static readonly string AccountFormatString = GenerateCultureDependentFormatString();
        private static readonly ThemableColor InvoiceBackground = new ThemableColor(Color.FromArgb(255, 44, 62, 80));
        private static readonly ThemableColor InvoiceHeaderForeground = new ThemableColor(Color.FromArgb(255, 255, 255, 255));

        private Workbook CreateWorkbook()
        {
            Workbook workbook = new Workbook();
            workbook.Sheets.Add(SheetType.Worksheet);

            Worksheet worksheet = workbook.ActiveWorksheet;

            var products = GetProducts().Take(15);

            this.PrepareInvoiceDocument(worksheet, products.Count());

            int currentRow = IndexRowItemStart + 1;
            double subTotal;

            foreach (var product in products)
            {
                worksheet.Cells[currentRow, 0].SetValue(product.ProductName);
                worksheet.Cells[currentRow, IndexColumnQuantity].SetValue(product.UnitsInStock);
                worksheet.Cells[currentRow, IndexColumnUnitPrice].SetValue((double)product.UnitPrice);
                subTotal = product.UnitsInStock * (double)product.UnitPrice;

                worksheet.Cells[currentRow, IndexColumnSubTotal].SetValue(subTotal);

                currentRow++;
            }

            worksheet.Columns[0].SetWidth(new ColumnWidth(300, true));
            worksheet.Columns[IndexColumnUnitPrice].SetWidth(new ColumnWidth(120, true));
            worksheet.Columns[IndexColumnSubTotal].ExpandToFitNumberValuesWidth();

            return workbook;
        }

        private void PrepareInvoiceDocument(Worksheet worksheet, int itemsCount)
        {
            int lastItemIndexRow = IndexRowItemStart + itemsCount;

            CellIndex firstUsedCellIndex = new CellIndex(0, 0);
            CellIndex lastUsedCellIndex = new CellIndex(lastItemIndexRow + 1, IndexColumnSubTotal);
            CellBorder border = new CellBorder(CellBorderStyle.DashDot, InvoiceBackground);
            worksheet.Cells[firstUsedCellIndex, lastUsedCellIndex].SetBorders(new CellBorders(border, border, border, border, null, null, null, null));

            worksheet.Cells[firstUsedCellIndex].SetValue("INVOICE");
            worksheet.Cells[firstUsedCellIndex].SetFontSize(20);

            worksheet.Cells[IndexRowItemStart, 0].SetValue("Item");
            worksheet.Cells[IndexRowItemStart, IndexColumnQuantity].SetValue("QTY");
            worksheet.Cells[IndexRowItemStart, IndexColumnUnitPrice].SetValue("Unit Price");
            worksheet.Cells[IndexRowItemStart, IndexColumnSubTotal].SetValue("SubTotal");

            worksheet.Cells[IndexRowItemStart, 0, IndexRowItemStart, IndexColumnSubTotal].SetFill
                (new GradientFill(GradientType.Horizontal, InvoiceBackground, InvoiceBackground));
            worksheet.Cells[IndexRowItemStart, 0, IndexRowItemStart, IndexColumnSubTotal].SetForeColor(InvoiceHeaderForeground);
            worksheet.Cells[IndexRowItemStart, IndexColumnUnitPrice, lastItemIndexRow, IndexColumnSubTotal].SetFormat(
                new CellValueFormat(AccountFormatString));

            worksheet.Cells[lastItemIndexRow + 1, IndexColumnUnitPrice].SetValue("TOTAL: ");
            worksheet.Cells[lastItemIndexRow + 1, IndexColumnSubTotal].SetFormat(new CellValueFormat(AccountFormatString));

            string subTotalColumnCellRange = NameConverter.ConvertCellRangeToName(
                new CellIndex(IndexRowItemStart + 1, IndexColumnSubTotal),
                new CellIndex(lastItemIndexRow, IndexColumnSubTotal));

            worksheet.Cells[lastItemIndexRow + 1, IndexColumnSubTotal].SetValue(string.Format("=SUM({0})", subTotalColumnCellRange));

            worksheet.Cells[lastItemIndexRow + 1, IndexColumnUnitPrice, lastItemIndexRow + 1, IndexColumnSubTotal].SetFontSize(20);
        }

        private static string GenerateCultureDependentFormatString()
        {
            string gS = CultureInfo.CurrentCulture.NumberFormat.NumberGroupSeparator;
            string dS = CultureInfo.CurrentCulture.NumberFormat.NumberDecimalSeparator;

            return "_($* #" + gS + "##0" + dS + "00_);_($* (#" + gS + "##0" + dS + "00);_($* \"-\"??_);_(@_)";
        }

        #endregion
    }
}
