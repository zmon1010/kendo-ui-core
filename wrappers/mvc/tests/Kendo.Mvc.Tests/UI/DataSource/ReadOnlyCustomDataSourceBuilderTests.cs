namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using Xunit;

    public class ReadOnlyCustomDataSourceBuilderTests
    {
        private readonly DataSource dataSource;
        private readonly ReadOnlyCustomDataSourceBuilder builder;

        public ReadOnlyCustomDataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new ReadOnlyCustomDataSourceBuilder(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Group_method_sets_groups()
        {
            string fieldName = "FieldName";
            System.Type type = typeof(string);

            builder.Group(group => group.Add(fieldName, type));

            List<GroupDescriptor> groups = (List<GroupDescriptor>)dataSource.Groups;
            GroupDescriptor currentGroup = groups.ElementAt(0);

            currentGroup.Member.ShouldBeSameAs(fieldName);
            currentGroup.MemberType.ShouldBeSameAs(type);
        }
    }
}
