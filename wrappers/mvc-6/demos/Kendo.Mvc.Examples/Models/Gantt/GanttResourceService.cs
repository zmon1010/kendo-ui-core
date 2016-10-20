using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class GanttResourceService : BaseService, IGanttResourceService
    {
        public GanttResourceService()
        {
        }

        public virtual IList<ResourceViewModel> GetAll()
        {
            using (var db = GetContext())
            {
                return db.GanttResources.ToList().Select(resource => new ResourceViewModel
                {
                    ID = resource.ID,
                    Name = resource.Name,
                    Color = resource.Color
                }).ToList();
            }
        }
    }
}