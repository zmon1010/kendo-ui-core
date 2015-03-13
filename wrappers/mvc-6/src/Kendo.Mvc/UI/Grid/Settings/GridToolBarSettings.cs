namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Extensions;

    public class GridToolBarSettings : JsonObject        
    {
        public GridToolBarSettings()
        {
            Commands = new List<GridActionCommandBase>();             
        }  

        public bool Enabled
        {
            get
            {
				return Commands.Any() || ClientTemplate.HasValue();
            }
        }

        public IList<GridActionCommandBase> Commands
        {
            get;
            private set;
        }
		
		public string ClientTemplate
		{
			get;
			set;
		}

		protected override void Serialize(IDictionary<string, object> json)
		{
			var commands = new List<IDictionary<string, object>>();

			Commands.Each(command =>
			{
				commands.Add(command.Serialize());
			});

			if (commands.Any() && !ClientTemplate.HasValue())
			{
				json["commands"] = commands;
			}

			if (ClientTemplate.HasValue())
			{
				json["template"] = ClientTemplate;
			}
		}
    }
}