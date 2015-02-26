namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class GridGroupableSettings : JsonObject
    {
        public GridGroupableSettings()
        {
            Groups = new List<GroupDescriptor>();
            Visible = true;
            Messages = new GridGroupableMessages();
        }

        public bool Enabled { get; set; }

        public bool Visible { get; set; }

        public bool ShowFooter { get; set; }

        public IList<GroupDescriptor> Groups { get; }
        
        public GridGroupableMessages Messages { get; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var messages = Messages.ToJson();

            if (messages.Keys.Any())
            {
                json["messages"] = messages;
            }

            if (ShowFooter)
            {
                json["showFooter"] = ShowFooter;
            }
        }
    }
}