using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI
{
    public enum DataSourceType
    {
        Ajax, Server, WebApi
    }

    public class DataSourceConfigurationViewModel
    {
        private DataSourceType Type { get; set; }
    }
}
