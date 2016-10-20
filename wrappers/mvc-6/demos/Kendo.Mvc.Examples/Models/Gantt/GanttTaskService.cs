using System.Linq;
using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Kendo.Mvc.Examples.Extensions;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class GanttTaskService : BaseService, IGanttTaskService
    {
        private static bool UpdateDatabase = false;
        private ISession _session;

        public ISession Session { get { return _session; } }

        public GanttTaskService(IHttpContextAccessor httpContextAccessor)
        {
            _session = httpContextAccessor.HttpContext.Session;
        }

        public virtual IList<TaskViewModel> GetAll()
        {
            using (var db = GetContext())
            {
                var result = Session.GetObjectFromJson<IList<TaskViewModel>>("GanttTasks");

                if (result == null || UpdateDatabase)
                {
                    result = db.GanttTasks.ToList().Select(task => new TaskViewModel
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
                    }).ToList();

                    Session.SetObjectAsJson("GanttTasks", result);
                }

                return result;
            }
        }

        public virtual void Insert(TaskViewModel task, ModelStateDictionary modelState)
        {
            if (ValidateModel(task, modelState))
            {
                if (!UpdateDatabase)
                {
                    var tasks = GetAll();
                    var first = tasks.OrderByDescending(e => e.TaskID).FirstOrDefault();
                    var id = (first != null) ? first.TaskID : 0;

                    task.TaskID = id + 1;

                    tasks.Insert(0, task);

                    Session.SetObjectAsJson("GanttTasks", tasks);
                }
                else
                {
                    using (var db = GetContext())
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
            }
        }

        public virtual void Update(TaskViewModel task, ModelStateDictionary modelState)
        {
            if (ValidateModel(task, modelState))
            {
                if (!UpdateDatabase)
                {
                    var tasks = GetAll();
                    var target = tasks.FirstOrDefault(e => e.TaskID == task.TaskID);

                    if (target != null)
                    {
                        target.Title = task.Title;
                        target.Start = task.Start;
                        target.End = task.End;
                        target.PercentComplete = task.PercentComplete;
                        target.OrderId = task.OrderId;
                        target.ParentID = task.ParentID;
                        target.Summary = task.Summary;
                        target.Expanded = task.Expanded;
                    }

                    Session.SetObjectAsJson("GanttTasks", tasks);
                }
                else
                {
                    using (var db = GetContext())
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
            }
        }

        public virtual void Delete(TaskViewModel task, ModelStateDictionary modelState)
        {
            if (!UpdateDatabase)
            {
                var tasks = GetAll();
                var target = tasks.FirstOrDefault(e => e.TaskID == task.TaskID);

                if (target != null)
                {
                    DeleteSessionChildren(target, tasks);

                    tasks.Remove(target);
                }

                Session.SetObjectAsJson("GanttTasks", tasks);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = task.ToEntity();
                    db.GanttTasks.Attach(entity);

                    DeleteEntityChildren(entity);

                    db.GanttTasks.Remove(entity);
                    db.SaveChanges();
                }
            }
        }

        private void DeleteEntityChildren(GanttTask task)
        {
            using (var db = GetContext())
            {
                var childTasks = db.GanttTasks.Where(t => t.ParentID == task.ID);

                foreach (var childTask in childTasks)
                {
                    DeleteEntityChildren(childTask);
                    db.GanttTasks.Remove(childTask);
                }
            }
        }

        private void DeleteSessionChildren(TaskViewModel task, IList<TaskViewModel> tasks)
        {
            var childTasks = tasks.Where(t => t.ParentID == task.TaskID).ToList();

            foreach (var childTask in childTasks)
            {
                DeleteSessionChildren(childTask, tasks);
                tasks.Remove(childTask);
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
    }
}