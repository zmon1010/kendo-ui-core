namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.Tests;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.UI.Tests;
    using Microsoft.AspNet.Mvc.ModelBinding;
    using Xunit;

    public class CustomDataSourceModelDescriptorFactoryTests
    {
        private readonly CustomDataSourceModelDescriptorFactory<Customer> builder;
        private readonly ModelDescriptor descriptor;

        public CustomDataSourceModelDescriptorFactoryTests()
        {
            descriptor = new ModelDescriptor(typeof(Customer), new EmptyModelMetadataProvider());
            builder = new CustomDataSourceModelDescriptorFactory<Customer>(descriptor);
        }

        [Fact]
        public void ClearFields_should_clear_generated_fields()
        {
            builder.ClearFields();

            descriptor.Fields.Count.ShouldEqual(0);
        }
    }
}
