using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public interface IGanttTaskService
    {
        IList<TaskViewModel> GetAll();
        void Insert(TaskViewModel task, ModelStateDictionary modelState);
        void Update(TaskViewModel task, ModelStateDictionary modelState);
        void Delete(TaskViewModel task, ModelStateDictionary modelState);
    }
}