using Microsoft.Data.Entity;
using System.Linq;

namespace Kendo.Mvc.Examples.Models.Gantt
{

    public class GanttAssignmentService
    {
        private SampleEntitiesDataContext db;

        public GanttAssignmentService(SampleEntitiesDataContext context)
        {
            db = context;
        }

        public GanttAssignmentService()
            : this(new SampleEntitiesDataContext())
        {
        }

        public virtual IQueryable<ResourceAssignmentViewModel> GetAll()
        {
            return db.GanttResourceAssignments.ToList().Select(assignment => new ResourceAssignmentViewModel
            {
                ID = assignment.ID,
                TaskID = assignment.TaskID,
                ResourceID = assignment.ResourceID,
                Units = assignment.Units
            }).AsQueryable();
        }

        public virtual void Insert(ResourceAssignmentViewModel assignment)
        {
            var entity = assignment.ToEntity();

            db.GanttResourceAssignments.Add(entity);
            db.SaveChanges();

            assignment.ID = entity.ID;
        }

        public virtual void Update(ResourceAssignmentViewModel assignment)
        {
            var entity = assignment.ToEntity();

            db.GanttResourceAssignments.Attach(entity);
            db.Entry(entity).State = EntityState.Modified;
            db.SaveChanges();
        }

        public virtual void Delete(ResourceAssignmentViewModel assignment)
        {
            var entity = assignment.ToEntity();

            db.GanttResourceAssignments.Attach(entity);
            db.GanttResourceAssignments.Remove(entity);
            db.SaveChanges();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}