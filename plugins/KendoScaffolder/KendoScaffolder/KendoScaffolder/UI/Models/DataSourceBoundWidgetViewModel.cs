using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.EntityFramework;

namespace KendoScaffolder.UI.Models
{
    public abstract class DataSourceBoundWidgetViewModel : WidgetConfigurationViewModel
    {
        public virtual ModelType SelectedModelType { get; set; }
        public virtual ModelType SelectedViewModelType { get; set; }
        public virtual ModelType SelectedDbContextType { get; set; }
        public virtual bool UseViewModel { get; set; }

        public DataSourceBoundWidgetViewModel(CodeGenerationContext context)
            :base(context)
        { }

        /// <summary>
        /// This gets all the Model types from the active project.
        /// </summary>
        public IEnumerable<ModelType> ModelTypes
        {
            get
            {
                ICodeTypeService codeTypeService = (ICodeTypeService)Context
                    .ServiceProvider.GetService(typeof(ICodeTypeService));

                return codeTypeService
                    .GetAllCodeTypes(Context.ActiveProject)
                    .Where(codeType => codeType.IsValidWebProjectEntityType())
                    .OrderBy(codeType => codeType.Name)
                    .Select(codeType => new ModelType(codeType));
            }
        }

        /// <summary>
        /// This gets all the Model types from the active project.
        /// </summary>
        public IEnumerable<ModelType> DbContextTypes
        {
            get
            {
                ICodeTypeService codeTypeService = (ICodeTypeService)Context
                    .ServiceProvider.GetService(typeof(ICodeTypeService));

                return codeTypeService
                    .GetAllCodeTypes(Context.ActiveProject)
                    .Where(codeType => codeType.IsValidDbContextType())
                    .OrderBy(codeType => codeType.Name)
                    .Select(codeType => new ModelType(codeType));
            }
        }
    }
}
