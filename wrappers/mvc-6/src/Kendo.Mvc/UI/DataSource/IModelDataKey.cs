namespace Kendo.Mvc.UI
{    
    using Microsoft.AspNet.Mvc.Rendering;

    public interface IModelDataKey<T> : IDataKey
            where T : class
    {
        string HiddenFieldHtml(IHtmlHelper<T> htmlHelper);
    }
}
