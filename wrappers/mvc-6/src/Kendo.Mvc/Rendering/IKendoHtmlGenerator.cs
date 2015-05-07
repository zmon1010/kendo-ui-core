using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using System.Collections.Generic;

namespace Kendo.Mvc.Rendering
{
    public interface IKendoHtmlGenerator
    {
		TagBuilder GenerateColorInput(
			ViewContext viewContext,
			ModelMetadata metadata,
			string id,
			string name,
			object value,
			IDictionary<string, object> htmlAttributes);

        TagBuilder GenerateRangeInput(
            ViewContext viewContext,
            ModelMetadata metadata,
            string id,
            string name,
            object value,
            IDictionary<string, object> htmlAttributes);

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

        TagBuilder GenerateTimeInput(
            ViewContext viewContext,
            ModelMetadata metadata,
            string id,
            string name,
            object value,
            string format,
            IDictionary<string, object> htmlAttributes);

        TagBuilder GenerateNumericInput(
			ViewContext viewContext,
			ModelMetadata metadata,
			string id,
			string name,
			object value,
			string format,
			IDictionary<string, object> htmlAttributes);

		TagBuilder GenerateTextInput(
			ViewContext viewContext,
			ModelMetadata metadata,
			string id,
			string name,
			object value,
			string format,
			IDictionary<string, object> htmlAttributes);

		TagBuilder GenerateTag(
            string tagName,
            ViewContext viewContext,
            string id,
            string name,
            IDictionary<string, object> htmlAttributes);

        IDictionary<string, object> GetValidationAttributes(
            ViewContext viewContext,
            ModelMetadata metadata,
            string name);
    }
}
