namespace Kendo.Mvc.UI.Fluent
{
    using Microsoft.AspNet.Mvc;

    public class ReadOnlyCustomDataSourceTransportBuilder : CustomDataSourceTransportBuilderBase<ReadOnlyCustomDataSourceTransportBuilder>, IHideObjectMembers
    {
        public ReadOnlyCustomDataSourceTransportBuilder(Transport transport, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(transport, viewContext, urlGenerator)
        { 
        }
    }
}
