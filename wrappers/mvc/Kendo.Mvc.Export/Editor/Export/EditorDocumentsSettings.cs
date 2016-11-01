using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Flow.FormatProviders.Rtf;

namespace Kendo.Mvc.Export
{
    public class EditorDocumentsSettings
    {
        private HtmlImportSettings importSettings;
        /// <summary>
        /// Gets or sets the HtmlIMportSettings, which are used to convert the HTML content to RadFlowDocument
        /// </summary
        public HtmlImportSettings HtmlImportSettings
        {
            get
            {
                if (importSettings == null)
                {
                    importSettings = new HtmlImportSettings();
                }

                return importSettings;
            }
        }

        private DocxExportSettings docxExportSettings;
        /// <summary>
        /// Gets or sets DocxExportSettings, which configure the DocxFormatProvider used for DOCX export
        /// </summary
        public DocxExportSettings DocxExportSettings
        {
            get
            {
                if (docxExportSettings == null)
                {
                    docxExportSettings = new DocxExportSettings();
                }
                return docxExportSettings;
            }
            set
            {
                docxExportSettings = value;
            }
        }

        private RtfExportSettings rtfExportSettings;
        /// <summary>
        /// Gets or sets RtfExportSettings, which configure the RtfFormatProvider used for RTF export
        /// </summary
        public RtfExportSettings RtfExportSettings
        {
            get
            {
                if (rtfExportSettings == null)
                {
                    rtfExportSettings = new RtfExportSettings();
                }
                return rtfExportSettings;
            }
            set
            {
                rtfExportSettings = value;
            }
        }

        private PdfExportSettings pdfExportSettings;
        /// <summary>
        /// Gets or sets PdfExportSettings, which configure the PdfFormatProvider used for PDF export
        /// </summary
        public PdfExportSettings PdfExportSettings
        {
            get
            {
                if (pdfExportSettings == null)
                {
                    pdfExportSettings = new PdfExportSettings();
                }
                return pdfExportSettings;
            }
            set
            {
                pdfExportSettings = value;
            }
        }

        private HtmlExportSettings htmlExportSettings;
        /// <summary>
        /// Gets or sets HtmlExportSettings, which configure the HtmlFormatProvider used for HTML export
        /// </summary
        public HtmlExportSettings HtmlExportSettings
        {
            get
            {
                if (htmlExportSettings == null)
                {
                    htmlExportSettings = new HtmlExportSettings();
                }
                return htmlExportSettings;
            }
            set
            {
                htmlExportSettings = value;
            }
        }
    }
}