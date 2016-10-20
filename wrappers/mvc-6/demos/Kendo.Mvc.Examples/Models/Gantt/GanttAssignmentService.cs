using Kendo.Mvc.Examples.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.Examples.Models.Gantt
{

    public class GanttAssignmentService : BaseService, IGanttAssignmentService
    {
        private static bool UpdateDatabase = false;
        private ISession _session;

        public ISession Session { get { return _session; } }

        public GanttAssignmentService(IHttpContextAccessor httpContextAccessor)
        {
            _session = httpContextAccessor.HttpContext.Session;
        }

        public virtual IList<ResourceAssignmentViewModel> GetAll()
        {
            using (var db = GetContext())
            {
                var result = Session.GetObjectFromJson<IList<ResourceAssignmentViewModel>>("GanttAssignments");

                if (result == null || UpdateDatabase)
                {
                    result = db.GanttResourceAssignments.ToList().Select(assignment => new ResourceAssignmentViewModel
                    {
                        ID = assignment.ID,
                        TaskID = assignment.TaskID,
                        ResourceID = assignment.ResourceID,
                        Units = assignment.Units
                    }).ToList();

                    Session.SetObjectAsJson("GanttAssignments", result);
                }

                return result;
            }
        }

        public virtual void Insert(ResourceAssignmentViewModel assignment)
        {
            if (!UpdateDatabase)
            {
                var assignments = GetAll();
                var first = assignments.OrderByDescending(e => e.ID).FirstOrDefault();
                var id = (first != null) ? first.ID : 0;

                assignment.ID = id + 1;

                assignments.Insert(0, assignment);

                Session.SetObjectAsJson("GanttAssignments", assignments);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = assignment.ToEntity();

                    db.GanttResourceAssignments.Add(entity);
                    db.SaveChanges();

                    assignment.ID = entity.ID;
                }
            }
        }

        public virtual void Update(ResourceAssignmentViewModel assignment)
        {
            if (!UpdateDatabase)
            {
                var assignments = GetAll();
                var target = assignments.FirstOrDefault(e => e.ID == assignment.ID);

                if (target != null)
                {
                    target.ResourceID = assignment.ResourceID;
                    target.TaskID = assignment.TaskID;
                    target.Units = assignment.Units;
                }

                Session.SetObjectAsJson("GanttAssignments", assignments);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = assignment.ToEntity();

                    db.GanttResourceAssignments.Attach(entity);
                    db.Entry(entity).State = EntityState.Modified;
                    db.SaveChanges();
                }
            }
        }

        public virtual void Delete(ResourceAssignmentViewModel assignment)
        {
            if (!UpdateDatabase)
            {
                var assignments = GetAll();
                var target = assignments.FirstOrDefault(e => e.ID == assignment.ID);

                if (target != null)
                {
                    assignments.Remove(target);
                }

                Session.SetObjectAsJson("GanttAssignments", assignments);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = assignment.ToEntity();

                    db.GanttResourceAssignments.Attach(entity);
                    db.GanttResourceAssignments.Remove(entity);
                    db.SaveChanges();
                }
            }
        }
    }
}