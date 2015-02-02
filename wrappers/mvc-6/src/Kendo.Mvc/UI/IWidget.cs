using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding;

namespace Kendo.Mvc.UI
{
    public interface IWidget : IHtmlAttributesContainer
    {
        string Id { get; }

        string Name { get; }

        ModelMetadata ModelMetadata { get; }

        ViewContext ViewContext { get; }
    }
}
