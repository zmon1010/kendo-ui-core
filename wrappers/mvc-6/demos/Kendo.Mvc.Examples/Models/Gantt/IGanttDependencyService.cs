using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public interface IGanttDependencyService
    {
        IList<DependencyViewModel> GetAll();
        void Insert(DependencyViewModel task);
        void Delete(DependencyViewModel task);
    }
}