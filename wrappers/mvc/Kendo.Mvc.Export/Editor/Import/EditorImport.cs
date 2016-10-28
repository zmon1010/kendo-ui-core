using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Txt;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Export
{
    public static partial class EditorImport
    {
        private static HtmlFormatProvider GetHtmlFormatProvider(EditorImportSettings settings)
        {
            var htmlProvider = new HtmlFormatProvider();

            htmlProvider.ExportSettings.DocumentExportLevel = settings.DocumentImportLevel;

            htmlProvider.ExportSettings.StylesExportMode = settings.StylesImportMode;
            htmlProvider.ExportSettings.StylesFilePath = settings.StylesFilePath;
            htmlProvider.ExportSettings.StylesSourcePath = settings.StylesSourcePath;

            htmlProvider.ExportSettings.ImagesExportMode = settings.ImagesImportMode;
            htmlProvider.ExportSettings.ImagesFolderPath = settings.ImagesFolderPath;
            htmlProvider.ExportSettings.ImagesSourceBasePath = settings.ImagesSourceBasePath;

            return htmlProvider;
        }

        public static String GetTextContent(HttpPostedFileBase file)
        {
            BinaryReader b = new BinaryReader(file.InputStream);
            byte[] binData = b.ReadBytes((int)file.InputStream.Length);

            return System.Text.Encoding.UTF8.GetString(binData);
        }
    }
}