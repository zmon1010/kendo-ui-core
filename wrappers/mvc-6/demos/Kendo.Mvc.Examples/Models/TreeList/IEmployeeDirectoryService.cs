using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models.TreeList
{
    public interface IEmployeeDirectoryService
    {
        IList<EmployeeDirectoryModel> GetAll();
        void Insert(EmployeeDirectoryModel employee, ModelStateDictionary modelState);
        void Update(EmployeeDirectoryModel employee, ModelStateDictionary modelState);
        void Delete(EmployeeDirectoryModel employee, ModelStateDictionary modelState);
    }
}