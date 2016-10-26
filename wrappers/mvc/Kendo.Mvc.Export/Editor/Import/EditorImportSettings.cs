using System;
using System.ComponentModel;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;

namespace Kendo.Mvc.Export
{
    public class EditorImportSettings
    {
        public readonly DocumentExportLevel DocumentImportLevel = DocumentExportLevel.Fragment;

        /// <summary>
        /// Gets or sets the export mode for the styles. Default value is Embedded.
        /// </summary
        [DefaultValue(StylesExportMode.Embedded)]
        public StylesExportMode StylesImportMode { get; set; }

        /// <summary>
        /// Gets or sets the path to the file that will contain the external styles.
        /// </summary
        public string StylesFilePath { get; set; }

        /// <summary>
        /// Gets or sets the value that will be set as 'href' attribute of the 'link' element pointing to the file containing the external styles.
        /// </summary
        public string StylesSourcePath { get; set; }

        /// <summary>
        /// Gets or sets the export mode for the images. Default value is Embedded.
        /// </summary
        [DefaultValue(ImagesExportMode.Embedded)]
        public ImagesExportMode ImagesImportMode { get; set; }

        /// <summary>
        /// Gets or sets the path to the folder that will contain the external image files.
        /// </summary
        public string ImagesFolderPath { get; set; }

        /// <summary>
        /// Gets or sets the base path that will be set as value to the 'src' attribute of the 'image' elements.
        /// </summary
        public string ImagesSourceBasePath { get; set; }
    }
}
