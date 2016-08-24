using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class GanttResourceService : IGanttResourceService, IDisposable
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

        public virtual IList<ResourceViewModel> GetAll()
        {
            return db.GanttResources.ToList().Select(resource => new ResourceViewModel
            {
                ID = resource.ID,
                Name = resource.Name,
                Color = resource.Color
            }).ToList();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}