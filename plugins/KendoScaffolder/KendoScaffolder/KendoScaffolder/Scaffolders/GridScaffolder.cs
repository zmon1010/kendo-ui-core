using EnvDTE;
using KendoScaffolder.UI.Models;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using Microsoft.AspNet.Scaffolding.EntityFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Reflection;



namespace KendoScaffolder.Scaffolders
{
    public class GridScaffolder : IKendoWidgetScaffolder
    {
        public GridConfigurationViewModel ViewModel { get; set; }
        public CodeType ModelType { get; set; }
        public CodeType ViewModelType { get; set; }
        public CodeType DbContext { get; set; }
        public ModelMetadata EfMetadata { get; set; }
        public CodeGenerationContext Context { get; set; }
        public bool UseWidgetViewModel
        {
            get
            {
                return false;
            }
        }

        public Dictionary<string, object> CommonParameters { get; set; }
        public Dictionary<string, object> ControllerParameters { get; set; }
        public Dictionary<string, object> ViewParameters { get; set; }
        public Dictionary<string, Dictionary<string, string>> DataAnnotationAttributes { get; set; }

        private static readonly string PathSeparator = Path.DirectorySeparatorChar.ToString();

        public GridScaffolder(GridConfigurationViewModel viewModel, CodeGenerationContext context)
        {
            ViewModel = viewModel;
            Context = context;
            ModelType = viewModel.SelectedModelType.CodeType;
            ViewModelType = viewModel.UseViewModel ? viewModel.SelectedViewModelType.CodeType : null;

            // Ensure the Data Context
            string dbContextTypeName = viewModel.SelectedDbContextType.TypeName;
            IEntityFrameworkService efService = (IEntityFrameworkService)context.ServiceProvider.GetService(typeof(IEntityFrameworkService));

            try
            {
                EfMetadata = efService.AddRequiredEntity(context, dbContextTypeName, ModelType.FullName);
                DataAnnotationAttributes = GetDataAnnotations(ViewModelType);              
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException("Invalid model configuration", ex);
            }

            ICodeTypeService codeTypeService = KendoScaffolderUtils.GetService<ICodeTypeService>(Context);
            DbContext = codeTypeService.GetCodeType(context.ActiveProject, dbContextTypeName);
            // Get the dbContext namespace
            //string dbContextNamespace = dbContext.Namespace != null ? dbContext.Namespace.FullName : String.Empty;

            CommonParameters = GetCommonParameters();
        }
    
        private Dictionary<string, object> GetCommonParameters()
        {
            string viewName = (ViewModel.ViewName != String.Empty) ? ViewModel.ViewName : KendoConstants.DefaultViewName;
            string controllerName = (ViewModel.ControllerName != String.Empty) ? ViewModel.ControllerName : KendoConstants.DefaultGridControllerName;
            string controllerRootName = controllerName.Replace("Controller", "");
            string modelTypeVariable = KendoScaffolderUtils.GetTypeVariable(ModelType.Name);
            PropertyMetadata primaryKey = EfMetadata.PrimaryKeys.FirstOrDefault();
            //string pluralizedName = efMetadata.EntitySetName;
            //string modelNameSpace = modelType.Namespace != null ? modelType.Namespace.FullName : String.Empty;
            //string relativePath = string.Empty;

            var commonParameters = new Dictionary<string, object>()
            {
                {"ControllerName", controllerName},
                {"ControllerRootName" , controllerRootName},
                {"ExcelExport", ViewModel.ExcelExport},
                {"DataAnnotationAttributes", DataAnnotationAttributes},
                {"ModelVariable", modelTypeVariable},
                {"ModelMetadata", EfMetadata},
                {"PdfExport", ViewModel.PdfExport},
                {"PrimaryKeyMetadata", primaryKey},
                {"PrimaryKeyName", primaryKey.PropertyName},
                {"PrimaryKeyType", primaryKey.ShortTypeName},
                {"UseViewModel", ViewModel.UseViewModel},
                {"ViewName", viewName},
                {"ViewPrefix", ""}
            };

            return commonParameters;
        }

