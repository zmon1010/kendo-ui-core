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
            string widgetViewModelName = string.Format("{0}ViewModel", ModelType.Name);
            //string pluralizedName = efMetadata.EntitySetName;
            //string modelNameSpace = modelType.Namespace != null ? modelType.Namespace.FullName : String.Empty;
            //string relativePath = string.Empty;
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
                {"PdfExport", ViewModel.PdfExport},
                {"PrimaryKeyMetadata", primaryKey},
                {"PrimaryKeyName", primaryKey.PropertyName},
                {"PrimaryKeyType", primaryKey.ShortTypeName},
                {"RecurrenceIDType", ViewModel.SelectedEventRecurrenceIDField.GetterType},
                {"ViewName", viewName},
                {"ViewPrefix", ""},
                {"WidgetViewModelName", widgetViewModelName},
                {"SelectedModelTypeFields", selectedModelTypeFields},
                {"SelectedEventTitleField", ViewModel.SelectedEventTitleField.ShortTypeName},
                {"SelectedEventStartField", ViewModel.SelectedEventStartField.ShortTypeName},
                {"SelectedEventEndField", ViewModel.SelectedEventEndField.ShortTypeName},
                {"SelectedEventDescriptionField", ViewModel.SelectedEventDescriptionField.ShortTypeName},
                {"SelectedEventIsAllDayField", ViewModel.SelectedEventIsAllDayField.ShortTypeName},
                {"SelectedEventStartTimezoneField", ViewModel.SelectedEventStartTimezoneField.ShortTypeName},
                {"SelectedEventEndTimezoneField", ViewModel.SelectedEventEndTimezoneField.ShortTypeName},
                {"SelectedEventRecurrenceIDField", ViewModel.SelectedEventRecurrenceIDField.ShortTypeName},
                {"SelectedEventRecurrenceRuleField", ViewModel.SelectedEventRecurrenceRuleField.ShortTypeName},
                {"SelectedEventRecurrenceExceptionField", ViewModel.SelectedEventRecurrenceExceptionField.ShortTypeName},
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

            //if (ViewModel.Editable)
            //{
            //    controllerParameters.Add("EditMode", ViewModel.EditMode);
            //    controllerParameters.Add("EditableCreate", ViewModel.EditableCreate);
            //    controllerParameters.Add("EditableUpdate", ViewModel.EditableUpdate);
            //    controllerParameters.Add("EditableDestroy", ViewModel.EditableDestroy);
            //}

            return controllerParameters;
        }

        public Dictionary<string, object> GetViewParameters()
        {

            var viewParameters = new Dictionary<string, object>(CommonParameters);


            //viewParameters.Add("Editable", ViewModel.Editable);
            viewParameters.Add("IsBundleConfigPresent", true);
            viewParameters.Add("IsLayoutPageSelected", true);
            viewParameters.Add("IsPartialView", false);
            viewParameters.Add("LayoutPageFile", "");
            viewParameters.Add("Selectable", ViewModel.Selectable);
            viewParameters.Add("Namespace", KendoScaffolderUtils.GetDefaultNamespace(Context));
            viewParameters.Add("SchedulerEvents", ViewModel.SelectedSchedulerEvents);
            //viewParameters.Add("ServerOperation", ViewModel.ServerOperation);

            if (ViewModel.UseViewModel)
            {
                viewParameters.Add("ViewModelTypeChildren", ViewModelType.Children);
            }

            //if (ViewModel.Editable)
            //{
            //    viewParameters.Add("EditMode", ViewModel.EditMode);
            //    viewParameters.Add("EditableCreate", ViewModel.EditableCreate);
            //    viewParameters.Add("EditableUpdate", ViewModel.EditableUpdate);
            //    viewParameters.Add("EditableDestroy", ViewModel.EditableDestroy);
            //}

            if (ViewModel.Selectable)
            {
                viewParameters.Add("Selectable", ViewModel.Selectable);
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
            widgetViewModelParameters.Add("ModelTypeChildren", ModelType.Children);
            widgetViewModelParameters.Add("Namespace", KendoScaffolderUtils.GetDefaultNamespace(Context));
            widgetViewModelParameters.Add("RequiredNamespaces", new HashSet<string>() { ModelType.Namespace.FullName });

            return widgetViewModelParameters;
        }
    }
}
