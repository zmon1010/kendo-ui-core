using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KendoScaffolder.UI
{
    /// <summary>
    /// View model for code types so that it can be displayed on the UI.
    /// </summary>
    public class GridConfigurationViewModel
    {
        public CodeGenerationContext Context { get; private set; }

        public ModelType SelectedModelType { get; set; }
        public ModelType SelectedViewModelType { get; set; }
        public ModelType SelectedDbContextType { get; set; }
        public bool UseViewModel { get; set; }

        public string SelectedDataSourceType { get; set; }

        public string ControllerName { get; set; }

        public bool Editable { get; set; }
        public bool EditableCreate { get; set; }
        public bool EditableUpdate { get; set; }
        public bool EditableDestroy { get; set; }
        public string EditMode { get; set; }

        public bool ColumnMenu { get; set; }
        public bool Filterable { get; set; }
        public bool Groupable { get; set; }
        public bool Scrollable { get; set; }
        public bool Sortable { get; set; }
        
        public GridConfigurationViewModel(CodeGenerationContext context)
        {
            Context = context;
        }

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
                    .Select(codeType => new ModelType(codeType));
            }
        }

        public IEnumerable<string> DataSourceTypes
        {
            get
            {
                return new List<string> { "Ajax", "Server", "WebApi" };
            }
        }

        public IEnumerable<string> EditModes
        {
            get
            {
                return new List<string> { "InCell", "InLine", "PopUp" };
            }
        }
        //public IEnumerable<DataSourceType> DataSourceTypes
        //{
        //    get
        //    {
        //        return Enum.GetValues(typeof(DataSourceType)).Cast<DataSourceType>().ToList();
        //    }
        //}
    }
}
