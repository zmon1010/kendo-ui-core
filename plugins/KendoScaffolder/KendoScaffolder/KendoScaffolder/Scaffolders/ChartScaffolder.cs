using EnvDTE;
using KendoScaffolder.UI.Models;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KendoScaffolder.UI.Models.Charts;

namespace KendoScaffolder.Scaffolders
{
    public class ChartScaffolder : IKendoWidgetScaffolder
    {
        public ChartConfigurationViewModel ViewModel { get; set; }
        public CodeType ModelType { get; set; }
        public CodeType ViewModelType { get; set; }
        public CodeType DbContext { get; set; }
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

        public ChartScaffolder(ChartConfigurationViewModel viewModel, CodeGenerationContext context)
        {
            ViewModel = viewModel;
            Context = context;
            ModelType = viewModel.SelectedModelType.CodeType;
            ViewModelType = viewModel.UseViewModel ? viewModel.SelectedViewModelType.CodeType : null;

            ICodeTypeService codeTypeService = KendoScaffolderUtils.GetService<ICodeTypeService>(Context);
            DbContext = codeTypeService.GetCodeType(context.ActiveProject, ViewModel.SelectedDbContextType.TypeName);

            CommonParameters = GetCommonParameters();
        }

        private Dictionary<string, object> GetCommonParameters()
        {
            string viewName = (ViewModel.ViewName != String.Empty) ? ViewModel.ViewName : KendoConstants.DefaultViewName;
            string controllerName = (ViewModel.ControllerName != String.Empty) ? ViewModel.ControllerName : KendoConstants.DefaultChartControllerName;
            string controllerRootName = controllerName.Replace("Controller", "");
            string modelTypeVariable = KendoScaffolderUtils.GetTypeVariable(ModelType.Name);

            var commonParameters = new Dictionary<string, object>()
            {
                {"ControllerName", controllerName},
                {"ControllerRootName" , controllerRootName},
                {"ModelVariable", modelTypeVariable},
                {"ModelMetadata", ViewModel.EfMetadata},
                {"UseViewModel", ViewModel.UseViewModel},
                {"ViewName", viewName},
                {"ViewPrefix", ""}
            };

            return commonParameters;
        }

        public Dictionary<string, object> GetControllerParameters()
        {
            var controllerParameters = new Dictionary<string, object>(CommonParameters);

            PropertyMetadata primaryKey = ViewModel.EfMetadata.PrimaryKeys.FirstOrDefault();

            controllerParameters.Add("AreaName", KendoScaffolderUtils.GetAreaName(KendoScaffolderUtils.GetSelectionRelativePath(Context)));
            controllerParameters.Add("ContextTypeName", DbContext.Name);
            controllerParameters.Add("ModelTypeName", ModelType.Name);
            controllerParameters.Add("Namespace", KendoScaffolderUtils.GetDefaultNamespace(Context));
            controllerParameters.Add("RequiredNamespaces", new HashSet<string>() { ModelType.Namespace.FullName });
            controllerParameters.Add("PrimaryKeyMetadata", primaryKey);
            controllerParameters.Add("PrimaryKeyName", primaryKey.PropertyName);
            controllerParameters.Add("PrimaryKeyType", primaryKey.ShortTypeName);
            controllerParameters.Add("UseRemoteBinding", ViewModel.DataBindingType == "Remote");

            if (ViewModel.UseViewModel)
            {
                controllerParameters.Add("ViewModelTypeName", ViewModelType.Name);
                controllerParameters.Add("ViewModelTypeChildren", ViewModelType.Children);
            }

            return controllerParameters;
        }

        public string GetControllerPath()
        {
            return Path.Combine(KendoScaffolderUtils.GetSelectionRelativePath(Context), CommonParameters["ControllerName"].ToString());
        }

        public string GetControllerRootName()
        {
            return CommonParameters["ControllerRootName"].ToString();
        }

        public string GetControllerTemplate()
        {
            return "ChartController";
        }

