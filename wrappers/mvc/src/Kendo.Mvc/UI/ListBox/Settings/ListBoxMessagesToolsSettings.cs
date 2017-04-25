namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using Resources;

    public class ListBoxMessagesToolsSettings : JsonObject
    {
        public ListBoxMessagesToolsSettings()
        {
            MoveDown = Messages.ListBox_MoveDown;
            MoveUp= Messages.ListBox_MoveUp;
            Remove = Messages.ListBox_Remove;
            TransferAllFrom = Messages.ListBox_TransferAllFrom;
            TransferAllTo = Messages.ListBox_TransferAllTo;
            TransferFrom = Messages.ListBox_TransferFrom;
            TransferTo = Messages.ListBox_TransferTo;

            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string MoveDown { get; set; }
        
        public string MoveUp { get; set; }
        
        public string Remove { get; set; }
        
        public string TransferAllFrom { get; set; }
        
        public string TransferAllTo { get; set; }
        
        public string TransferFrom { get; set; }
        
        public string TransferTo { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (MoveDown.HasValue())
            {
                json["moveDown"] = MoveDown;
            }
            
            if (MoveUp.HasValue())
            {
                json["moveUp"] = MoveUp;
            }
            
            if (Remove.HasValue())
            {
                json["remove"] = Remove;
            }
            
            if (TransferAllFrom.HasValue())
            {
                json["transferAllFrom"] = TransferAllFrom;
            }
            
            if (TransferAllTo.HasValue())
            {
                json["transferAllTo"] = TransferAllTo;
            }
            
            if (TransferFrom.HasValue())
            {
                json["transferFrom"] = TransferFrom;
            }
            
            if (TransferTo.HasValue())
            {
                json["transferTo"] = TransferTo;
            }
            
        //<< Serialization
        }
    }
}
