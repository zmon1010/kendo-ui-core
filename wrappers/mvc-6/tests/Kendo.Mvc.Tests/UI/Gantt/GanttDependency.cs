using Kendo.Mvc.UI;

namespace Kendo.Mvc.UI.Tests
{
    public class GanttDependency : IGanttDependency
    {
        public int DependencyID
        {
            get;
            set;
        }

        public int PredecessorID
        {
            get;
            set;
        }

        public int SuccessorID
        {
            get;
            set;
        }

        public DependencyType Type
        {
            get;
            set;
        }
    }
}
