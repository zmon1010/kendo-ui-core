using EnvDTE;
using EnvDTE80;
using KendoScaffolder.UI;
using KendoScaffolder.UI.Models;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using Microsoft.AspNet.Scaffolding.EntityFramework;
using Microsoft.VisualStudio.Shell;
using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Text;
using KendoScaffolder.Scaffolders;

namespace KendoScaffolder
{
    public class KendoScaffolderCodeGenerator : CodeGenerator
    {
        private WidgetConfigurationViewModel viewModel;
        private KendoWidget selectedWidget;
        private IKendoWidgetScaffolder scaffolder;

        /// <summary>
        /// Constructor for the custom code generator
        /// </summary>
        /// <param name="context">Context of the current code generation operation based on how scaffolder was invoked(such as selected project/folder) </param>
        /// <param name="information">Code generation information that is defined in the factory class.</param>
        public KendoScaffolderCodeGenerator(CodeGenerationContext context, CodeGeneratorInformation information)
            : base(context, information)
        {
            selectedWidget = KendoWidget.Grid;
        }

        /// <summary>
        /// Any UI to be displayed after the scaffolder has been selected from the Add Scaffold dialog.
        /// Any validation on the input for values in the UI should be completed before returning from this method.
        /// </summary>
        /// <returns></returns>
        public override bool ShowUIAndValidate()
        {
            WidgetSelectionWindow widgetSelection = new WidgetSelectionWindow();

            if (widgetSelection.ShowDialog() == true)
            {
                selectedWidget = widgetSelection.SelectedWidget;

                System.Windows.Window widgetConfigurationWindow = new System.Windows.Window();

                switch (selectedWidget)
                {
                    case KendoWidget.Chart:
                        viewModel = new ChartConfigurationViewModel(Context);
                        viewModel.ViewType = widgetSelection.SelectedViewType;
                        widgetConfigurationWindow = new ChartConfigurationWindow((ChartConfigurationViewModel)viewModel);
                        break;
                    case KendoWidget.Grid:
                        viewModel = new GridConfigurationViewModel(Context);
                        viewModel.ViewType = widgetSelection.SelectedViewType;
                        widgetConfigurationWindow = new GridConfigurationWindow((GridConfigurationViewModel)viewModel);
                        break;
                    case KendoWidget.Scheduler:
                        viewModel = new SchedulerConfigurationViewModel(Context);
                        viewModel.ViewType = widgetSelection.SelectedViewType;
                        widgetConfigurationWindow = new SchedulerConfigurationWindow((SchedulerConfigurationViewModel)viewModel);
                        break;
                    case KendoWidget.TreeView:
                        viewModel = new TreeViewConfigurationViewModel(Context);
                        viewModel.ViewType = widgetSelection.SelectedViewType;
                        widgetConfigurationWindow = new TreeViewConfigurationWindow((TreeViewConfigurationViewModel)viewModel);
                        break;
                }

                bool? showDialog = widgetConfigurationWindow.ShowDialog();

                return showDialog ?? false;
            }

            return false;
        }

        private void BuildProject(Project project)
        {
            var dte = Package.GetGlobalService(typeof(DTE)) as DTE2;
            var config = dte.Solution.SolutionBuild.ActiveConfiguration.Name;
            dte.Solution.SolutionBuild.BuildProject(config, project.FullName, true);
        }

        public override void GenerateCode()
        {
            BuildProject(Context.ActiveProject);
            scaffolder = GetScaffolderForSelectedWidget();

            try
            {
                var controllerPath = scaffolder.GetControllerPath();
                var controllerTemplate = scaffolder.GetControllerTemplate();
                var controllerParams = scaffolder.GetControllerParameters();

                this.AddFileFromTemplate(Context.ActiveProject, controllerPath, controllerTemplate, controllerParams, skipIfExists: false);

                this.AddFolder(Context.ActiveProject, Path.Combine("Views", scaffolder.GetControllerRootName()));

                var viewPath = scaffolder.GetViewPath();
                var viewTemplate = scaffolder.GetViewTemplate();
                var viewParams = scaffolder.GetViewParameters();

                this.AddFileFromTemplate(Context.ActiveProject, viewPath, viewTemplate, viewParams, skipIfExists: false);

                if (scaffolder.UseWidgetViewModel == true)
                {
                    var viewModelPath = scaffolder.GetWidgetViewModelPath();
                    var viewModelTemplate = scaffolder.GetWidgetViewModelTemplate();
                    var viewModelParams = scaffolder.GetWidgetViewModelParameters();

                    this.AddFileFromTemplate(Context.ActiveProject, viewModelPath, viewModelTemplate, viewModelParams, skipIfExists: false);
                }
            }
            catch (InvalidOperationException ex)
            {
                throw new InvalidOperationException("An unknown error occurred during generation", ex);
            }
        }

        private IKendoWidgetScaffolder GetScaffolderForSelectedWidget()
        {
            switch (selectedWidget)
            {
                case KendoWidget.Chart:
                    return new ChartScaffolder((ChartConfigurationViewModel)viewModel, Context);
                case KendoWidget.Grid:
                    return new GridScaffolder((GridConfigurationViewModel)viewModel, Context);
                case KendoWidget.Scheduler:
                    return new SchedulerScaffolder((SchedulerConfigurationViewModel)viewModel, Context);
                case KendoWidget.TreeView:
                    return new TreeViewScaffolder((TreeViewConfigurationViewModel)viewModel, Context);
            }

            return null;
        }
    }
}
