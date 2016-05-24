using System.Linq;
using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class GanttTaskService
    {
        private SampleEntitiesDataContext db;

        public GanttTaskService(SampleEntitiesDataContext context)
        {
            db = context;
        }

        public GanttTaskService()
            : this(new SampleEntitiesDataContext())
        {
        }

        public virtual IQueryable<TaskViewModel> GetAll()
        {
            return db.GanttTasks.ToList().Select(task => new TaskViewModel
            {
                TaskID = task.ID,
                Title = task.Title,
                Start = DateTime.SpecifyKind(task.Start, DateTimeKind.Utc),
                End = DateTime.SpecifyKind(task.End, DateTimeKind.Utc),
                ParentID = task.ParentID,
                PercentComplete = task.PercentComplete,
                OrderId = task.OrderID,
                Expanded = task.Expanded,
                Summary = task.Summary
            }).AsQueryable();  
        }

        public virtual void Insert(TaskViewModel task, ModelStateDictionary modelState)
        {
            if (ValidateModel(task, modelState))
            {
                if (string.IsNullOrEmpty(task.Title))
                {
                    task.Title = "";
                }

                var entity = task.ToEntity();

                db.GanttTasks.Add(entity);
                db.SaveChanges();

                task.TaskID = entity.ID;
            }
        }

        public virtual void Update(TaskViewModel task, ModelStateDictionary modelState)
        {
            if (ValidateModel(task, modelState))
            {
                if (string.IsNullOrEmpty(task.Title))
                {
                    task.Title = "";
                }

                var entity = task.ToEntity();
                db.GanttTasks.Attach(entity);
                db.Entry(entity).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public virtual void Delete(TaskViewModel task, ModelStateDictionary modelState)
        {
            var entity = task.ToEntity();
            db.GanttTasks.Attach(entity);

            Delete(entity);

            db.GanttTasks.Remove(entity);
            db.SaveChanges();
        }

        private void Delete(GanttTask task)
        {
            var childTasks = db.GanttTasks.Where(t => t.ParentID == task.ID);

            foreach (var childTask in childTasks)
            {
                Delete(childTask);
                db.GanttTasks.Remove(childTask);
            }
        }

        private bool ValidateModel(TaskViewModel task, ModelStateDictionary modelState)
        {
            if (task.Start > task.End)
            {
                modelState.AddModelError("errors", "End date must be greater or equal to Start date.");
                return false;
            }
            
            return true;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}