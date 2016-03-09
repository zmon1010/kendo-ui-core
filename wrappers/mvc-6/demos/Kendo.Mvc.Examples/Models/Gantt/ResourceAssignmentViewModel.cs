namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class ResourceAssignmentViewModel
    {
        public int ID { get; set; }
        public int TaskID { get; set; }
        public int ResourceID { get; set; }
        public decimal Units { get; set; }

        public GanttResourceAssignment ToEntity()
        {
            return new GanttResourceAssignment()
            {
                ID = ID,
                TaskID = TaskID,
                ResourceID = ResourceID,
                Units = Units
            };
        }
    }
}