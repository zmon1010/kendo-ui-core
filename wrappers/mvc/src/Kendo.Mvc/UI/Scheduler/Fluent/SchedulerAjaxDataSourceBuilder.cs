namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class SchedulerAjaxDataSourceBuilder<TModel> : FilterableAjaxDataSourceBuilder<TModel, SchedulerAjaxDataSourceBuilder<TModel>>
         where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerAjaxDataSourceBuilder"/> class.
        /// </summary>
        public SchedulerAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// <param name="configurator">The lambda which configures the Model</param>
        /// </summary>
        public SchedulerAjaxDataSourceBuilder<TModel> Model(Action<DataSourceSchedulerModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSchedulerModelDescriptorFactory<TModel>((SchedulerModelDescriptor)dataSource.Schema.Model));

            return (SchedulerAjaxDataSourceBuilder<TModel>)this;
        }
    }
}
