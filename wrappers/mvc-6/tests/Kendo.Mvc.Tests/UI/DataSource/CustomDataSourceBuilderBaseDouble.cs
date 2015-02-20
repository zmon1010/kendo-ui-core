namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.Tests;
    using Kendo.Mvc.UI.Fluent;
    using Microsoft.AspNet.Mvc;
    using Xunit;

    public class CustomDataSourceBuilderBaseDouble : CustomDataSourceBuilderBase<CustomDataSourceBuilderBaseDouble>
    {
        public CustomDataSourceBuilderBaseDouble(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }
    }
}
