using EnvDTE;
using KendoScaffolder.UI;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using Microsoft.AspNet.Scaffolding.EntityFramework;
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
            return showDialog ?? false;
        }
        
        public override void GenerateCode()
        {

            var modelType = _viewModel.SelectedModelType.CodeType;
            bool useViewModel = _viewModel.UseViewModel;
            bool editable = _viewModel.Editable;

            CodeType viewModelType = null;

            if (useViewModel)
            {
                //validation for SelectedViewModelType
                viewModelType = _viewModel.SelectedViewModelType.CodeType;
            }

            // Ensure the Data Context
            string dbContextTypeName = _viewModel.SelectedDbContextType.TypeName;
            IEntityFrameworkService efService = (IEntityFrameworkService)Context.ServiceProvider.GetService(typeof(IEntityFrameworkService));
            
            
            ModelMetadata efMetadata = efService.AddRequiredEntity(Context, dbContextTypeName, modelType.FullName);


            // Get the dbContext
            ICodeTypeService codeTypeService = GetService<ICodeTypeService>();
            CodeType dbContext = codeTypeService.GetCodeType(Context.ActiveProject, dbContextTypeName);

            // Get the dbContext namespace
            string dbContextNamespace = dbContext.Namespace != null ? dbContext.Namespace.FullName : String.Empty;

            // Get the primary key of the model
            PropertyMetadata primaryKey = efMetadata.PrimaryKeys.FirstOrDefault();
            string pluralizedName = efMetadata.EntitySetName;
            string modelNameSpace = modelType.Namespace != null ? modelType.Namespace.FullName : String.Empty;
            string relativePath = string.Empty;

            var defaultNamespace = GetDefaultNamespace();
            string modelTypeVariable = GetTypeVariable(modelType.Name);
            string bindAttributeIncludeText = GetBindAttributeIncludeText(efMetadata);

            string areaName = GetAreaName(GetSelectionRelativePath());
            string controllerName = _viewModel.ControllerName;
            string controllerRootName = controllerName.Replace("Controller", "");
            string controllerPath = Path.Combine("Controllers", controllerName) ;
            
            if(areaName != String.Empty) {
                controllerPath = Path.Combine("Areas", areaName, controllerPath);
            }

            Dictionary<string, object> controllerParameters = new Dictionary<string, object>(){
                {"AreaName", areaName},
                {"BindAttributeIncludeText", bindAttributeIncludeText}, 
                {"ContextTypeName", dbContext.Name},
                {"ControllerName", controllerName }, 
                {"ControllerRootName" , controllerRootName},
                {"IsOverpostingProtectionRequired", true}, 
                {"ModelTypeName", modelType.Name},
                {"ModelVariable", modelTypeVariable},
                {"ModelMetadata", efMetadata},
                {"Namespace", defaultNamespace},
                {"OverpostingWarningMessage", "To protect from overposting attacks, please enable the specific properties you want to bind to, for more details see http://go.microsoft.com/fwlink/?LinkId=317598."}, 
                {"PrimaryKeyMetadata", primaryKey},
                {"PrimaryKeyName", primaryKey.PropertyName},
                {"PrimaryKeyType", primaryKey.ShortTypeName},
                {"RequiredNamespaces", new HashSet<string>(){modelType.Namespace.FullName}}, 
                {"UseAsync", false}, 
                {"UseViewModel", useViewModel},
                {"ViewPrefix", ""}
            };

            string editMode = _viewModel.EditMode;

            if (useViewModel)
            {
                controllerParameters.Add("ViewModelTypeName", viewModelType.Name);
                controllerParameters.Add("ViewModelTypeChildren", viewModelType.Children);
            }

            if (editable)
            {
                controllerParameters.Add("EditMode", editMode);
                controllerParameters.Add("EditableCreate", _viewModel.EditableCreate);
                controllerParameters.Add("EditableUpdate", _viewModel.EditableUpdate);
                controllerParameters.Add("EditableDestroy", _viewModel.EditableDestroy);
            }

            var dataSourceType = _viewModel.SelectedDataSourceType;

            string controllerTemplate = string.Empty;
            switch (dataSourceType)
            {
                case "Ajax":
                    controllerTemplate = (editMode == "InCell") ? "AjaxBatchController" : "AjaxController";
                    break;
                case "Server":
                    controllerTemplate = "ServerController";
                    break;
                case "WebApi":
                    controllerTemplate = "WebApiController";
                    break;
                default:
                    break;
            }

            // Generate Controller
            // TODO output path?
            this.AddFileFromTemplate(Context.ActiveProject, controllerPath, controllerTemplate, controllerParameters, skipIfExists: false);

            // Generate View
            string viewDataTypeName = modelType.Namespace.FullName + "." + modelType.Name;

            if (useViewModel && viewModelType != null)
            {
                viewDataTypeName = viewModelType.Namespace.FullName + "." + viewModelType.Name;
            }

            Dictionary<string, object> viewParameters = new Dictionary<string, object>(){
                {"ControllerRootName" , controllerRootName},
                {"Editable", editable},
                {"IsBundleConfigPresent", true},
                {"IsLayoutPageSelected", true}, 
                {"IsPartialView" , false},
                {"LayoutPageFile", ""},
                {"ModelMetadata", efMetadata},
                {"ModelVariable", modelTypeVariable},
                {"PrimaryKeyMetadata", primaryKey},
                {"PrimaryKeyName", primaryKey.PropertyName},
                {"PrimaryKeyType", primaryKey.ShortTypeName},
                {"ReferenceScriptLibraries", false},
                {"UseViewModel", useViewModel},
                {"ViewName", "Index"}, 
                {"ViewDataTypeName", viewDataTypeName},
                {"ViewPrefix", ""}
            };

            if (useViewModel)
            {
                viewParameters.Add("ViewModelTypeChildren", viewModelType.Children);
            }

            if (editable)
            {
                viewParameters.Add("EditMode", editMode);
                viewParameters.Add("EditableCreate", _viewModel.EditableCreate);
                viewParameters.Add("EditableUpdate", _viewModel.EditableUpdate);
                viewParameters.Add("EditableDestroy", _viewModel.EditableDestroy);
            }

            string viewPath = Path.Combine("Views", controllerRootName, "Index");

            if (areaName != String.Empty)
	        {
                viewPath = Path.Combine("Areas", areaName, viewPath);
	        }

            this.AddFolder(Context.ActiveProject, Path.Combine("Views", controllerRootName));
            this.AddFileFromTemplate(Context.ActiveProject, viewPath, dataSourceType + "View", viewParameters, skipIfExists: false);
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

        private string GetBindAttributeIncludeText(ModelMetadata efMetadata)
        {
            string result = "";
            foreach (PropertyMetadata metadata in efMetadata.Properties)
            {
                result += "," + metadata.PropertyName;
            }
                
            return result.Substring(1);
        }
    }
}
