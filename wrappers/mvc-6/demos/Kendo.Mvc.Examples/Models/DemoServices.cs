using Kendo.Mvc.Examples.Models.Scheduler;
using Kendo.Mvc.Rendering;
using Kendo.Mvc.UI;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public class DemoServices
    {
        public static IEnumerable<ServiceDescriptor> GetServices()
        {
            yield return ServiceDescriptor.Scoped<IProductService, ProductService>();
            yield return ServiceDescriptor.Scoped<Gantt.IGanttTaskService, Gantt.GanttTaskService>();
            yield return ServiceDescriptor.Scoped<Gantt.IGanttDependencyService, Gantt.GanttDependencyService>();
            yield return ServiceDescriptor.Scoped<Gantt.IGanttResourceService, Gantt.GanttResourceService>();
            yield return ServiceDescriptor.Scoped<Gantt.IGanttAssignmentService, Gantt.GanttAssignmentService>();
            yield return ServiceDescriptor.Scoped<ISchedulerEventService<TaskViewModel>, SchedulerTaskService>();
            yield return ServiceDescriptor.Scoped<ISchedulerEventService<MeetingViewModel>, SchedulerMeetingService>();
        }
    }
}
