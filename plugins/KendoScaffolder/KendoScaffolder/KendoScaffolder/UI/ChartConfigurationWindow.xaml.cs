using KendoScaffolder.UI.Models;
using KendoScaffolder.UI.Models.Charts;
using Microsoft.AspNet.Scaffolding;
using Microsoft.AspNet.Scaffolding.Core.Metadata;
using Microsoft.AspNet.Scaffolding.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Reflection;
using System.Linq.Expressions; 

namespace KendoScaffolder.UI
{
    public partial class ChartConfigurationWindow : Window
    {
        private readonly CodeGenerationContext context;
        private readonly Dictionary<ChartSeriesType, List<ChartConfiguration>> requiredChartConfigurations;
        private readonly Dictionary<ChartSeriesType, List<ChartConfiguration>> optionalChartConfigurations;

        public const string WebGridTitle = "Kendo UI Chart";
        public const string MvcGridTitle = "Telerik ASP.NET MVC Chart";

        public ChartConfigurationWindow(ChartConfigurationViewModel viewModel)
        {
            WindowStartupLocation = WindowStartupLocation.CenterScreen;

            InitializeComponent();

            if (viewModel.ViewType == ViewType.MVC)
            {
                WidgetTitle.Text = MvcGridTitle;
                this.Title = MvcGridTitle;
            }
            else
            {
                WidgetTitle.Text = WebGridTitle;
                this.Title = WebGridTitle;
            }

            DataContext = viewModel;

            context = viewModel.Context;

            requiredChartConfigurations = PrepareRequiredChartConfigurationOptions();

            optionalChartConfigurations = PrepareOptionalChartConfigurationOptions();
        }

