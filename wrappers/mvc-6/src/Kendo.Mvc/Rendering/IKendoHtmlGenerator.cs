using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using System.Collections.Generic;

namespace Kendo.Mvc.Rendering
{
    public interface IKendoHtmlGenerator
    {
		TagBuilder GenerateDateInput(
			ViewContext viewContext,
			ModelMetadata metadata,
			string id,
			string name,
			object value,
			string format,
			IDictionary<string, object> htmlAttributes);

		TagBuilder GenerateDateTimeInput(
			ViewContext viewContext,
			ModelMetadata metadata,
			string id,
			string name,
			object value,
			string format,
			IDictionary<string, object> htmlAttributes);
	}
}