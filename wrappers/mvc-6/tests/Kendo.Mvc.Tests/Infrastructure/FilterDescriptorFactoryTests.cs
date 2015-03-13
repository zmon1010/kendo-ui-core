namespace Kendo.Mvc.Infrastructure.Tests
{
    using System;
    using Xunit;

    public class FilterDescriptorFactoryTests
    {
        [Fact]
        public void Should_create_filter_descriptor()
        {
            var filterDescriptor = (FilterDescriptor)FilterDescriptorFactory.Create("age~eq~10")[0];

            filterDescriptor.Operator.ShouldEqual(FilterOperator.IsEqualTo);
            filterDescriptor.Member.ShouldEqual("age");
            Convert.ToInt32(filterDescriptor.Value).ShouldEqual(10);            
        }

        [Fact]
        public void Should_return_empty_list_when_input_is_null()
        {
            FilterDescriptorFactory.Create(null).Count.ShouldEqual(0);            
        }
    }
}