        private Dictionary<ChartSeriesType, List<ChartConfiguration>> PrepareRequiredChartConfigurationOptions()
        {
            List<ChartConfiguration> valueChartConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.Value };
            List<ChartConfiguration> boxPlotConfigurationOptions = new List<ChartConfiguration>() 
            { 
                ChartConfiguration.Lower, ChartConfiguration.Q1, ChartConfiguration.Median, ChartConfiguration.Q3,
                ChartConfiguration.Upper, ChartConfiguration.Mean, ChartConfiguration.Outliers
            };
            List<ChartConfiguration> bubbleConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.X, ChartConfiguration.Y, ChartConfiguration.Size };
            List<ChartConfiguration> bulletConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.Current, ChartConfiguration.Target };
            List<ChartConfiguration> candleStickConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.Open, ChartConfiguration.High, ChartConfiguration.Low, ChartConfiguration.Close };
            List<ChartConfiguration> rangeChartConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.From, ChartConfiguration.To };
            List<ChartConfiguration> scatterLikeConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.X, ChartConfiguration.Y };

            Dictionary<ChartSeriesType, List<ChartConfiguration>> requiredChartConfigurations = new Dictionary<ChartSeriesType, List<ChartConfiguration>>() 
            {
                { ChartSeriesType.Area, valueChartConfigurationOptions },
                { ChartSeriesType.Bar, valueChartConfigurationOptions },
                { ChartSeriesType.Column, valueChartConfigurationOptions },
                { ChartSeriesType.Line, valueChartConfigurationOptions },
                { ChartSeriesType.VerticalArea, valueChartConfigurationOptions },
                { ChartSeriesType.VerticalLine, valueChartConfigurationOptions },
                { ChartSeriesType.RadarArea, valueChartConfigurationOptions },
                { ChartSeriesType.RadarColumn, valueChartConfigurationOptions },
                { ChartSeriesType.RadarLine, valueChartConfigurationOptions },
                { ChartSeriesType.BoxPlot, boxPlotConfigurationOptions },
                { ChartSeriesType.Bubble, bubbleConfigurationOptions },
                { ChartSeriesType.Bullet, bulletConfigurationOptions },
                { ChartSeriesType.VerticalBullet, bulletConfigurationOptions },
                { ChartSeriesType.CandleStick, candleStickConfigurationOptions },
                { ChartSeriesType.OHLC, candleStickConfigurationOptions },
                { ChartSeriesType.Funnel, valueChartConfigurationOptions },
                { ChartSeriesType.RangeColumn, rangeChartConfigurationOptions },
                { ChartSeriesType.RangeBar, rangeChartConfigurationOptions },
                { ChartSeriesType.Pie, valueChartConfigurationOptions },
                { ChartSeriesType.Donut, valueChartConfigurationOptions },
                { ChartSeriesType.Scatter, scatterLikeConfigurationOptions },
                { ChartSeriesType.ScatterLine, scatterLikeConfigurationOptions },
                { ChartSeriesType.PolarArea, scatterLikeConfigurationOptions },
                { ChartSeriesType.PolarLine, scatterLikeConfigurationOptions },
                { ChartSeriesType.PolarScatter, scatterLikeConfigurationOptions },
                { ChartSeriesType.Waterfall, valueChartConfigurationOptions },
                { ChartSeriesType.HorizontalWaterfall, valueChartConfigurationOptions }
            };

            return requiredChartConfigurations;
        }

        private Dictionary<ChartSeriesType, List<ChartConfiguration>> PrepareOptionalChartConfigurationOptions()
        {
            List<ChartConfiguration> categoryColorConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.Category, ChartConfiguration.Color };
            List<ChartConfiguration> colorConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.Color };
            List<ChartConfiguration> categorySummaryConfigurationOptions = new List<ChartConfiguration>() { ChartConfiguration.Category, ChartConfiguration.Summary };

            Dictionary<ChartSeriesType, List<ChartConfiguration>> optionalChartConfigurations = new Dictionary<ChartSeriesType, List<ChartConfiguration>>() 
            {
                { ChartSeriesType.Area, categoryColorConfigurationOptions },
                { ChartSeriesType.Bar, categoryColorConfigurationOptions },
                { ChartSeriesType.Column, categoryColorConfigurationOptions },
                { ChartSeriesType.Line, categoryColorConfigurationOptions },
                { ChartSeriesType.VerticalArea, categoryColorConfigurationOptions },
                { ChartSeriesType.VerticalLine, categoryColorConfigurationOptions },
                { ChartSeriesType.RadarArea, categoryColorConfigurationOptions },
                { ChartSeriesType.RadarColumn, categoryColorConfigurationOptions },
                { ChartSeriesType.RadarLine, categoryColorConfigurationOptions },
                { ChartSeriesType.BoxPlot, categoryColorConfigurationOptions },
                { ChartSeriesType.Bubble, colorConfigurationOptions },
                { ChartSeriesType.Bullet, categoryColorConfigurationOptions },
                { ChartSeriesType.VerticalBullet, categoryColorConfigurationOptions },
                { ChartSeriesType.CandleStick, categoryColorConfigurationOptions },
                { ChartSeriesType.OHLC, categoryColorConfigurationOptions },
                { ChartSeriesType.Funnel, categoryColorConfigurationOptions },
                { ChartSeriesType.RangeColumn, categoryColorConfigurationOptions },
                { ChartSeriesType.RangeBar, categoryColorConfigurationOptions },
                { ChartSeriesType.Pie, categoryColorConfigurationOptions },
                { ChartSeriesType.Donut, categoryColorConfigurationOptions },
                { ChartSeriesType.Scatter, colorConfigurationOptions },
                { ChartSeriesType.ScatterLine, colorConfigurationOptions },
                { ChartSeriesType.PolarArea, colorConfigurationOptions },
                { ChartSeriesType.PolarLine, colorConfigurationOptions },
                { ChartSeriesType.PolarScatter, colorConfigurationOptions },
                { ChartSeriesType.Waterfall, categorySummaryConfigurationOptions },
                { ChartSeriesType.HorizontalWaterfall, categorySummaryConfigurationOptions }
            };

            return optionalChartConfigurations;
        }

        private void ControllerName_Loaded(object sender, System.Windows.RoutedEventArgs e)
        {
            TextBox current = ((TextBox)sender);
            current.Text = "ChartController";
            current.Focus();
            current.Select(0, 5);
        }

        private void ViewName_Loaded(object sender, System.Windows.RoutedEventArgs e)
        {
            TextBox current = ((TextBox)sender);
            current.Text = "Index";
        }

        private void RequiredField_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ToggleAddButtonState();
        }

        private void ModelClass_DataContext_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var viewModel = (ChartConfigurationViewModel)this.DataContext;
            viewModel.PopulateSelectedModelFields();

            bool useViewModel = UseViewModel.IsChecked ?? false;
            if (ModelType.SelectedValue != null && DataContextClass.SelectedValue != null)
            {
                if ((!useViewModel || (useViewModel && ViewModelType.SelectedValue != null)))
                {
                    ToggleAddButtonState();
                }
            }
        }

        private void ToggleAddButtonState()
        {
            var viewModel = (ChartConfigurationViewModel)this.DataContext;
            bool useViewModel = UseViewModel.IsChecked ?? false;

            if (ModelType.SelectedValue != null && DataContextClass.SelectedValue != null && viewModel.EfMetadata != null)
            {
                if (!useViewModel || (useViewModel && ViewModelType.SelectedValue != null))
                {
                    SeriesType.IsEnabled = true;
                    AddButton.IsEnabled = true;
                }
                else
                {
                    SeriesType.IsEnabled = false;
                    AddButton.IsEnabled = false;
                }
            }
            else
            {
                SeriesType.IsEnabled = false;
                AddButton.IsEnabled = false;
            }
        }

        private void UseViewModel_Clicked(object sender, RoutedEventArgs e)
        {
            if (ViewModelType.Visibility == Visibility.Visible)
            {
                ViewModelType.Visibility = Visibility.Collapsed;
                ViewModelTypeLabel.Visibility = Visibility.Collapsed;
            }
            else
            {
                ViewModelType.Visibility = Visibility.Visible;
                ViewModelTypeLabel.Visibility = Visibility.Visible;
            }
            ToggleAddButtonState();
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
        }

        private void SeriesType_Loaded(object sender, RoutedEventArgs e)
        {
            SeriesType.ItemsSource = Enum.GetValues(typeof(ChartSeriesType)).Cast<ChartSeriesType>().OrderBy(x => x.ToString());
            SeriesType.SelectedItem = "SelectedSeriesType";
        }

        private void SeriesType_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ChartSeriesType selectedSeries = (ChartSeriesType)SeriesType.SelectedItem;
            var viewModel = (ChartConfigurationViewModel)this.DataContext;
            viewModel.SelectedSeriesType = selectedSeries;

            List<ChartConfiguration> seriesConfiguration = requiredChartConfigurations[selectedSeries];

            SeriesOptionsPanel.Children.Clear();
            ClearAllSeriesInModel();

            AddCategoryAxisToUI(selectedSeries, SeriesOptionsPanel);
            AddSeriesToUI(selectedSeries, SeriesOptionsPanel);

            SeriesOptionsPanel.Visibility = Visibility.Visible;
            SeriesOptionsLabel.Visibility = Visibility.Visible;
            AddSeriesButton.Visibility = Visibility.Visible;
        }

        private void AddCategoryAxisToUI(ChartSeriesType selectedSeriesType, Panel container)
        {
            var viewModel = (ChartConfigurationViewModel)this.DataContext;

            if (viewModel.HasCategoryAxis[selectedSeriesType])
            {
                Label categoryAxisLabel = new Label();
                categoryAxisLabel.Content = "Category axis field:";

                ComboBox categoryAxisBox = new ComboBox();
                categoryAxisBox.SetBinding(ComboBox.SelectedItemProperty, new Binding("CategoryAxis"));
                categoryAxisBox.SetBinding(ComboBox.ItemsSourceProperty, new Binding("SelectedModelFields"));
                categoryAxisBox.DisplayMemberPath = "PropertyName";
                categoryAxisBox.Width = 150;
                categoryAxisBox.MaxDropDownHeight = 226;
                categoryAxisBox.HorizontalAlignment = HorizontalAlignment.Left;

                container.Children.Add(categoryAxisLabel);
                container.Children.Add(categoryAxisBox);
            }
        }

        private Grid ConstructSeriesOptionsGrid(int rowCount, int colCount)
        {
            Grid seriesGrid = new Grid();
            seriesGrid.Margin = new Thickness(0, 10, 0, 0);

            for (int i = 0; i < rowCount; i++)
            {
                RowDefinition rowDef = new RowDefinition();
                rowDef.Height = new GridLength(30, GridUnitType.Pixel);
                seriesGrid.RowDefinitions.Add(rowDef);
            }

            for (int i = 0; i < colCount; i++)
            {
                ColumnDefinition colDef = new ColumnDefinition();
                colDef.Width = new GridLength(250);
                seriesGrid.ColumnDefinitions.Add(colDef);
            }

            seriesGrid.Width = 500;

            return seriesGrid;
        }

        private void AddSeriesToUI(ChartSeriesType selectedSeriesType, Panel container)
        {
            List<ChartConfiguration> seriesConfiguration = requiredChartConfigurations[selectedSeriesType];
            int seriesConfigurationRows = (int)Math.Ceiling((double)seriesConfiguration.Count / 2);
            int rowCount = 2 + seriesConfigurationRows;

            Grid seriesGrid = ConstructSeriesOptionsGrid(rowCount, 2);

            var viewModel = (ChartConfigurationViewModel)this.DataContext;
            var seriesContainerInstance = viewModel.SeriesContainerMap[selectedSeriesType]();

            var seriesConfigurationInstance = viewModel.SeriesConfigurationMap[selectedSeriesType]();
            seriesContainerInstance.Add(seriesConfigurationInstance);

            string seriesContainerName = viewModel.SeriesContainerNameMap[selectedSeriesType];
            int lastSeriesIndex = seriesContainerInstance.Count - 1;

            Label nameLabel = new Label();
            nameLabel.Content = "Series name:";

            Grid.SetRow(nameLabel, 0);
            Grid.SetColumn(nameLabel, 0);
            seriesGrid.Children.Add(nameLabel);
            
            TextBox nameTextBox = new TextBox();
            nameTextBox.SetBinding(TextBox.TextProperty, new Binding(seriesContainerName + "[" + lastSeriesIndex + "].Name"));
            nameTextBox.Width = 200; nameTextBox.Height = 23;

            Grid.SetRow(nameTextBox, 1);
            Grid.SetColumn(nameTextBox, 0);
            seriesGrid.Children.Add(nameTextBox);

            Label colorLabel = new Label();
            colorLabel.Content = "Color:";

            Grid.SetRow(colorLabel, 0);
            Grid.SetColumn(colorLabel, 1);
            seriesGrid.Children.Add(colorLabel);

            TextBox colorTextBox = new TextBox();
            colorTextBox.SetBinding(TextBox.TextProperty, new Binding(seriesContainerName + "[" + lastSeriesIndex + "].Color"));
            colorTextBox.Width = 200; colorTextBox.Height = 23;

            Grid.SetRow(colorTextBox, 1);
            Grid.SetColumn(colorTextBox, 1);
            seriesGrid.Children.Add(colorTextBox);

            int currentRow = 2;
            int currentCol = 0;
            foreach (var configuration in seriesConfiguration)
            {
                Label lbl = new Label();
                lbl.Content = configuration.ToString() + " field*:";
                Grid.SetRow(lbl, currentRow);
                Grid.SetColumn(lbl, currentCol % 2);
                seriesGrid.Children.Add(lbl);

                ComboBox cbox = new ComboBox();
                cbox.SetBinding(ComboBox.SelectedItemProperty, new Binding(seriesContainerName + "[" + lastSeriesIndex + "]." + configuration.ToString()));
                cbox.SetBinding(ComboBox.ItemsSourceProperty, new Binding("SelectedModelFields"));
                cbox.DisplayMemberPath = "PropertyName";
                cbox.Width = 125; cbox.Height = 23;
                cbox.VerticalAlignment = VerticalAlignment.Center;
                cbox.Margin = new Thickness(40, 0, 0, 0);
                cbox.MaxDropDownHeight = 226;
                Grid.SetRow(cbox, currentRow);
                Grid.SetColumn(cbox, currentCol % 2);
                seriesGrid.Children.Add(cbox);

                currentCol += 1;
                if (currentCol % 2 == 0)
                {
                    currentRow += 1;
                }
            }

            Border seriesGridBorder = new Border();
            seriesGridBorder.BorderBrush = new SolidColorBrush(Colors.Gray);
            seriesGridBorder.BorderThickness = new Thickness(1);
            Grid.SetColumn(seriesGridBorder, 0);
            Grid.SetRowSpan(seriesGridBorder, seriesGrid.RowDefinitions.Count);
            Grid.SetColumnSpan(seriesGridBorder, seriesGrid.ColumnDefinitions.Count);

            seriesGrid.Children.Add(seriesGridBorder);

            container.Children.Add(seriesGrid);
        }

        private void ClearAllSeriesInModel()
        {
            ChartConfigurationViewModel viewModel = (ChartConfigurationViewModel)this.DataContext;

            viewModel.AreaLikeSeries.Clear();
            viewModel.BoxPlotSeries.Clear();
            viewModel.BubbleSeries.Clear();
            viewModel.BulletLikeSeries.Clear();
            viewModel.CandlestickLikeSeries.Clear();
            viewModel.PieLikeSeries.Clear();
            viewModel.RangeSeries.Clear();
            viewModel.ScatterLikeSeries.Clear();
            viewModel.WatterfallLikeSeries.Clear();
        }

        private void AddSeriesButton_Click(object sender, RoutedEventArgs e)
        {
            ChartSeriesType selectedSeries = (ChartSeriesType)SeriesType.SelectedItem;
            AddSeriesToUI(selectedSeries, SeriesOptionsPanel);
        }

        private void LegendPosition_Loaded(object sender, RoutedEventArgs e)
        {
            LegendPosition.ItemsSource = Enum.GetValues(typeof(ChartLegendPosition)).Cast<ChartLegendPosition>();
            LegendPosition.SelectedItem = "LegendPosition";
        }

        private void ShowLegend_Clicked(object sender, RoutedEventArgs e)
        {
            CheckBox checkbox = (CheckBox)sender;

            if (checkbox.IsChecked.Value == true)
            {
                LegendPositionLabel.Visibility = Visibility.Visible;
                LegendPosition.Visibility = Visibility.Visible;
            }
            else
            {
                LegendPositionLabel.Visibility = Visibility.Hidden;
                LegendPosition.Visibility = Visibility.Hidden;
            }
        }

        private void LegendPosition_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ChartLegendPosition selectedPosition = (ChartLegendPosition)LegendPosition.SelectedItem;
            var viewModel = (ChartConfigurationViewModel)this.DataContext;
            viewModel.LegendPosition = selectedPosition;
        }
    }
}
