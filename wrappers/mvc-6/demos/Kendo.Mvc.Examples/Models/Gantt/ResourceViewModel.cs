namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class ResourceViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }

        public GanttResource ToEntity()
        {
            return new GanttResource
            {
                ID = ID,
                Name = Name,
                Color = Color
            };
        }
    }
}