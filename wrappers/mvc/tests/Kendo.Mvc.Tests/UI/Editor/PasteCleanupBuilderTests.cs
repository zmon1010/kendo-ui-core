using System;
using System.Linq;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
	public class PasteCleanupBuilderTests
	{
		private readonly EditorPasteCleanupSettings settings;
		private readonly EditorPasteCleanupSettingsBuilder builder;

		public PasteCleanupBuilderTests()
		{
			settings = new EditorPasteCleanupSettings();
			builder = new EditorPasteCleanupSettingsBuilder(settings);
		}

		[Fact]
		public void Set_All()
		{
			builder.All(true);
			settings.All.Value.ShouldBeTrue();
		}

		[Fact]
		public void Set_Css()
		{
			builder.Css(true);
			settings.Css.Value.ShouldBeTrue();
		}

		[Fact]
		public void Set_Custom()
		{
			builder.Custom("customCleanup");
			settings.Custom.ShouldEqual("customCleanup");
		}

		[Fact]
		public void Set_KeepNewLines()
		{
			builder.KeepNewLines(true);
			settings.KeepNewLines.Value.ShouldBeTrue();
		}

		[Fact]
		public void Set_MsAllFormatting()
		{
			builder.MsAllFormatting(true);
			settings.MsAllFormatting.Value.ShouldBeTrue();
		}

		[Fact]
		public void Set_MsConvertLists()
		{
			builder.MsConvertLists(true);
			settings.MsConvertLists.Value.ShouldBeTrue();
		}

		[Fact]
		public void Set_MsTags()
		{
			builder.MsTags(true);
			settings.MsTags.Value.ShouldBeTrue();
		}

		[Fact]
		public void Set_None()
		{
			builder.None(true);
			settings.None.Value.ShouldBeTrue();
		}

		[Fact]
		public void Set_Span()
		{
			builder.Span(true);
			settings.Span.Value.ShouldBeTrue();
		}
	}
}
