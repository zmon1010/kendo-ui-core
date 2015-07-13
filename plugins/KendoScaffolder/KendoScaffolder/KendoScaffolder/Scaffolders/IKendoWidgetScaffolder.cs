using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.Scaffolders
{
    public interface IKendoWidgetScaffolder
    {
        Dictionary<string, object> GetControllerParameters();

        string GetControllerPath();

        string GetControllerRootName();

        string GetControllerTemplate();

        Dictionary<string, object> GetViewParameters();

        string GetViewPath();

        string GetViewTemplate();

        bool UseWidgetViewModel { get; }

        string GetWidgetViewModelPath();

        string GetWidgetViewModelTemplate();

        Dictionary<string, object> GetWidgetViewModelParameters();
    }
}
