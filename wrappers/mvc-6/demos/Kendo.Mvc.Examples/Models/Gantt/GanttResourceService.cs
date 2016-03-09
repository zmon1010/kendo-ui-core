using System.Linq;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class GanttResourceService
    {
        private SampleEntitiesDataContext db;

        public GanttResourceService(SampleEntitiesDataContext context)
        {
            db = context;
        }

        public GanttResourceService()
            : this(new SampleEntitiesDataContext())
        {
        }

        public virtual IQueryable<ResourceViewModel> GetAll()
        {
            return db.GanttResources.ToList().Select(resource => new ResourceViewModel
            {
                ID = resource.ID,
                Name = resource.Name,
                Color = resource.Color
            }).AsQueryable();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}