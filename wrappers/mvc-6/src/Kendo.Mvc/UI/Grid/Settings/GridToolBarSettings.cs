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
				return Commands.Any();// || Template.HasValue();
            }
        }

        public IList<GridActionCommandBase> Commands
        {
            get;
            private set;
        }

		//TODO: toolbar template
		//public HtmlTemplate Template
		//{
		//    get;
		//    private set;
		//}

		protected override void Serialize(IDictionary<string, object> json)
		{
			var commands = new List<IDictionary<string, object>>();

			Commands.Each(command =>
			{
				commands.Add(command.Serialize());
			});

			if (commands.Any())
			{
				json["commands"] = commands;
			}
		}
    }
}