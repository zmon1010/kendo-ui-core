using System;
using System.IO;
using Microsoft.AspNet.Mvc.Razor;

namespace Kendo.Mvc.Extensions
{
    public static class TextWriterExtensions
    {
        public static void WriteContent<T>(this TextWriter writer, Func<T, object> action, T dataItem = null) where T : class
		{
			var result = action(dataItem);

			var helperResult = result as HelperResult;

			if (helperResult != null)
			{
				helperResult.WriteTo(writer);
				return;
			}

			if (result != null)
			{
				writer.Write(result.ToString());
			}
		} 
    }
}