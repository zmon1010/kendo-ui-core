using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Flow.FormatProviders.Rtf;

namespace Kendo.Mvc.Export
{
    public class EditorDocumentsSettings
    {
        private HtmlImportSettings importSettings = new HtmlImportSettings();
        /// <summary>
        /// Gets or sets the HtmlIMportSettings, which are used to convert the HTML content to RadFlowDocument
        /// </summary
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
        /// <summary>
        /// Gets or sets DocxExportSettings, which configure the DocxFormatProvider used for DOCX export
        /// </summary
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
        /// <summary>
        /// Gets or sets RtfExportSettings, which configure the RtfFormatProvider used for RTF export
        /// </summary
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
        /// <summary>
        /// Gets or sets PdfExportSettings, which configure the PdfFormatProvider used for PDF export
        /// </summary
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
        /// <summary>
        /// Gets or sets HtmlExportSettings, which configure the HtmlFormatProvider used for HTML export
        /// </summary
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
