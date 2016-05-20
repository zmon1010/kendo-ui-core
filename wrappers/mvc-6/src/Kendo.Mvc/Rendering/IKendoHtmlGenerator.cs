using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Kendo.Mvc.Rendering
{
    public interface IKendoHtmlGenerator
    {
        TagBuilder GenerateInput(
            ViewContext viewContext,
            ModelMetadata metadata,
            string id,
            string name,
            object value,
            string format,
            string type,
            IDictionary<string, object> htmlAttributes);

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

        TagBuilder GenerateMultiSelect(
            ViewContext viewContext,
            ModelMetadata metadata,
            string id,
            string name,
            IDictionary<string, object> htmlAttributes);

        TagBuilder GenerateTag(
            string tagName,
            ViewContext viewContext,
            string id,
            string name,
            IDictionary<string, object> htmlAttributes);

        TagBuilder GenerateTag(
            string tagName,
            IDictionary<string, object> htmlAttributes);

        IDictionary<string, object> GetValidationAttributes(
            ViewContext viewContext,
            ModelMetadata metadata,
            string name);

        string SanitizeId(string id);

        RangeAttribute GetRangeValidationAttribute(
            ViewContext viewContext,
            ModelMetadata metadata,
            string name);
    }
}
