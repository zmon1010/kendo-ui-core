using Microsoft.AspNet.Scaffolding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.UI.Models
{
    public abstract class WidgetConfigurationViewModel
    {
        public CodeGenerationContext Context { get; private set; }
        
        public string ControllerName { get; set; }
        public string ViewName { get; set; }

        public WidgetConfigurationViewModel(CodeGenerationContext context)
        {
            Context = context;
            ViewName = "Index";
            //ControllerName
        }
    }
}
