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

            switch (item.Name) 
            {
                case "WidgetsListViewGridItem":
                    SelectedWidget = KendoWidget.Grid;
                    SelectedViewType = ViewType.MVC;
                    WidgetName.Text = "Kendo UI Grid";
                    WidgetDescription.Text = rm.GetString("GridDescription");
                    return;

                case "WidgetsListViewWebGridItem":
                    SelectedWidget = KendoWidget.Grid;
                    SelectedViewType = ViewType.Web;
                    WidgetName.Text = "Kendo UI Grid";
                    WidgetDescription.Text = rm.GetString("GridDescription");
                    return;

                case "WidgetsListViewChartItem":
                    SelectedWidget = KendoWidget.Chart;
                    SelectedViewType = ViewType.MVC;
                    WidgetName.Text = "Kendo UI Chart";
                    WidgetDescription.Text = rm.GetString("ChartDescription");
                    return;
            }
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
        }
    }
}
