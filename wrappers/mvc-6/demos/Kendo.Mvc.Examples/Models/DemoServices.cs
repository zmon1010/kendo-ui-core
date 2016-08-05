using Kendo.Mvc.Rendering;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public class DemoServices
    {
        public static IEnumerable<ServiceDescriptor> GetServices()
        {
            yield return ServiceDescriptor.Scoped<Gantt.IGanttTaskService, Gantt.GanttTaskService>();
            yield return ServiceDescriptor.Scoped<Gantt.IGanttDependencyService, Gantt.GanttDependencyService>();
            yield return ServiceDescriptor.Scoped<Gantt.IGanttResourceService, Gantt.GanttResourceService>();
            yield return ServiceDescriptor.Scoped<Gantt.IGanttAssignmentService, Gantt.GanttAssignmentService>();
        }
    }
}
