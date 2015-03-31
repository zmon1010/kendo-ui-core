using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListMessagesCommandsSettings class
    /// </summary>
    public partial class TreeListMessagesCommandsSettings<T> where T : class 
    {
        public string Canceledit { get; set; }

        public string Create { get; set; }

        public string Createchild { get; set; }

        public string Destroy { get; set; }

        public string Edit { get; set; }

        public string Excel { get; set; }

        public string Pdf { get; set; }

        public string Update { get; set; }


        public TreeList<T> TreeList { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Canceledit.HasValue())
            {
                settings["canceledit"] = Canceledit;
            }

            if (Create.HasValue())
            {
                settings["create"] = Create;
            }

            if (Createchild.HasValue())
            {
                settings["createchild"] = Createchild;
            }

            if (Destroy.HasValue())
            {
                settings["destroy"] = Destroy;
            }

            if (Edit.HasValue())
            {
                settings["edit"] = Edit;
            }

            if (Excel.HasValue())
            {
                settings["excel"] = Excel;
            }

            if (Pdf.HasValue())
            {
                settings["pdf"] = Pdf;
            }

            if (Update.HasValue())
            {
                settings["update"] = Update;
            }

            return settings;
        }
    }
}
