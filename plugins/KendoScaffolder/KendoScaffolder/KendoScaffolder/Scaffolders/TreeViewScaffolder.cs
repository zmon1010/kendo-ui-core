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
    public class TreeViewScaffolder : IKendoWidgetScaffolder
    {
        public TreeViewConfigurationViewModel ViewModel { get; set; }
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

        public TreeViewScaffolder(TreeViewConfigurationViewModel viewModel, CodeGenerationContext context)
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
            string controllerName = (ViewModel.ControllerName != String.Empty) ? ViewModel.ControllerName : KendoConstants.DefaultTreeViewControllerName;
            string controllerRootName = controllerName.Replace("Controller", "");
            string modelTypeVariable = KendoScaffolderUtils.GetTypeVariable(ModelType.Name);
            PropertyMetadata primaryKey = EfMetadata.PrimaryKeys.FirstOrDefault();

            var commonParameters = new Dictionary<string, object>()
            {
                {"ControllerName", controllerName},
                {"ControllerRootName" , controllerRootName},
                {"DataAnnotationAttributes", DataAnnotationAttributes},
                {"ModelVariable", modelTypeVariable},
                {"ModelMetadata", EfMetadata},
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

            return "TreeViewController";
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
            controllerParameters.Add("ParentIdFieldName", ViewModel.ParentIdFieldName);

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
            
            viewParameters.Add("IsBundleConfigPresent", true);
            viewParameters.Add("IsLayoutPageSelected", true);
            viewParameters.Add("IsPartialView", false);
            viewParameters.Add("ViewDataTypeName", viewDataTypeName);
            viewParameters.Add("TreeViewEvents", ViewModel.SelectedTreeViewEvents);
            viewParameters.Add("Animation", ViewModel.Animation);
            viewParameters.Add("DataTextField", ViewModel.DataTextField);
            viewParameters.Add("DataUrlField", ViewModel.DataUrlField);

            if (ViewModel.UseViewModel)
            {
                viewParameters.Add("ViewModelTypeChildren", ViewModelType.Children);
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
            if (ViewModel.ViewType == ViewType.Web)
            {
                return "TreeViewWebView";
            }

            return "TreeViewView";
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
