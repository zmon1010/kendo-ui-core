using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent.Tests
{
    public class TreeMapFactoryTests
    {
        private readonly TreeMap treeMap;
        private readonly TreeMapColorRangeFactory factory;

        public TreeMapFactoryTests()
        {
            treeMap = new TreeMap(TestHelper.CreateViewContext());
            factory = new TreeMapColorRangeFactory(treeMap);
        }

        [Fact]
        public void ColorRanges_are_set_by_factory()
        {
            factory.AddRange("red", "green");

            treeMap.ColorRanges.ShouldEqual(new List<string[]>() { new string[] { "red", "green"} });
        }
    }
}