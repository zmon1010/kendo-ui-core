namespace Kendo.Mvc.UI
{    
    using Kendo.Mvc.Resources;    
    
    public class GridToolBarSaveCommand : GridActionCommandBase
    {
        public GridToolBarSaveCommand()
        {
            CancelText = Messages.Grid_CancelChanges;
            SaveText = Messages.Grid_SaveChanges;
        }

		public override string Name
		{
			get
			{
				return "savechanges";
			}			
		}

		public string SaveText
        {
            get;
            set;
        }

        public string CancelText
        {
            get;
            set;
        }      
    }
}
