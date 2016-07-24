using System.Linq;
using Kendo.Mvc.UI;
using System;
using System.Data;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class GanttDependencyService
    {
        private SampleEntitiesDataContext db;

        public GanttDependencyService(SampleEntitiesDataContext context)
        {
            db = context;
        }

        public GanttDependencyService()
            : this(new SampleEntitiesDataContext())
        {
        }

        public virtual IQueryable<DependencyViewModel> GetAll()
        {
            return db.GanttDependencies.ToList().Select(dependency => new DependencyViewModel
            {
                DependencyID = dependency.ID,
                PredecessorID = dependency.PredecessorID,
                SuccessorID = dependency.SuccessorID,
                Type = (DependencyType)dependency.Type
            }).AsQueryable();  
        }

        public virtual void Insert(DependencyViewModel dependency, ModelStateDictionary modelState)
        {
            var entity = dependency.ToEntity();

            db.GanttDependencies.Add(entity);
            db.SaveChanges();

            dependency.DependencyID = entity.ID;
        }

        public virtual void Delete(DependencyViewModel dependency, ModelStateDictionary modelState)
        {
            var entity = dependency.ToEntity();
            db.GanttDependencies.Attach(entity);
            db.GanttDependencies.Remove(entity);
            db.SaveChanges();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}