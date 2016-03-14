using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Kendo.Mvc.UI.Tests;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class TreeMapSerializationTests
    {
        private readonly TreeMap treeMap;
        private readonly StringBuilder output;
        private readonly TextWriter textWriter;

        public TreeMapSerializationTests()
        {
            treeMap = TreeMapTestHelper.CreateTreeMap();
            output = new StringBuilder();
            textWriter = new StringWriter(output);
        }

        [Fact]
        public void Default_configuration_outputs_empty_kendoTreeMap()
        {
            treeMap.Name = "TreeMap";
            treeMap.WriteInitializationScript(textWriter);

            output.ToString().ShouldContain("jQuery(\"#TreeMap\").kendoTreeMap({});");
        }

        [Fact]
        public void Colors_are_serialized()
        {
            treeMap.Colors = new string[] { "red", "green", "blue" };

            treeMap.WriteInitializationScript(textWriter);

            output.ToString().ShouldContain("{\"colors\":[\"red\",\"green\",\"blue\"]}");
        }

        [Fact]
        public void ColorRanges_are_serialized_as_colors()
        {
            treeMap.ColorRanges = new List<string[]>() { new string[] { "red", "green", "blue" } };

            treeMap.WriteInitializationScript(textWriter);

            output.ToString().ShouldContain("{\"colors\":[[\"red\",\"green\",\"blue\"]]}");
        }

        [Fact]
        public void Colors_are_serialized_over_colorRanges()
        {
            treeMap.Colors = new string[] { "red", "green", "blue" };
            treeMap.ColorRanges = new List<string[]>() { new string[] { "yellow " } };

            treeMap.WriteInitializationScript(textWriter);

            output.ToString().ShouldContain("{\"colors\":[\"red\",\"green\",\"blue\"]}");
        }

        [Fact]
        public void Type_is_serialized()
        {
            treeMap.Type = TreeMapType.Squarified;

            treeMap.WriteInitializationScript(textWriter);

            output.ToString().ShouldContain("{\"type\":\"squarified\"}");
        }
    }
}