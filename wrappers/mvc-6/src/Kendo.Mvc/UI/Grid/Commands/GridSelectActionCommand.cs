namespace Kendo.Mvc.UI
{    
    using Kendo.Mvc.Resources;    

    public class GridSelectActionCommand : GridActionCommandBase
    {
        public GridSelectActionCommand()
        {
            Text = Messages.Grid_Select;
        }

        public override string Name
        {
            get { return "select"; }
        }		
    }
}
