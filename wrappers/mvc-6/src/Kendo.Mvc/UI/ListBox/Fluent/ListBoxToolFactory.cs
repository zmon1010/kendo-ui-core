using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    public partial class ListBoxToolFactory
    {
        protected IList<string> Container { get; private set; }

        public ListBoxToolFactory(IList<string> container)
        {
            Container = container;
        }
    }
}
