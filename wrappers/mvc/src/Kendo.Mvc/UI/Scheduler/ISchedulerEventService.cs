namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

    public interface ISchedulerEventService<T> : IDisposable
        where T : class, ISchedulerEvent
    {
        IList<T> GetAll();
        void Insert(T appointment, ModelStateDictionary modelState);
        void Update(T appointment, ModelStateDictionary modelState);
        void Delete(T appointment, ModelStateDictionary modelState);
    }
}
