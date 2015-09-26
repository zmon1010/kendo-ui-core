using EnvDTE;
using KendoScaffolder.UI.Models;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using Microsoft.AspNet.Scaffolding.EntityFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace KendoScaffolder.Scaffolders
{
    public class SchedulerScaffolder : IKendoWidgetScaffolder
    {
        public SchedulerConfigurationViewModel ViewModel { get; set; }
        public CodeType ModelType { get; set; }
        public CodeType ViewModelType { get; set; }
        public CodeType DbContext { get; set; }
        public ModelMetadata EfMetadata { get; set; }
        public CodeGenerationContext Context { get; set; }
        public bool UseWidgetViewModel
        {
            get
            {
                return true;
            }
        }

        public Dictionary<string, object> CommonParameters { get; set; }
        public Dictionary<string, object> ControllerParameters { get; set; }
        public Dictionary<string, object> ViewParameters { get; set; }
        public Dictionary<string, Dictionary<string, string>> DataAnnotationAttributes { get; set; }

        private static readonly string PathSeparator = Path.DirectorySeparatorChar.ToString();

        public SchedulerScaffolder(SchedulerConfigurationViewModel viewModel, CodeGenerationContext context)
        {
            ViewModel = viewModel;
            Context = context;
            ModelType = viewModel.SelectedModelType.CodeType;
            //create custom view model:
            //ViewModelType = viewModel.UseViewModel ? viewModel.SelectedViewModelType.CodeType : null;

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
            string controllerName = (ViewModel.ControllerName != String.Empty) ? ViewModel.ControllerName : KendoConstants.DefaultSchedulerControllerName;
            string controllerRootName = controllerName.Replace("Controller", "");
            string modelTypeVariable = KendoScaffolderUtils.GetTypeVariable(ModelType.Name);
            PropertyMetadata primaryKey = EfMetadata.PrimaryKeys.FirstOrDefault();
            string widgetViewModelName = string.Format("{0}ViewModel", ModelType.Name);
            List<string> selectedModelTypeFields = ViewModel.SchedulerEventFields
                .Select(field => field.Replace("SelectedEvent", "").Replace("Field", ""))
                .ToList();

            selectedModelTypeFields.Add(primaryKey.PropertyName);

            if (ViewModel.SelectedModelResourceField != null)
            {
                selectedModelTypeFields.Add(ViewModel.SelectedModelResourceField.DisplayName);
            }

            var commonParameters = new Dictionary<string, object>()
            {
                {"ControllerName", controllerName},
                {"ControllerRootName" , controllerRootName},
                {"ModelVariable", modelTypeVariable},
                {"ModelMetadata", EfMetadata},
                {"DataAnnotationAttributes", DataAnnotationAttributes},
                {"PdfExport", ViewModel.PdfExport},
                {"PrimaryKeyMetadata", primaryKey},
                {"PrimaryKeyName", primaryKey.PropertyName},
                {"PrimaryKeyType", primaryKey.ShortTypeName},
                {"RecurrenceIDType", ViewModel.SelectedEventRecurrenceIDField.GetterType},
                {"UseResources", ViewModel.UseResources},
                {"ViewName", viewName},
                {"ViewPrefix", ""},
                {"WidgetViewModelName", widgetViewModelName},
                {"SelectedModelTypeFields", selectedModelTypeFields}
            };

            if (ViewModel.UseResources)
            {
                commonParameters.Add("SelectedModelResourceField", ViewModel.SelectedModelResourceField.ShortTypeName);
                commonParameters.Add("SelectedModelResourceFieldType", ViewModel.SelectedModelResourceField.GetterType);
            }

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
                    return "SchedulerAjaxController";
                case "WebApi":
                    return "SchedulerWebApiController";
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

            controllerParameters.Add("EditableCreate", ViewModel.EditableCreate);
            controllerParameters.Add("EditableUpdate", ViewModel.EditableUpdate);
            controllerParameters.Add("EditableDestroy", ViewModel.EditableDestroy);
            controllerParameters.Add("EditableResize", ViewModel.EditableResize);
            controllerParameters.Add("EditableMove", ViewModel.EditableMove);

            return controllerParameters;
        }

        public Dictionary<string, object> GetViewParameters()
        {

            var viewParameters = new Dictionary<string, object>(CommonParameters);



            viewParameters.Add("Selectable", ViewModel.Selectable);
            viewParameters.Add("Namespace", KendoScaffolderUtils.GetDefaultNamespace(Context));
            viewParameters.Add("SchedulerEvents", ViewModel.SelectedSchedulerEvents);
            viewParameters.Add("SchedulerViewTypes", ViewModel.SelectedSchedulerViewTypes);
            //viewParameters.Add("ServerOperation", ViewModel.ServerOperation);

            //use View model ?
            if (ViewModel.UseViewModel)
            {
                viewParameters.Add("ViewModelTypeChildren", ViewModelType.Children);
            }

            viewParameters.Add("EditableCreate", ViewModel.EditableCreate);
            viewParameters.Add("EditableUpdate", ViewModel.EditableUpdate);
            viewParameters.Add("EditableDestroy", ViewModel.EditableDestroy);
            viewParameters.Add("EditableResize", ViewModel.EditableResize);
            viewParameters.Add("EditableMove", ViewModel.EditableMove);

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
                return "Scheduler" + dataSourceType + "WebView";
            }

            return "Scheduler" + dataSourceType + "View";
        }

        public string GetWidgetViewModelPath()
        {
            return Path.Combine("Models", CommonParameters["WidgetViewModelName"].ToString());
        }

        public string GetWidgetViewModelTemplate()
        {
            return "SchedulerViewModel";
        }

        public Dictionary<string, object> GetWidgetViewModelParameters()
        {
            var widgetViewModelParameters = new Dictionary<string, object>(CommonParameters);

            widgetViewModelParameters.Add("ModelTypeName", ModelType.Name);
            widgetViewModelParameters.Add("Namespace", KendoScaffolderUtils.GetDefaultNamespace(Context));
            widgetViewModelParameters.Add("RequiredNamespaces", new HashSet<string>() { ModelType.Namespace.FullName });
            widgetViewModelParameters.Add("SelectedEventTitleField", ViewModel.SelectedEventTitleField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventStartField", ViewModel.SelectedEventStartField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventEndField", ViewModel.SelectedEventEndField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventDescriptionField", ViewModel.SelectedEventDescriptionField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventIsAllDayField", ViewModel.SelectedEventIsAllDayField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventStartTimezoneField", ViewModel.SelectedEventStartTimezoneField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventEndTimezoneField", ViewModel.SelectedEventEndTimezoneField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventRecurrenceIDField", ViewModel.SelectedEventRecurrenceIDField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventRecurrenceRuleField", ViewModel.SelectedEventRecurrenceRuleField.ShortTypeName);
            widgetViewModelParameters.Add("SelectedEventRecurrenceExceptionField", ViewModel.SelectedEventRecurrenceExceptionField.ShortTypeName);

            return widgetViewModelParameters;
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
