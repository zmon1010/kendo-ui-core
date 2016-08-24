using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Kendo.Mvc.Examples.Models.Gantt
{
    public interface IGanttResourceService
    {
        IList<ResourceViewModel> GetAll();
    }
}