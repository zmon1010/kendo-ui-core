namespace Kendo.Mvc.UI.Html.Tests
{
	using Kendo.Mvc.Tests;
	using System;

	public class ColorPickerTestHelper
    {
		static public ColorPicker CreateColorPicker()
		{
			return new ColorPicker(TestHelper.CreateViewContext());
		}
	}
}