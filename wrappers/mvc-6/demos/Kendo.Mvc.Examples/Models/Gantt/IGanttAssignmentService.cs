using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public interface IGanttAssignmentService
    {
        IList<ResourceAssignmentViewModel> GetAll();
        void Insert(ResourceAssignmentViewModel task);
        void Update(ResourceAssignmentViewModel task);
        void Delete(ResourceAssignmentViewModel task);
    }
}