using System.Linq;
using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Kendo.Mvc.Examples.Extensions;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public class GanttDependencyService : BaseService, IGanttDependencyService
    {
        private static bool UpdateDatabase = false;
        private ISession _session;

        public ISession Session { get { return _session; } }

        public GanttDependencyService(IHttpContextAccessor httpContextAccessor)
        {
            _session = httpContextAccessor.HttpContext.Session;
        }

        public virtual IList<DependencyViewModel> GetAll()
        {
            using (var db = GetContext())
            {
                var result = Session.GetObjectFromJson<IList<DependencyViewModel>>("GanttDependencies");

                if (result == null || UpdateDatabase)
                {
                    result = db.GanttDependencies.ToList().Select(dependency => new DependencyViewModel
                    {
                        DependencyID = dependency.ID,
                        PredecessorID = dependency.PredecessorID,
                        SuccessorID = dependency.SuccessorID,
                        Type = (DependencyType)dependency.Type
                    }).ToList();

                    Session.SetObjectAsJson("GanttDependencies", result);
                }

                return result;
            }
        }

        public virtual void Insert(DependencyViewModel dependency)
        {
            if (!UpdateDatabase)
            {
                var dependencies = GetAll();
                var first = dependencies.OrderByDescending(e => e.DependencyID).FirstOrDefault();
                var id = (first != null) ? first.DependencyID : 0;

                dependency.DependencyID = id + 1;

                dependencies.Insert(0, dependency);

                Session.SetObjectAsJson("GanttDependencies", dependencies);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = dependency.ToEntity();

                    db.GanttDependencies.Add(entity);
                    db.SaveChanges();

                    dependency.DependencyID = entity.ID;
                }
            }
        }

        public virtual void Delete(DependencyViewModel dependency)
        {
            if (!UpdateDatabase)
            {
                var dependencies = GetAll();
                var target = dependencies.FirstOrDefault(p => p.DependencyID == dependency.DependencyID);

                if (target != null)
                {
                    dependencies.Remove(target);
                }

                Session.SetObjectAsJson("GanttDependencies", dependencies);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = dependency.ToEntity();
                    db.GanttDependencies.Attach(entity);
                    db.GanttDependencies.Remove(entity);
                    db.SaveChanges();
                }
            }
        }
    }
}