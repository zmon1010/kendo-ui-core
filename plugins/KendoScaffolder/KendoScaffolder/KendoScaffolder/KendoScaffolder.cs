using EnvDTE;
using EnvDTE80;
using KendoScaffolder.UI;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using Microsoft.AspNet.Scaffolding.EntityFramework;
using Microsoft.VisualStudio.Shell;
using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace KendoScaffolder
{
    public class KendoScaffolder : CodeGenerator
    {
        GridConfigurationViewModel _viewModel;
        Dictionary<string, object> CommonParameters { get; set; }
        Dictionary<string, object> ControllerParameters { get; set; }
        Dictionary<string, object> ViewParameters { get; set; }

        public static readonly string PathSeparator = Path.DirectorySeparatorChar.ToString();

        /// <summary>
        /// Constructor for the custom code generator
        /// </summary>
        /// <param name="context">Context of the current code generation operation based on how scaffolder was invoked(such as selected project/folder) </param>
        /// <param name="information">Code generation information that is defined in the factory class.</param>
        public KendoScaffolder(CodeGenerationContext context, CodeGeneratorInformation information)
            : base(context, information)
        {
            _viewModel = new GridConfigurationViewModel(Context);
            //CommonParameters = new Dictionary<string, object>();
            //ControllerParameters = new Dictionary<string, object>();
            //ViewParameters = new Dictionary<string, object>();
        }

        /// <summary>
        /// Any UI to be displayed after the scaffolder has been selected from the Add Scaffold dialog.
        /// Any validation on the input for values in the UI should be completed before returning from this method.
        /// </summary>
        /// <returns></returns>
        public override bool ShowUIAndValidate()
        {
            GridConfigurationWindow window = new GridConfigurationWindow(_viewModel);
            bool? showDialog = window.ShowDialog();

            //GridConfigurationViewModel a = (GridConfigurationViewModel)window.DataContext;
            //_viewModel.SelectedGridEvents = 

            return showDialog ?? false;
        }

        private void BuildControllerParameters(CodeType modelType, CodeType viewModelType, bool useViewModel, bool editable, 
                                               string editMode, string areaName, string controllerName, string dbContextName)
        {
            ControllerParameters = new Dictionary<string, object>(CommonParameters);
            ControllerParameters.Add("AreaName", areaName);
            ControllerParameters.Add("ContextTypeName", dbContextName);
            ControllerParameters.Add("ModelTypeName", modelType.Name);
            ControllerParameters.Add("Namespace", GetDefaultNamespace());
            ControllerParameters.Add("RequiredNamespaces", new HashSet<string>() { modelType.Namespace.FullName });

            if (useViewModel)
            {
                ControllerParameters.Add("ViewModelTypeName", viewModelType.Name);
                ControllerParameters.Add("ViewModelTypeChildren", viewModelType.Children);
            }

            if (editable)
            {
                ControllerParameters.Add("EditMode", editMode);
                ControllerParameters.Add("EditableCreate", _viewModel.EditableCreate);
                ControllerParameters.Add("EditableUpdate", _viewModel.EditableUpdate);
                ControllerParameters.Add("EditableDestroy", _viewModel.EditableDestroy);
            }
        }

        private void BuildProject(Project project)
        {
            var dte = Package.GetGlobalService(typeof(DTE)) as DTE2;
            var config = dte.Solution.SolutionBuild.ActiveConfiguration.Name;
            dte.Solution.SolutionBuild.BuildProject(config, project.FullName, true);
        }

        public override void GenerateCode()
        {
            CodeType modelType = _viewModel.SelectedModelType.CodeType;
            bool useViewModel = _viewModel.UseViewModel;
            CodeType viewModelType = useViewModel ? _viewModel.SelectedViewModelType.CodeType : null;

            BuildProject(Context.ActiveProject);

            // Ensure the Data Context
            string dbContextTypeName = _viewModel.SelectedDbContextType.TypeName;
            IEntityFrameworkService efService = (IEntityFrameworkService)Context.ServiceProvider.GetService(typeof(IEntityFrameworkService));
            ModelMetadata efMetadata = null;
            try
            {
                efMetadata = efService.AddRequiredEntity(Context, dbContextTypeName, modelType.FullName);
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException("Invalid model configuration", ex);
            }

            ICodeTypeService codeTypeService = GetService<ICodeTypeService>();
            CodeType dbContext = codeTypeService.GetCodeType(Context.ActiveProject, dbContextTypeName);

            // Get the dbContext namespace
            //string dbContextNamespace = dbContext.Namespace != null ? dbContext.Namespace.FullName : String.Empty;

            PropertyMetadata primaryKey = efMetadata.PrimaryKeys.FirstOrDefault();
            string pluralizedName = efMetadata.EntitySetName;
            string modelNameSpace = modelType.Namespace != null ? modelType.Namespace.FullName : String.Empty;
            string relativePath = string.Empty;

            string modelTypeVariable = GetTypeVariable(modelType.Name);

            string areaName = GetAreaName(GetSelectionRelativePath());
            string controllerName = (_viewModel.ControllerName != String.Empty) ? _viewModel.ControllerName : KendoConstants.DefaultGridControllerName;
            string controllerRootName = controllerName.Replace("Controller", "");
            string viewName = (_viewModel.ViewName != String.Empty) ? _viewModel.ViewName : KendoConstants.DefaultGridViewName;
            string editMode = _viewModel.EditMode;
            bool editable = _viewModel.Editable;

            CommonParameters = new Dictionary<string, object>() 
            {
                {"ControllerName", controllerName},
                {"ControllerRootName" , controllerRootName},
                {"ExcelExport", _viewModel.ExcelExport},
                {"ModelVariable", modelTypeVariable},
                {"ModelMetadata", efMetadata},
                {"PdfExport", _viewModel.PdfExport},
                {"PrimaryKeyMetadata", primaryKey},
                {"PrimaryKeyName", primaryKey.PropertyName},
                {"PrimaryKeyType", primaryKey.ShortTypeName},
                {"UseViewModel", useViewModel},
                {"ViewName", viewName},
                {"ViewPrefix", ""}
            };

            try
            {
                BuildControllerParameters(modelType, viewModelType, useViewModel, editable, editMode, areaName, controllerName, dbContext.Name);
                string controllerTemplate = DetermineControllerTemplate(editMode);
                string controllerPath = DetermineControllerPath(controllerName, areaName);

                BuildViewParameters(modelType, viewModelType, useViewModel, editable, editMode);
                string viewPath = BuildViewPath(areaName, controllerRootName, viewName);
                string viewTemplate = DetermineViewTemplate();

                this.AddFileFromTemplate(Context.ActiveProject, controllerPath, controllerTemplate, ControllerParameters, skipIfExists: false);
                this.AddFolder(Context.ActiveProject, Path.Combine("Views", controllerRootName));
                this.AddFileFromTemplate(Context.ActiveProject, viewPath, viewTemplate, ViewParameters, skipIfExists: false);
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException("An unknown error occurred during generation", ex);
            }
        }

        private string DetermineControllerTemplate(string editMode)
        {
            string dataSourceType = _viewModel.SelectedDataSourceType;

            switch (dataSourceType)
            {
                case "Ajax":
                    return (editMode == "InCell") ? "AjaxBatchController" : "AjaxController";
                case "Server":
                    return "ServerController";
                case "WebApi":
                    return "WebApiController";
                default:
                    return "";
            }
        }

        private string DetermineControllerPath(string controllerName, string areaName)
        {
            string controllerPath = Path.Combine("Controllers", controllerName);
            if (areaName != String.Empty)
            {
                controllerPath = Path.Combine("Areas", areaName, controllerPath);
            }

            return controllerPath;
        }

        private void BuildViewParameters(CodeType modelType, CodeType viewModelType, bool useViewModel, bool editable,string editMode)
        {
            bool filterable = _viewModel.Filterable;
            bool scrollable = _viewModel.Scrollable;
            bool selectable = _viewModel.Selectable;
            bool sortable = _viewModel.Sortable;
            string viewDataTypeName = modelType.Namespace.FullName + "." + modelType.Name;

            if (useViewModel && viewModelType != null)
            {
                viewDataTypeName = viewModelType.Namespace.FullName + "." + viewModelType.Name;
            }

            ViewParameters = new Dictionary<string, object>(CommonParameters);
            ViewParameters.Add("ColumnMenu", _viewModel.ColumnMenu);
            ViewParameters.Add("Editable", editable);
            ViewParameters.Add("Filterable", filterable);
            ViewParameters.Add("IsBundleConfigPresent", true);
            ViewParameters.Add("IsLayoutPageSelected", true);
            ViewParameters.Add("IsPartialView", false);
            ViewParameters.Add("LayoutPageFile", "");
            ViewParameters.Add("Navigatable", _viewModel.Navigatable);
            ViewParameters.Add("Pageable", _viewModel.Pageable);
            ViewParameters.Add("Reorderable", _viewModel.Reorderable);
            ViewParameters.Add("Scrollable", scrollable);
            ViewParameters.Add("Selectable", selectable);
            ViewParameters.Add("Sortable", sortable);
            ViewParameters.Add("ViewDataTypeName", viewDataTypeName);
            ViewParameters.Add("GridEvents", _viewModel.SelectedGridEvents);

            if (useViewModel)
            {
                ViewParameters.Add("ViewModelTypeChildren", viewModelType.Children);
            }

            if (editable)
            {
                ViewParameters.Add("EditMode", editMode);
                ViewParameters.Add("EditableCreate", _viewModel.EditableCreate);
                ViewParameters.Add("EditableUpdate", _viewModel.EditableUpdate);
                ViewParameters.Add("EditableDestroy", _viewModel.EditableDestroy);
            }

            if (filterable)
            {
                ViewParameters.Add("FilterMode", _viewModel.FilterMode);
            }

            if (selectable)
            {
                ViewParameters.Add("SelectionMode", _viewModel.SelectionMode);
                ViewParameters.Add("SelectionType", _viewModel.SelectionType);
            }

            if (sortable)
            {
                ViewParameters.Add("SortMode", _viewModel.SortMode);
            }
        }

        private string BuildViewPath(string areaName, string controllerRootName, string viewName)
        {
            string viewPath = Path.Combine("Views", controllerRootName, viewName);

            if (areaName != String.Empty)
	        {
                viewPath = Path.Combine("Areas", areaName, viewPath);
	        }

            return viewPath;
        }

        private string DetermineViewTemplate()
        {
            string dataSourceType = _viewModel.SelectedDataSourceType;
            return dataSourceType + "View";
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

        protected string GetSelectionRelativePath()
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
    }
}
