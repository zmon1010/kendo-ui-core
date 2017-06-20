using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Kendo.Mvc.Examples.Models.TreeList;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class EmployeeDirectoryController : Controller
    {
        private IEmployeeDirectoryService employeeDirectory;

        public EmployeeDirectoryController(
            IEmployeeDirectoryService service)
        {
            employeeDirectory = service;
        }

        public JsonResult Index([DataSourceRequest] DataSourceRequest request, int? id)
        {
            var result = ((EmployeeDirectoryService)employeeDirectory).GetAllRemote().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => id.HasValue ? e.ReportsTo == id : e.ReportsTo == null,
                e => e
            );

            return Json(result);
        }

        public JsonResult All([DataSourceRequest] DataSourceRequest request)
        {
            var result = GetDirectory().ToTreeDataSourceResult(request,
                e => e.EmployeeId,
                e => e.ReportsTo,
                e => e
            );
            
            return Json(result);
        }

        public JsonResult Destroy([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Delete(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        public JsonResult Create([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Insert(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        public JsonResult Update([DataSourceRequest] DataSourceRequest request, EmployeeDirectoryModel employee)
        {
            if (ModelState.IsValid)
            {
                employeeDirectory.Update(employee, ModelState);
            }

            return Json(new[] { employee }.ToTreeDataSourceResult(request, ModelState));
        }

        private IEnumerable<EmployeeDirectoryModel> GetDirectory()
        {
            return employeeDirectory.GetAll();
        }
    }
}