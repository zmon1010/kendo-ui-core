using EnvDTE;
using KendoScaffolder.UI;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using Microsoft.AspNet.Scaffolding.EntityFramework;
using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;

namespace KendoScaffolder
{
    public class CustomCodeGenerator : CodeGenerator
    {
        GridConfigurationViewModel _viewModel;

        /// <summary>
        /// Constructor for the custom code generator
        /// </summary>
        /// <param name="context">Context of the current code generation operation based on how scaffolder was invoked(such as selected project/folder) </param>
        /// <param name="information">Code generation information that is defined in the factory class.</param>
        public CustomCodeGenerator(CodeGenerationContext context, CodeGeneratorInformation information)
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

            string controllerName = _viewModel.ControllerName;
            string controllerRootName = controllerName.Replace("Controller", "");

            Dictionary<string, object> controllerParameters = new Dictionary<string, object>(){
                {"AreaName", string.Empty},
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
                    if (editMode == "InCell")
                    {
                        controllerTemplate = "AjaxBatchController";
                    }
                    else
                    {
                        controllerTemplate = "AjaxController";
                    }
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
            // template = template
            this.AddFileFromTemplate(Context.ActiveProject, Path.Combine("Controllers", controllerName), controllerTemplate, controllerParameters, skipIfExists: false);

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

            this.AddFolder(Context.ActiveProject, Path.Combine("Views", controllerRootName));

            string viewTemplate = string.Empty;
            switch (dataSourceType)
            {
                case "Ajax":
                case "Server":
                    viewTemplate = "AjaxView";
                    break;
                case "WebApi":
                    viewTemplate = "WebApiView";
                    break;
                default:
                    break;
            }

            // Add the custom scaffolding item from T4 template.
            this.AddFileFromTemplate(Context.ActiveProject, Path.Combine("Views", controllerRootName, "Index"), viewTemplate, viewParameters, skipIfExists: false);
        }

        private ICodeTypeService GetService<T1>()
        {
            return (ICodeTypeService)Context.ServiceProvider.GetService(typeof(ICodeTypeService));
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
