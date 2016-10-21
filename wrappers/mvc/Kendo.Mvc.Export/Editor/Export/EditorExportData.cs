using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Flow.FormatProviders.Rtf;

namespace Kendo.Mvc.Export
{
    public class EditorExportData
    {
        public string Value { get; set; }
        public string ExportType { get; set; }
        public string FileName { get; set; }

        private HtmlImportSettings importSettings = new HtmlImportSettings();
        public HtmlImportSettings HtmlImportSettings
        {
            get
            {
                return importSettings;
            }
            set
            {
                importSettings = value;
            }
        }

        private DocxExportSettings docxExportSettings = new DocxExportSettings();
        public DocxExportSettings DocxExportSettings
        {
            get
            {
                return docxExportSettings;
            }
            set
            {
                docxExportSettings = value;
            }
        }

        private RtfExportSettings rtfExportSettings = new RtfExportSettings();
        public RtfExportSettings RtfExportSettings
        {
            get
            {
                return rtfExportSettings;
            }
            set
            {
                rtfExportSettings = value;
            }
        }

        private PdfExportSettings pdfExportSettings = new PdfExportSettings();
        public PdfExportSettings PdfExportSettings
        {
            get
            {
                return pdfExportSettings;
            }
            set
            {
                pdfExportSettings = value;
            }
        }

        private HtmlExportSettings htmlExportSettings = new HtmlExportSettings();
        public HtmlExportSettings HtmlExportSettings
        {
            get
            {
                return htmlExportSettings;
            }
            set
            {
                htmlExportSettings = value;
            }
        }
    }
}
