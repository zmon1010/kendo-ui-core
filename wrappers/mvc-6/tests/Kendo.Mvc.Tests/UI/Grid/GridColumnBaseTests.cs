namespace Kendo.Mvc.UI.Tests
{
	using System.Web;
	using Kendo.Mvc.Tests;
	using Moq;
	using Xunit;

	public class GridColumnBaseTests
    {
        private readonly Grid<Customer> grid;
        private readonly Mock<GridColumnBase<Customer>> column;

        public GridColumnBaseTests()
        {
            grid = new Grid<Customer>(TestHelper.CreateViewContext());
            column = new Mock<GridColumnBase<Customer>>(grid)
            {
                CallBase = true
            };
        } 

        [Fact]
        public void ClientTemplate_should_decode_encoded_values()
        {
            column.Object.ClientTemplate = HttpUtility.UrlEncode("#=baz#");

            var json = column.Object.ToJson();

            json["template"].ShouldEqual("#=baz#");
        }

        [Fact]
        public void Should_serialize_encoded_false()
        {
            column.Object.Encoded = false;

            var json = column.Object.ToJson();

            json["encoded"].ShouldEqual(false);
        }

        [Fact]
        public void Should_serialize_locked_true()
        {
            column.Object.Locked = true;

            var json = column.Object.ToJson();

            json["locked"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_locked_false()
        {
            column.Object.Locked = false;

            var json = column.Object.ToJson();

            json.ContainsKey("locked").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_lockable_true()
        {
            column.Object.Lockable = true;

            var json = column.Object.ToJson();

            json.ContainsKey("lockable").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_lockable_false()
        {
            column.Object.Lockable = false;

            var json = column.Object.ToJson();

            json["lockable"].ShouldEqual(false);
        }
    }
}