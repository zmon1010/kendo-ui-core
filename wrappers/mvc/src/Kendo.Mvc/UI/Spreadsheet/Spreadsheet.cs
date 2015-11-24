namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class Spreadsheet : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public Spreadsheet(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Excel = new SpreadsheetExcelSettings();
                
            Sheets = new List<SpreadsheetSheet>();
                
        //<< Initialization
        }

//>> Fields
        
        public string ActiveSheet { get; set; }
        
        public double? ColumnWidth { get; set; }
        
        public double? Columns { get; set; }
        
        public double? HeaderHeight { get; set; }
        
        public double? HeaderWidth { get; set; }
        
        public SpreadsheetExcelSettings Excel
        {
            get;
            set;
        }
        
        public double? RowHeight { get; set; }
        
        public double? Rows { get; set; }
        
        public List<SpreadsheetSheet> Sheets
        {
            get;
            set;
        }
        
        public bool? Sheetsbar { get; set; }
        
        public bool? Toolbar { get; set; }
        
        //<< Fields

        internal Dictionary<string, object> DplSettings { get; set; }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

//>> Serialization
        
            if (ActiveSheet.HasValue())
            {
                json["activeSheet"] = ActiveSheet;
            }
            
            if (ColumnWidth.HasValue)
            {
                json["columnWidth"] = ColumnWidth;
            }
                
            if (Columns.HasValue)
            {
                json["columns"] = Columns;
            }
                
            if (HeaderHeight.HasValue)
            {
                json["headerHeight"] = HeaderHeight;
            }
                
            if (HeaderWidth.HasValue)
            {
                json["headerWidth"] = HeaderWidth;
            }
                
            var excel = Excel.ToJson();
            if (excel.Any())
            {
                json["excel"] = excel;
            }
            if (RowHeight.HasValue)
            {
                json["rowHeight"] = RowHeight;
            }
                
            if (Rows.HasValue)
            {
                json["rows"] = Rows;
            }
                
            var sheets = Sheets.ToJson();
            if (sheets.Any())
            {
                json["sheets"] = sheets;
            }
            if (Sheetsbar.HasValue)
            {
                json["sheetsbar"] = Sheetsbar;
            }
                
            if (Toolbar.HasValue)
            {
                json["toolbar"] = Toolbar;
            }
                
        //<< Serialization

            if (DplSettings != null)
            {
                json.Merge(DplSettings);
            }

            writer.Write(Initializer.Initialize(Selector, "Spreadsheet", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new SpreadsheetHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

