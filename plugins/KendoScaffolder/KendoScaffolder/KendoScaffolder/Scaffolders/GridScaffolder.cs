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

        public Dictionary<string, object> CommonParameters { get; set; }
        public Dictionary<string, object> ControllerParameters { get; set; }
        public Dictionary<string, object> ViewParameters { get; set; }

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
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException("Invalid model configuration", ex);
            }

            ICodeTypeService codeTypeService = GetService<ICodeTypeService>();
            DbContext = codeTypeService.GetCodeType(context.ActiveProject, dbContextTypeName);
            // Get the dbContext namespace
            //string dbContextNamespace = dbContext.Namespace != null ? dbContext.Namespace.FullName : String.Empty;

            CommonParameters = GetCommonParameters();
        }

        private Dictionary<string, object> GetCommonParameters()
        {
            string viewName = (ViewModel.ViewName != String.Empty) ? ViewModel.ViewName : KendoConstants.DefaultGridViewName;
            string controllerName = (ViewModel.ControllerName != String.Empty) ? ViewModel.ControllerName : KendoConstants.DefaultGridControllerName;
            string controllerRootName = controllerName.Replace("Controller", "");
            string modelTypeVariable = GetTypeVariable(ModelType.Name);
            PropertyMetadata primaryKey = EfMetadata.PrimaryKeys.FirstOrDefault();
            //string pluralizedName = efMetadata.EntitySetName;
            //string modelNameSpace = modelType.Namespace != null ? modelType.Namespace.FullName : String.Empty;
            //string relativePath = string.Empty;

            var commonParameters = new Dictionary<string, object>()
            {
                {"ControllerName", controllerName},
                {"ControllerRootName" , controllerRootName},
                {"ExcelExport", ViewModel.ExcelExport},
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
                    return (ViewModel.EditMode == "InCell") ? "AjaxBatchController" : "AjaxController";
                case "Server":
                    return "ServerController";
                case "WebApi":
                    return "WebApiController";
                default:
                    return "";
            }
        }

        public Dictionary<string, object> GetControllerParameters()
        {
            var controllerParameters = new Dictionary<string, object>(CommonParameters);
            controllerParameters.Add("AreaName", GetAreaName(GetSelectionRelativePath()));
            controllerParameters.Add("ContextTypeName", DbContext.Name);
            controllerParameters.Add("ModelTypeName", ModelType.Name);
            controllerParameters.Add("Namespace", GetDefaultNamespace());
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
            return Path.Combine(GetSelectionRelativePath(), CommonParameters["ControllerName"].ToString());
        }

        public string GetViewPath()
        {
            string areaName = GetAreaName(GetSelectionRelativePath());
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
            return dataSourceType + "View";
        }

        protected string GetDefaultNamespace()
        {
            return Context.ActiveProjectItem == null
                ? Context.ActiveProject.GetDefaultNamespace()
                : Context.ActiveProjectItem.GetDefaultNamespace();
        }

        private string GetTypeVariable(string typeName)
        {
            return typeName.Substring(0, 1).ToLower() + typeName.Substring(1, typeName.Length - 1);
        }

        private ICodeTypeService GetService<T1>()
        {
            return (ICodeTypeService)Context.ServiceProvider.GetService(typeof(ICodeTypeService));
        }

        private string GetAreaName(string relativePath)
        {
            string[] dirs = relativePath.Split(new char[1] { '\\' });
            return dirs[0].Equals("Areas") ? dirs[1] : String.Empty;
        }

        private string GetSelectionRelativePath()
        {
            return Context.ActiveProjectItem == null ? String.Empty : GetProjectRelativePath(Context.ActiveProjectItem);
        }

        public static string GetProjectRelativePath(ProjectItem projectItem)
        {
            Project project = projectItem.ContainingProject;
            string projRelativePath = null;

            string rootProjectDir = project.GetFullPath();
            rootProjectDir = EnsureTrailingBackSlash(rootProjectDir);
            string fullPath = projectItem.GetFullPath();

            if (!String.IsNullOrEmpty(rootProjectDir) && !String.IsNullOrEmpty(fullPath))
            {
                projRelativePath = MakeRelativePath(fullPath, rootProjectDir);
            }

            return projRelativePath;
        }

        public static string EnsureTrailingBackSlash(string path)
        {
            if (path != null && !path.EndsWith(PathSeparator, StringComparison.Ordinal))
            {
                path += PathSeparator;
            }
            return path;
        }

        public static string MakeRelativePath(string fullPath, string basePath)
        {
            string tempBasePath = basePath;
            string tempFullPath = fullPath;
            StringBuilder relativePath = new StringBuilder();

            if (!tempBasePath.EndsWith(PathSeparator, StringComparison.OrdinalIgnoreCase))
            {
                tempBasePath += PathSeparator;
            }

            while (!String.IsNullOrEmpty(tempBasePath))
            {
                if (tempFullPath.StartsWith(tempBasePath, StringComparison.OrdinalIgnoreCase))
                {
                    relativePath.Append(fullPath.Remove(0, tempBasePath.Length));
                    if (String.Equals(relativePath.ToString(), PathSeparator, StringComparison.OrdinalIgnoreCase))
                    {
                        relativePath.Clear();
                    }
                    return relativePath.ToString();
                }
                else
                {
                    tempBasePath = tempBasePath.Remove(tempBasePath.Length - 1);
                    int lastIndex = tempBasePath.LastIndexOf(PathSeparator, StringComparison.OrdinalIgnoreCase);
                    if (-1 != lastIndex)
                    {
                        tempBasePath = tempBasePath.Remove(lastIndex + 1);
                        relativePath.Append("..");
                        relativePath.Append(PathSeparator);
                    }
                    else
                    {
                        return fullPath;
                    }
                }
            }

            return fullPath;
        }
    }
}
