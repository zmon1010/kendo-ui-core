namespace KendoScaffolder.UI
{
    using KendoScaffolder.UI.Models;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Windows;
    using System.Windows.Controls;
    using System.Windows.Documents;

    /// <summary>
    /// Interaction logic for SchedulerConfigurationWindow.xaml
    /// </summary>
    public partial class SchedulerConfigurationWindow : Window
    {
        public SchedulerConfigurationWindow(SchedulerConfigurationViewModel viewModel)
        {
            WindowStartupLocation = WindowStartupLocation.CenterScreen;

            InitializeComponent();

            SchedulerEventsListBox.SelectionChanged += SchedulerEventsListBoxSelectionChanged;
            SchedulerViewsListBox.SelectionChanged += SchedulerViewsListBoxSelectionChanged;
            ValidationErrors = new ObservableCollection<ValidationError>();
            DataContext = viewModel;
        }

        private static void SchedulerEventsListBoxSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var schedulerEventsListBox = sender as ListBox;
            if (schedulerEventsListBox == null) return;

            var viewModel = schedulerEventsListBox.DataContext as SchedulerConfigurationViewModel;
            if (viewModel == null) return;

            viewModel.SelectedSchedulerEvents.Clear();

            foreach (CheckBoxListItem item in schedulerEventsListBox.SelectedItems)
            {
                viewModel.SelectedSchedulerEvents.Add(item.Text);
            }
        }

        private static void SchedulerViewsListBoxSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var schedulerViewsListBox = sender as ListBox;
            if (schedulerViewsListBox == null) return;

            var viewModel = schedulerViewsListBox.DataContext as SchedulerConfigurationViewModel;
            if (viewModel == null) return;

            viewModel.SelectedSchedulerViewTypes.Clear();

            foreach (CheckBoxListItem item in schedulerViewsListBox.SelectedItems)
            {
                viewModel.SelectedSchedulerViewTypes.Add(item.Text);
            }
        }

        public ObservableCollection<ValidationError> ValidationErrors { get; private set; }

        private void Window_Error(object sender, ValidationErrorEventArgs e)
        {
            if (e.Action == ValidationErrorEventAction.Added)
            {
                ValidationErrors.Add(e.Error);
            }
            else
            {
                ValidationErrors.Remove(e.Error);
            }
        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = true;
        }

        private void ModelType_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ((SchedulerConfigurationViewModel)DataContext).UpdateModelFieldCollections();

            ToggleModelFieldEditorsState(true);

            ToggleAddButtonState();
        }
        private void RequiredField_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ToggleAddButtonState();
        }

        public void RequiredEventField_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ToggleAddButtonState();
        }

        private void ResourceModelType_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ((SchedulerConfigurationViewModel)DataContext).UpdateResourceModelFieldCollection();

            ToggleAddButtonState();
        }

        public void ResourceField_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            ToggleAddButtonState();
        }

        private void SchedulerEventsCheckbox_Clicked(object sender, RoutedEventArgs e)
        {
            CheckBox cb = (CheckBox)sender;
            var item = cb.DataContext;

            if (cb.IsChecked.Value)
            {
                SchedulerEventsListBox.SelectedItems.Add(item);
            }
            else
            {
                SchedulerEventsListBox.SelectedItems.Remove(item);
            }
        }

        private void SchedulerViewTypesCheckbox_Loaded(object sender, RoutedEventArgs e)
        {
            CheckBox cb = (CheckBox)sender;
            CheckBoxListItem item = cb.DataContext as CheckBoxListItem;
           
            if (item != null)
            {
                int index = ((SchedulerConfigurationViewModel)DataContext)
                    .SelectedSchedulerViewTypes
                    .IndexOf(item.Text);

                if (index > -1)
                {
                    cb.IsChecked = true;
                    item.Checked = true;
                    SchedulerViewsListBox.SelectedItems.Add(item);
                }
            }
        }

        private void SchedulerViewTypesCheckbox_Clicked(object sender, RoutedEventArgs e)
        {
            CheckBox cb = (CheckBox)sender;
            var item = cb.DataContext;

            if (cb.IsChecked.Value)
            {
                SchedulerViewsListBox.SelectedItems.Add(item);
            }
            else
            {
                SchedulerViewsListBox.SelectedItems.Remove(item);
            }
        }

        private void UseResources_Click(object sender, RoutedEventArgs e)
        {
            Visibility visible;

            if (UseResources.IsChecked == true)
            {
                visible = Visibility.Visible;
            }
            else
            {
                visible = Visibility.Hidden;
            }

            ModelResourceField.Visibility = visible;
            ModelResourceFieldLabel.Visibility = visible;
            ResourceModelTypeLabel.Visibility = visible;
            ResourceModelType.Visibility = visible;

            List<string> resourceFields = ((SchedulerConfigurationViewModel)DataContext).SchedulerResourceFields;

            foreach (string field in resourceFields)
            {
                string fieldName = field.Replace("Selected", "");
                ((ComboBox)this.FindName(fieldName)).Visibility = visible;
                ((Label)this.FindName(fieldName + "Label")).Visibility = visible;
            }

            ToggleAddButtonState();
        }

        private void ToggleAddButtonState()
        {
            if (ValidationErrors.Count > 0)
            {
                AddButton.IsEnabled = false;
            }
            else
            {
                AddButton.IsEnabled = true;
            }
        }

        private void ToggleModelFieldEditorsState(bool toggle)
        {
            Visibility visible;

            if (toggle == true)
            {
                visible = Visibility.Visible;
            }
            else
            {
                visible = Visibility.Hidden;
            }

            List<string> eventFields = ((SchedulerConfigurationViewModel)DataContext).SchedulerEventFields;
            foreach (string field in eventFields)
            {
                string fieldName = field.Replace("Selected", "");
                ((ComboBox)this.FindName(fieldName)).Visibility = visible;
                ((Label)this.FindName(fieldName + "Label")).Visibility = visible;
            }

            ModelMappingsLabel.Visibility = visible;
        }

        private void ControllerName_Loaded(object sender, System.Windows.RoutedEventArgs e)
        {
            TextBox current = ((TextBox)sender);
            current.Text = "SchedulerController";
            current.Focus();
            current.Select(0, 4);
        }

        private void ViewName_Loaded(object sender, System.Windows.RoutedEventArgs e)
        {
            TextBox current = ((TextBox)sender);
            current.Text = "Index";
        }
    }
}
