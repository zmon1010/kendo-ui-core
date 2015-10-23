namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI.Fluent;
    using Microsoft.AspNet.Mvc.Rendering;

    public class CustomDataSourceBuilderBaseDouble : CustomDataSourceBuilderBase<CustomDataSourceBuilderBaseDouble>
    {
        public CustomDataSourceBuilderBaseDouble(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }
    }
}
