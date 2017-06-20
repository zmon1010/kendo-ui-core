namespace Kendo.Mvc.Examples.Models.TreeList
{
    using System.Linq;
    using Kendo.Mvc.UI;
    using Microsoft.AspNetCore.Mvc.ModelBinding;
    using Microsoft.EntityFrameworkCore;
    using Mvc.Extensions;
    using Microsoft.AspNetCore.Http;
    using System.Collections.Generic;
    using Extensions;
    using System;

    public static class EmployeeDirectoryIEnumerableExtensions
    {        
        public static EmployeeDirectoryModel ToEmployeeDirectoryModel(this EmployeeDirectory employee)
        {
            return new EmployeeDirectoryModel
            {
                EmployeeId = employee.EmployeeID,
                ReportsTo = employee.ReportsTo,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Address = employee.Address,
                City = employee.City,
                Country = employee.Country,
                BirthDate = employee.BirthDate,
                HireDate = employee.HireDate,
                Phone = employee.Phone,
                Position = employee.Position,
                Extension = employee.Extension
            };
        }

        public static EmployeeDirectoryRemoteModel ToEmployeeDirectoryRemoteModel(this EmployeeDirectory employee)
        {
            return new EmployeeDirectoryRemoteModel
            {
                EmployeeId = employee.EmployeeID,
                ReportsTo = employee.ReportsTo,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Address = employee.Address,
                City = employee.City,
                Country = employee.Country,
                BirthDate = employee.BirthDate,
                HireDate = employee.HireDate,
                Phone = employee.Phone,
                Position = employee.Position,
                Extension = employee.Extension
            };
        }
    }

    public class EmployeeDirectoryService: BaseService, IEmployeeDirectoryService
    {
        private static bool UpdateDatabase = false;
        private ISession _session;

        public ISession Session { get { return _session; } }

        public EmployeeDirectoryService(IHttpContextAccessor httpContextAccessor)
        {
            _session = httpContextAccessor.HttpContext.Session;
        }

        public virtual IList<EmployeeDirectoryModel> GetAll()
        {
            using (var db = GetContext())
            {
                var result = Session.GetObjectFromJson<IList<EmployeeDirectoryModel>>("EmployeeDirectory");

                if (result == null || UpdateDatabase)
                {
                    result = db.EmployeeDirectories
                        .ToList()
                        .Select(employee => employee.ToEmployeeDirectoryModel())
                        .ToList();

                    Session.SetObjectAsJson("EmployeeDirectory", result);
                }

                return result;
            }
        }

        public virtual IList<EmployeeDirectoryRemoteModel> GetAllRemote()
        {
            using (var db = GetContext())
            {
                return db.EmployeeDirectories
                        .ToList()
                        .Select(employee => employee.ToEmployeeDirectoryRemoteModel())
                        .ToList();
            }
        }

        public virtual void Insert(EmployeeDirectoryModel employee, ModelStateDictionary modelState)
        {
            if (ValidateModel(employee, modelState))
            {
                if (!UpdateDatabase)
                {
                    var employees = GetAll();
                    var first = employees.OrderByDescending(e => e.EmployeeId).FirstOrDefault();
                    var id = (first != null) ? first.EmployeeId : 0;

                    employee.EmployeeId = id + 1;

                    employees.Insert(0, employee);

                    Session.SetObjectAsJson("EmployeeDirectory", employees);
                }
                else
                {
                    using (var db = GetContext())
                    {
                        var entity = employee.ToEntity();

                        db.EmployeeDirectories.Add(entity);
                        db.SaveChanges();

                        employee.EmployeeId = entity.EmployeeID;
                    }
                }
            }
        }

        public virtual void Update(EmployeeDirectoryModel employee, ModelStateDictionary modelState)
        {
            if (ValidateModel(employee, modelState))
            {
                if (!UpdateDatabase)
                {
                    var employees = GetAll();
                    var target = employees.FirstOrDefault(e => e.EmployeeId == employee.EmployeeId);

                    if (target != null)
                    {
                        target.FirstName = employee.FirstName;
                        target.LastName = employee.LastName;
                        target.Address = employee.Address;
                        target.City = employee.City;
                        target.Country = employee.Country;
                        target.Phone = employee.Phone;
                        target.Extension = employee.Extension;
                        target.BirthDate = employee.BirthDate;
                        target.HireDate = employee.HireDate;
                        target.Position = employee.Position;
                        target.ReportsTo = employee.ReportsTo;
                    }

                    Session.SetObjectAsJson("EmployeeDirectory", employees);
                }
                else
                {
                    using (var db = GetContext())
                    {
                        var entity = employee.ToEntity();
                        db.EmployeeDirectories.Attach(entity);
                        db.Entry(entity).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }
            }
        }

        public virtual void Delete(EmployeeDirectoryModel employee, ModelStateDictionary modelState)
        {
            if (!UpdateDatabase)
            {
                var employees = GetAll();
                var target = employees.FirstOrDefault(e => e.EmployeeId == employee.EmployeeId);

                if (target != null)
                {
                    DeleteSessionChildren(target, employees);

                    employees.Remove(target);
                }

                Session.SetObjectAsJson("EmployeeDirectory", employees);
            }
            else
            {
                using (var db = GetContext())
                {
                    var entity = employee.ToEntity();
                    db.EmployeeDirectories.Attach(entity);
                    DeleteEntityChildren(entity);
                    db.SaveChanges();
                }
            }
        }

        private void DeleteEntityChildren(EmployeeDirectory employee)
        {
            using (var db = GetContext())
            {
                var children = db.EmployeeDirectories.Where(e => e.ReportsTo == employee.EmployeeID);

                foreach (var subordinate in children)
                {
                    DeleteEntityChildren(subordinate);
                }

                db.EmployeeDirectories.Remove(employee);
            }
        }

        private void DeleteSessionChildren(EmployeeDirectoryModel employee, IList<EmployeeDirectoryModel> employees)
        {
            var subordinates = employees.Where(m => m.ReportsTo == employee.EmployeeId).ToList();

            foreach (var subordinate in subordinates)
            {
                DeleteSessionChildren(subordinate, employees);

                employees.Remove(subordinate);
            }
        }

        private bool ValidateModel(EmployeeDirectoryModel employee, ModelStateDictionary modelState)
        {
            if (employee.HireDate < employee.BirthDate)
            {
                modelState.AddModelError("errors", "Employee cannot be hired before birth.");
                return false;
            }
            
            return true;
        }
    }
}