using System;
using System.IO;
using Microsoft.AspNet.Mvc.Razor;
using Microsoft.Extensions.WebEncoders;

namespace Kendo.Mvc.Extensions
{
    public static class TextWriterExtensions
    {
        public static void WriteContent<T>(this TextWriter writer, Func<T, object> action, IHtmlEncoder htmlEncoder, T dataItem = null, bool htmlEncode = false) where T : class
		{
			var result = action(dataItem);

			var helperResult = result as HelperResult;

			if (helperResult != null)
			{
				helperResult.WriteTo(writer, htmlEncoder);
				return;
			}

			if (result != null)
			{
                if (htmlEncode)
                {
                    writer.Write(htmlEncoder.HtmlEncode(result.ToString()));
                }
                else
                {
                    writer.Write(result.ToString());
                }
			}
		} 
    }
}