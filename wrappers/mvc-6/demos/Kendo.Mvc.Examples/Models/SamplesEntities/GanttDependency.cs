namespace Kendo.Mvc.Examples.Models
{
	public partial class GanttDependency
    {
        public int ID { get; set; }

        public int PredecessorID { get; set; }

        public int SuccessorID { get; set; }

        public int Type { get; set; }
    }
}
