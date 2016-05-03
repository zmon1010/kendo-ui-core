using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using KendoScaffolder.UI.Models;
//using Microsoft.VisualStudio.PlatformUI;

namespace KendoScaffolder.UI
{
    /// <summary>
    /// Interaction logic
    /// </summary>
    public partial class TreeViewConfigurationWindow : Window
    {
        public const string WebTreeViewTitle = "Kendo UI TreeView";
        public const string MvcTreeViewTitle = "Telerik ASP.NET MVC TreeView";

        public TreeViewConfigurationWindow(TreeViewConfigurationViewModel viewModel)
        {
            WindowStartupLocation = WindowStartupLocation.CenterScreen;

            InitializeComponent();

            TreeViewEventsListBox.SelectionChanged += TreeViewEventsListBoxSelectionChanged;

            if (viewModel.ViewType == ViewType.MVC)
            {
                WidgetTitle.Text = MvcTreeViewTitle;
                this.Title = MvcTreeViewTitle;
            }
            else
            {
                WidgetTitle.Text = WebTreeViewTitle;
                this.Title = WebTreeViewTitle;
            }

            DataContext = viewModel;
        }

        private static void TreeViewEventsListBoxSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var TreeViewEventsListBox = sender as ListBox;
            if (TreeViewEventsListBox == null) return;

            var viewModel = TreeViewEventsListBox.DataContext as TreeViewConfigurationViewModel;
            if (viewModel == null) return;

            viewModel.SelectedTreeViewEvents.Clear();

            foreach (CheckBoxListItem item in TreeViewEventsListBox.SelectedItems)
            {
                viewModel.SelectedTreeViewEvents.Add(item.Text);
            }
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
        }

        private void ControllerName_Loaded(object sender, System.Windows.RoutedEventArgs e)
        {
            TextBox current = ((TextBox)sender);
            current.Text = "TreeViewController";
            current.Focus();
            current.Select(0, 8);
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

        private void ToggleAddButtonState()
        {
            if (ModelType.SelectedValue != null && DataContextClass.SelectedValue != null)
            {
                AddButton.IsEnabled = true;
            }
            else
            {
                AddButton.IsEnabled = false;
            }
        }

        private void TreeViewEventsCheckbox_Clicked(object sender, RoutedEventArgs e)
        {
            CheckBox cb = sender as CheckBox;
            var item = cb.DataContext;

            if (cb.IsChecked.Value)
            {
                TreeViewEventsListBox.SelectedItems.Add(item);
            }
            else
            {
                TreeViewEventsListBox.SelectedItems.Remove(item);
            }
        }
    }
}