        public Dictionary<string, object> GetViewParameters()
        {
            string viewDataTypeName = ModelType.Namespace.FullName + "." + ModelType.Name;

            if (ViewModel.UseViewModel && ViewModelType != null)
            {
                viewDataTypeName = ViewModelType.Namespace.FullName + "." + ViewModelType.Name;
            }

            var viewParameters = new Dictionary<string, object>(CommonParameters);
            viewParameters.Add("ViewDataTypeName", viewDataTypeName);
            viewParameters.Add("ChartTitle", ViewModel.Title);
            viewParameters.Add("SeriesType", ViewModel.SelectedSeriesType.ToString());
            viewParameters.Add("TooltipVisible", ViewModel.TooltipVisible);

            if (ViewModel.LegendVisible)
            {
                viewParameters.Add("LegendVisible", ViewModel.LegendVisible);
                viewParameters.Add("LegendPosition", ViewModel.LegendPosition.ToString());
            }

            if (ViewModel.HasCategoryAxis[ViewModel.SelectedSeriesType] && ViewModel.CategoryAxis != null)
            {
                viewParameters.Add("CategoryAxis", ViewModel.CategoryAxis.PropertyName);
            }
            else
            {
                viewParameters.Add("CategoryAxis", String.Empty);
            }


            List<string> seriesNames = new List<string>();
            List<string> seriesColors = new List<string>();
            List<List<string>> seriesConfigs = new List<List<string>>();

            if (ViewModel.AreaLikeSeries.Count > 0)
            {
                foreach (AreaLikeChartConfiguration config in ViewModel.AreaLikeSeries)
                {
                    if (config.Value != null)
                    {
                        seriesNames.Add(config.Name ?? "");
                        seriesColors.Add(config.Color ?? "");

                        List<string> configurations = new List<string>();
                        configurations.Add(config.Value.PropertyName);
                        seriesConfigs.Add(configurations);
                    }
                }
            }
            else if (ViewModel.BoxPlotSeries.Count > 0)
            {
                foreach (BoxPlotChartConfiguration config in ViewModel.BoxPlotSeries)
                {
                    if (config.Lower != null && config.Q1 != null && config.Median != null && config.Q3 != null &&
                        config.Upper != null && config.Mean != null && config.Outliers != null)
                    {
                        seriesNames.Add(config.Name ?? "");
                        seriesColors.Add(config.Color ?? "");

                        List<string> configurations = new List<string>();
                        configurations.Add(config.Lower.PropertyName);
                        configurations.Add(config.Q1.PropertyName);
                        configurations.Add(config.Median.PropertyName);
                        configurations.Add(config.Q3.PropertyName);
                        configurations.Add(config.Upper.PropertyName);
                        configurations.Add(config.Mean.PropertyName);
                        configurations.Add(config.Outliers.PropertyName);

                        seriesConfigs.Add(configurations);
                    }
                }
            }
            else if (ViewModel.BubbleSeries.Count > 0)
            {
                foreach (BubbleChartConfiguration config in ViewModel.BubbleSeries)
                {
                    seriesNames.Add(config.Name ?? "");
                    seriesColors.Add(config.Color ?? "");

                    List<string> configurations = new List<string>();

                    configurations.Add(config.X != null ? config.X.PropertyName : "");
                    configurations.Add(config.Y != null ? config.Y.PropertyName : "");
                    configurations.Add(config.Size != null ? config.Size.PropertyName : "");

                    seriesConfigs.Add(configurations);
                }
            }
            else if (ViewModel.BulletLikeSeries.Count > 0)
            {
                foreach (BulletLikeChartConfiguration config in ViewModel.BulletLikeSeries)
                {
                    if (config.Current != null && config.Target != null)
                    {
                        seriesNames.Add(config.Name ?? "");
                        seriesColors.Add(config.Color ?? "");

                        List<string> configurations = new List<string>();

                        configurations.Add(config.Current.PropertyName);
                        configurations.Add(config.Target.PropertyName);

                        seriesConfigs.Add(configurations);
                    }
                }
            }
            else if (ViewModel.CandlestickLikeSeries.Count > 0)
            {
                foreach (CandlestickLikeChartConfiguration config in ViewModel.CandlestickLikeSeries)
                {
                    if (config.Open != null && config.High != null && config.Low != null && config.Close != null)
                    {
                        seriesNames.Add(config.Name ?? "");
                        seriesColors.Add(config.Color ?? "");

                        List<string> configurations = new List<string>();
                        configurations.Add(config.Open.PropertyName);
                        configurations.Add(config.High.PropertyName);
                        configurations.Add(config.Low.PropertyName);
                        configurations.Add(config.Close.PropertyName);

                        seriesConfigs.Add(configurations);
                    }
                }
            }
            else if (ViewModel.PieLikeSeries.Count > 0)
            {
                foreach (PieLikeChartConfiguration config in ViewModel.PieLikeSeries)
                {
                    if (config.Value != null)
                    {
                        seriesNames.Add(config.Name ?? "");
                        seriesColors.Add(config.Color ?? "");

                        List<string> configurations = new List<string>();
                        configurations.Add(config.Value.PropertyName);
                        seriesConfigs.Add(configurations);
                    }
                }
            }
            else if (ViewModel.RangeSeries.Count > 0)
            {
                foreach (RangeChartConfiguration config in ViewModel.RangeSeries)
                {
                    if (config.From != null && config.To != null)
                    {
                        seriesNames.Add(config.Name ?? "");
                        seriesColors.Add(config.Color ?? "");

                        List<string> configurations = new List<string>();

                        configurations.Add(config.From.PropertyName);
                        configurations.Add(config.To.PropertyName);

                        seriesConfigs.Add(configurations);
                    }
                }
            }
            else if (ViewModel.ScatterLikeSeries.Count > 0)
            {
                foreach (ScatterLikeChartConfiguration config in ViewModel.ScatterLikeSeries)
                {
                    if (config.X != null && config.Y != null)
                    {
                        seriesNames.Add(config.Name ?? "");
                        seriesColors.Add(config.Color ?? "");

                        List<string> configurations = new List<string>();
                        configurations.Add(config.X.PropertyName);
                        configurations.Add(config.Y.PropertyName);

                        seriesConfigs.Add(configurations);
                    }
                }
            }
            else if (ViewModel.WatterfallLikeSeries.Count > 0)
            {
                foreach (WatterfallLikeChartConfiguration config in ViewModel.WatterfallLikeSeries)
                {
                    if (config.Value != null)
                    {
                        seriesNames.Add(config.Name ?? "");
                        seriesColors.Add(config.Color ?? "");

                        List<string> configurations = new List<string>();
                        configurations.Add(config.Value.PropertyName);
                        seriesConfigs.Add(configurations);
                    }
                }
            }
            
            viewParameters.Add("SeriesNames", seriesNames);
            viewParameters.Add("SeriesColors", seriesColors);
            viewParameters.Add("SeriesConfigs", seriesConfigs);

            return viewParameters;
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
            if (ViewModel.DataBindingType == "Local")
            {
                return "ChartLocalDataView";
            }
            else
            {
                return "ChartRemoteDataView";
            }
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
    }
}
