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
using System.Windows;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace KendoScaffolder.UI
{
    /// <summary>
    /// Interaction logic
    /// </summary>
    public partial class GridConfigurationWindow : Window
    {
        public GridConfigurationWindow(GridConfigurationViewModel viewModel)
        {
            InitializeComponent();

            DataContext = viewModel;
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
        }

        private void Editable_Clicked(object sender, RoutedEventArgs e)
        {
            if (EditMode.Visibility == Visibility.Visible)
            {
                EditMode.Visibility = Visibility.Hidden;
                EditModeLabel.Visibility = Visibility.Hidden;
                CrudOperationsLabel.Visibility = Visibility.Hidden;
                EditableCreate.Visibility = Visibility.Hidden;
                EditableUpdate.Visibility = Visibility.Hidden;
                EditableDestroy.Visibility = Visibility.Hidden;
            }
            else
            {
                EditMode.Visibility = Visibility.Visible;
                EditModeLabel.Visibility = Visibility.Visible;
                CrudOperationsLabel.Visibility = Visibility.Visible;
                EditableCreate.Visibility = Visibility.Visible;
                EditableUpdate.Visibility = Visibility.Visible;
                EditableDestroy.Visibility = Visibility.Visible;
            }
        }

        private void UseViewModel_Clicked(object sender, RoutedEventArgs e)
        {
            if (ViewModelType.Visibility == Visibility.Visible)
            {
                ViewModelType.Visibility = Visibility.Hidden;
                ViewModelTypeLabel.Visibility = Visibility.Hidden;
            }
            else
            {
                ViewModelType.Visibility = Visibility.Visible;
                ViewModelTypeLabel.Visibility = Visibility.Visible;
            }
        }

        private void ControllerName_Loaded(object sender, System.Windows.RoutedEventArgs e)
        {
            TextBox current = ((TextBox)sender);
            current.Text = "GridController";
            current.Focus();
            current.Select(0, 4);
        }
    }
}
