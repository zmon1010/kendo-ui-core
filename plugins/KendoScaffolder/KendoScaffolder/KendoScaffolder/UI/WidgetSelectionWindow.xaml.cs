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
using System.Resources;

namespace KendoScaffolder.UI
{
    public partial class WidgetSelectionWindow : Window
    {
        private const string WidgetNamePlaceHolder = "$WIDGET";

        private readonly ResourceManager rm;

        public KendoWidget SelectedWidget { get; set; }

        public ViewType SelectedViewType { get; set; }

        public WidgetSelectionWindow()
        {
            WindowStartupLocation = WindowStartupLocation.CenterScreen;

            rm = new ResourceManager("KendoScaffolder.Resources", this.GetType().Assembly);

            InitializeComponent();

            WidgetsListView.SelectedIndex = 0;
            WidgetsListView.Focus();
        }

        private void WidgetsListView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ListBoxItem item = ((sender as ListBox).SelectedItem as ListBoxItem);
            string widgetDescription = String.Empty;

            switch (item.Name) 
            {
                case "WidgetsListViewGridItem":
                    SelectedWidget = KendoWidget.Grid;
                    SelectedViewType = ViewType.MVC;
                    WidgetName.Text = "UI for MVC Grid";
                    widgetDescription = rm.GetString("GridDescription");
                    WidgetDescription.Text = widgetDescription.Replace(WidgetNamePlaceHolder, WidgetName.Text);
                    return;

                case "WidgetsListViewWebGridItem":
                    SelectedWidget = KendoWidget.Grid;
                    SelectedViewType = ViewType.Web;
                    WidgetName.Text = "Kendo UI Grid";
                    widgetDescription = rm.GetString("GridDescription");
                    WidgetDescription.Text = widgetDescription.Replace(WidgetNamePlaceHolder, WidgetName.Text);
                    return;

                case "WidgetsListViewChartItem":
                    SelectedWidget = KendoWidget.Chart;
                    SelectedViewType = ViewType.MVC;
                    WidgetName.Text = "UI for MVC Chart";
                    widgetDescription = rm.GetString("ChartDescription");
                    WidgetDescription.Text = widgetDescription.Replace(WidgetNamePlaceHolder, WidgetName.Text);
                    return;

                case "WidgetsListViewWebChartItem":
                    SelectedWidget = KendoWidget.Chart;
                    SelectedViewType = ViewType.Web;
                    WidgetName.Text = "Kendo UI Chart";
                    widgetDescription = rm.GetString("ChartDescription");
                    WidgetDescription.Text = widgetDescription.Replace(WidgetNamePlaceHolder, WidgetName.Text);
                    return;

                case "WidgetsListViewSchedulerItem":
                    SelectedWidget = KendoWidget.Scheduler;
                    SelectedViewType = ViewType.MVC;
                    WidgetName.Text = "UI for MVC Scheduler";
                    widgetDescription = rm.GetString("SchedulerDescription");
                    WidgetDescription.Text = widgetDescription.Replace(WidgetNamePlaceHolder, WidgetName.Text);
                    return;

                case "WidgetsListViewWebSchedulerItem":
                    SelectedWidget = KendoWidget.Scheduler;
                    SelectedViewType = ViewType.Web;
                    WidgetName.Text = "Kendo UI Scheduler";
                    widgetDescription = rm.GetString("SchedulerDescription");
                    WidgetDescription.Text = widgetDescription.Replace(WidgetNamePlaceHolder, WidgetName.Text);
                    return;

                case "WidgetsListViewTreeViewItem":
                    SelectedWidget = KendoWidget.TreeView;
                    SelectedViewType = ViewType.MVC;
                    WidgetName.Text = "UI for MVC TreeView";
                    widgetDescription = rm.GetString("TreeViewDescription");
                    WidgetDescription.Text = widgetDescription.Replace(WidgetNamePlaceHolder, WidgetName.Text);
                    return;

                case "WidgetsListViewWebTreeViewItem":
                    SelectedWidget = KendoWidget.TreeView;
                    SelectedViewType = ViewType.Web;
                    WidgetName.Text = "Kendo UI TreeView";
                    widgetDescription = rm.GetString("TreeViewDescription");
                    WidgetDescription.Text = widgetDescription.Replace(WidgetNamePlaceHolder, WidgetName.Text);
                    return;
            }
        }

        private void WidgetsListView_MouseDoubleClick(object sender, MouseButtonEventArgs e)
        {
            this.DialogResult = true;
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
        }
    }
}
