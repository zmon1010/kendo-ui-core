using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ListBoxMessagesToolsSettings class
    /// </summary>
    public partial class ListBoxMessagesToolsSettings 
    {
        public string MoveDown { get; set; }

        public string MoveUp { get; set; }

        public string Remove { get; set; }

        public string TransferAllFrom { get; set; }

        public string TransferAllTo { get; set; }

        public string TransferFrom { get; set; }

        public string TransferTo { get; set; }


        public ListBox ListBox { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (MoveDown?.HasValue() == true)
            {
                settings["moveDown"] = MoveDown;
            }

            if (MoveUp?.HasValue() == true)
            {
                settings["moveUp"] = MoveUp;
            }

            if (Remove?.HasValue() == true)
            {
                settings["remove"] = Remove;
            }

            if (TransferAllFrom?.HasValue() == true)
            {
                settings["transferAllFrom"] = TransferAllFrom;
            }

            if (TransferAllTo?.HasValue() == true)
            {
                settings["transferAllTo"] = TransferAllTo;
            }

            if (TransferFrom?.HasValue() == true)
            {
                settings["transferFrom"] = TransferFrom;
            }

            if (TransferTo?.HasValue() == true)
            {
                settings["transferTo"] = TransferTo;
            }

            return settings;
        }
    }
}