        public string GetControllerRootName()
        {
            return CommonParameters["ControllerRootName"].ToString();
        }

        public string GetControllerTemplate()
        {
            string dataSourceType = ViewModel.SelectedDataSourceType;

            switch (dataSourceType)
            {
                case "Ajax":
                    return "Grid" + ((ViewModel.EditMode == "InCell") ? "AjaxBatchController" : "AjaxController");
                case "Server":
                    return "GridServerController";
                case "WebApi":
                    return "GridWebApiController";
                default:
                    return "";
            }
        }

        public Dictionary<string, object> GetControllerParameters()
        {
            var controllerParameters = new Dictionary<string, object>(CommonParameters);
            controllerParameters.Add("AreaName", KendoScaffolderUtils.GetAreaName(KendoScaffolderUtils.GetSelectionRelativePath(Context)));
            controllerParameters.Add("ContextTypeName", DbContext.Name);
            controllerParameters.Add("ModelTypeName", ModelType.Name);
            controllerParameters.Add("Namespace", KendoScaffolderUtils.GetDefaultNamespace(Context));
            controllerParameters.Add("RequiredNamespaces", new HashSet<string>() { ModelType.Namespace.FullName });

            if (ViewModel.UseViewModel)
            {
                controllerParameters.Add("ViewModelTypeName", ViewModelType.Name);
                controllerParameters.Add("ViewModelTypeChildren", ViewModelType.Children);
            }

            if (ViewModel.Editable)
            {
                controllerParameters.Add("EditMode", ViewModel.EditMode);
                controllerParameters.Add("EditableCreate", ViewModel.EditableCreate);
                controllerParameters.Add("EditableUpdate", ViewModel.EditableUpdate);
                controllerParameters.Add("EditableDestroy", ViewModel.EditableDestroy);
            }

            return controllerParameters;
        }

        public Dictionary<string, object> GetViewParameters()
        {
            string viewDataTypeName = ModelType.Namespace.FullName + "." + ModelType.Name;

            if (ViewModel.UseViewModel && ViewModelType != null)
            {
                viewDataTypeName = ViewModelType.Namespace.FullName + "." + ViewModelType.Name;
            }

            var viewParameters = new Dictionary<string, object>(CommonParameters);

            viewParameters.Add("ColumnMenu", ViewModel.ColumnMenu);
            viewParameters.Add("Editable", ViewModel.Editable);
            viewParameters.Add("Filterable", ViewModel.Filterable);
            viewParameters.Add("IsBundleConfigPresent", true);
            viewParameters.Add("IsLayoutPageSelected", true);
            viewParameters.Add("IsPartialView", false);
            viewParameters.Add("LayoutPageFile", "");
            viewParameters.Add("Navigatable", ViewModel.Navigatable);
            viewParameters.Add("Pageable", ViewModel.Pageable);
            viewParameters.Add("Reorderable", ViewModel.Reorderable);
            viewParameters.Add("Scrollable", ViewModel.Scrollable);
            viewParameters.Add("Selectable", ViewModel.Selectable);
            viewParameters.Add("Sortable", ViewModel.Sortable);
            viewParameters.Add("ViewDataTypeName", viewDataTypeName);
            viewParameters.Add("GridEvents", ViewModel.SelectedGridEvents);
            viewParameters.Add("ServerOperation", ViewModel.ServerOperation);

            if (ViewModel.UseViewModel)
            {
                viewParameters.Add("ViewModelTypeChildren", ViewModelType.Children);
            }

            if (ViewModel.Editable)
            {
                viewParameters.Add("EditMode", ViewModel.EditMode);
                viewParameters.Add("EditableCreate", ViewModel.EditableCreate);
                viewParameters.Add("EditableUpdate", ViewModel.EditableUpdate);
                viewParameters.Add("EditableDestroy", ViewModel.EditableDestroy);
            }

            if (ViewModel.Filterable)
            {
                viewParameters.Add("FilterMode", ViewModel.FilterMode);
            }

            if (ViewModel.Selectable)
            {
                viewParameters.Add("SelectionMode", ViewModel.SelectionMode);
                viewParameters.Add("SelectionType", ViewModel.SelectionType);
            }

            if (ViewModel.Sortable)
            {
                viewParameters.Add("AllowUnsort", ViewModel.AllowUnsort);
                viewParameters.Add("SortMode", ViewModel.SortMode);
            }

            return viewParameters;
        }

