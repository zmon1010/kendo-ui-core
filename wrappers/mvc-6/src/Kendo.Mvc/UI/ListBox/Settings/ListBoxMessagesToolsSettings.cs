using System.Collections.Generic;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ListBoxMessagesToolsSettings class
    /// </summary>
    public partial class ListBoxMessagesToolsSettings 
    {
        public ListBoxMessagesToolsSettings()
        {
            MoveDown = Messages.ListBox_MoveDown;
            MoveUp = Messages.ListBox_MoveUp;
            Remove = Messages.ListBox_Remove;
            TransferAllFrom = Messages.ListBox_TransferAllFrom;
            TransferAllTo = Messages.ListBox_TransferAllTo;
            TransferFrom = Messages.ListBox_TransferFrom;
            TransferTo = Messages.ListBox_TransferTo;
        }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            // Do manual serialization here

            return settings;
        }
    }
}