        public string GetControllerPath()
        {
            return Path.Combine(KendoScaffolderUtils.GetSelectionRelativePath(Context), CommonParameters["ControllerName"].ToString());
        }

        public string GetViewPath()
        {
            string areaName = KendoScaffolderUtils.GetAreaName(KendoScaffolderUtils.GetSelectionRelativePath(Context));
            string viewPath = Path.Combine("Views",
                                   CommonParameters["ControllerRootName"].ToString(),
                                   CommonParameters["ViewName"].ToString());

            if (areaName != String.Empty)
            {
                viewPath = Path.Combine("Areas", areaName, viewPath);
            }

            return viewPath;
        }

        public string GetViewTemplate()
        {
            string dataSourceType = ViewModel.SelectedDataSourceType;

            if (ViewModel.ViewType == ViewType.Web)
            {
                return "Grid" + dataSourceType + "WebView";
            }

            return "Grid" + dataSourceType + "View";
        }

        public string GetWidgetViewModelPath()
        {
            throw new NotSupportedException();
        }

        public string GetWidgetViewModelTemplate()
        {
            throw new NotSupportedException();
        }

        public Dictionary<string, object> GetWidgetViewModelParameters()
        {
            throw new NotSupportedException();
        }

        private TService GetService<TService>() where TService : class
        {
            return (TService)Context.ServiceProvider.GetService(typeof(TService));
        }


        private Type GetReflectionType(string typeName)
        {
            return GetService<IReflectedTypesService>().GetType(Context.ActiveProject, typeName);
        }

        protected Dictionary<string, Dictionary<string, string>> GetDataAnnotations(CodeType modelType)
        {
            var attributes = new Dictionary<string, Dictionary<string, string>>();
            if (modelType != null)
            {
                var type = GetReflectionType(modelType.FullName);
                foreach (PropertyInfo prop in type.GetProperties())
                {
                    var parsedAttributes = GetAttributes(prop);
                    attributes.Add(prop.Name, parsedAttributes);
                }
            }
            return attributes;
        }

        private Dictionary<string, string> GetAttributes(PropertyInfo prop)
        {
            var customAttributes = prop.CustomAttributes;
            var attributes = new Dictionary<string, Dictionary<string, string>>();
            var options = new Dictionary<string, string>();
            foreach (var attribute in customAttributes)
            {
                string attributeName = attribute.AttributeType.Name;

                if (attributeName == "DisplayAttribute")
                {
                    foreach (var arg in attribute.NamedArguments)
                    {
                        if (arg.MemberName.ToString() == "Name")
                        {
                            options.Add(arg.MemberName.ToString(), arg.TypedValue.Value.ToString());
                        }
                    }
                    continue;
                }

                if (attributeName == "RequiredAttribute")
                {
                    options.Add("required", "true");
                    continue;
                }

                if (attributeName == "RangeAttribute")
                {
                    var min = attribute.ConstructorArguments.ElementAt(0).Value.ToString();
                    var max = attribute.ConstructorArguments.ElementAt(1).Value.ToString();
                    options.Add("min", min);
                    options.Add("max", max);
                    continue;
                }

                if (attributeName == "ScaffoldColumnAttribute")
                {
                    options.Add("scaffold", attribute.ConstructorArguments.First().Value.ToString().ToLower());
                    continue;
                }

                if (attributeName == "RegularExpressionAttribute")
                {
                    options.Add("pattern", attribute.ConstructorArguments.First().Value.ToString());
                }
            }
            options.Add("type", GetDataType(prop));
            return options;
        }

        private string GetDataType(PropertyInfo prop)
        {
            var dataType = prop.PropertyType.Name;
            switch (dataType)
            {
                case "String": return "string";
                case "Boolean": return "boolean";
                case "DateTime": return "date";
                default: return "number";
            }
        }
    }
}
