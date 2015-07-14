namespace KendoScaffolder.UI.Models
{
    using Microsoft.AspNet.Scaffolding;
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.ComponentModel;
    using System.Globalization;
    using System.Linq;

    public class SchedulerConfigurationViewModel : DataSourceBoundWidgetViewModel, INotifyPropertyChanged 
    {
        public SchedulerConfigurationViewModel(CodeGenerationContext context)
            : base(context)
        {
            EditableCreate = true;
            EditableDestroy = true;
            EditableUpdate = true;
            EditableResize = true;
            EditableMove = true;

            ModelStringFields = new ObservableCollection<ModelType>();
            ModelBoolFields = new ObservableCollection<ModelType>();
            ModelDateTimeFields = new ObservableCollection<ModelType>();
            ModelFields = new ObservableCollection<ModelType>();
            ResourceModelFields = new ObservableCollection<ModelType>();
            ResourceModelStringFields = new ObservableCollection<ModelType>();

            SelectedSchedulerEvents = new List<string>();
            SelectedSchedulerViewTypes = new List<string>() {
                    KendoScaffolder.UI.Models.SchedulerViewTypes.Day.ToString(),
                    KendoScaffolder.UI.Models.SchedulerViewTypes.Week.ToString()
            };
            SelectedDataSourceType = SchedulerDataSourceTypes.Ajax.ToString();

            SchedulerEventFields = this.GetType()
                .GetProperties()
                .Where(prop => prop.Name.Contains("SelectedEvent"))
                .Select(prop => prop.Name)
                .ToList();

            SchedulerResourceFields = this.GetType()
                .GetProperties()
                .Where(prop => prop.Name.Contains("SelectedResourceData"))
                .Select(prop => prop.Name)
                .ToList();
        }

        public string SelectedDataSourceType { get; set; }
        public IEnumerable<string> DataSourceTypes
        {
            get
            {
                return Enum.GetValues(typeof(SchedulerDataSourceTypes))
                           .Cast<SchedulerDataSourceTypes>()
                           .Select(ev => ev.ToString());
            }
        }

        public bool EditableCreate { get; set; }
        public bool EditableUpdate { get; set; }
        public bool EditableDestroy { get; set; }
        public bool EditableMove { get; set; }
        public bool EditableResize { get; set; }

        public bool PdfExport { get; set; }
        public bool Selectable { get; set; }
        public bool Footer { get; set; }

        public List<string> SelectedSchedulerViewTypes { get; set; }
        public IEnumerable<CheckBoxListItem> SchedulerViewTypes
        {
            get
            {
                return Enum.GetValues(typeof(SchedulerViewTypes))
                           .Cast<SchedulerViewTypes>()
                           .Select(ev => new CheckBoxListItem
                           {
                               Checked = false,
                               Text = ev.ToString()
                           });
            }
        }

        public List<string> SelectedSchedulerEvents { get; set; }
        public IEnumerable<CheckBoxListItem> SchedulerEvents
        {
            get
            {
                return Enum.GetValues(typeof(SchedulerEvents))
                           .Cast<SchedulerEvents>()
                           .Select(ev => new CheckBoxListItem
                           {
                               Checked = false,
                               Text = ev.ToString()
                           });
            }
        }

        public List<string> SchedulerEventFields { get; private set; }
        public List<string> SchedulerResourceFields { get; private set; }

        public ObservableCollection<ModelType> ModelFields { get; set; }
        public ObservableCollection<ModelType> ModelStringFields { get; set; }
        public ObservableCollection<ModelType> ModelBoolFields { get; set; }
        public ObservableCollection<ModelType> ModelDateTimeFields { get; set; }

        public ObservableCollection<ModelType> ResourceModelFields { get; set; }
        public ObservableCollection<ModelType> ResourceModelStringFields { get; set; }

        private ModelType selectedEventTitleField { get; set; }
        public ModelType SelectedEventTitleField 
        {
            get
            {
                return selectedEventTitleField;
            }
            set
            {
                if (selectedEventTitleField != value)
                {
                    selectedEventTitleField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventTitleField");
                }
            }
        }

        private ModelType selectedEventStartField { get; set; }
        public ModelType SelectedEventStartField
        {
            get
            {
                return selectedEventStartField;
            }
            set
            {
                if (selectedEventStartField != value)
                {
                    selectedEventStartField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventStartField");
                }
            }
        }

        private ModelType selectedEventEndField { get; set; }
        public ModelType SelectedEventEndField
        {
            get
            {
                return selectedEventEndField;
            }
            set
            {
                if (selectedEventEndField != value)
                {
                    selectedEventEndField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventEndField");
                }
            }
        }

        private ModelType selectedEventDescriptionField { get; set; }
        public ModelType SelectedEventDescriptionField
        {
            get
            {
                return selectedEventDescriptionField;
            }
            set
            {
                if (selectedEventDescriptionField != value)
                {
                    selectedEventDescriptionField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventDescriptionField");
                }
            }
        }

        private ModelType selectedEventIsAllDayField { get; set; }
        public ModelType SelectedEventIsAllDayField
        {
            get
            {
                return selectedEventIsAllDayField;
            }
            set
            {
                if (selectedEventIsAllDayField != value)
                {
                    selectedEventIsAllDayField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventIsAllDayField");
                }
            }
        }

        private ModelType selectedEventStartTimezoneField { get; set; }
        public ModelType SelectedEventStartTimezoneField
        {
            get
            {
                return selectedEventStartTimezoneField;
            }
            set
            {
                if (selectedEventStartTimezoneField != value)
                {
                    selectedEventStartTimezoneField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventStartTimezoneField");
                }
            }
        }

        private ModelType selectedEventEndTimezoneField { get; set; }
        public ModelType SelectedEventEndTimezoneField
        {
            get
            {
                return selectedEventEndTimezoneField;
            }
            set
            {
                if (selectedEventEndTimezoneField != value)
                {
                    selectedEventEndTimezoneField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventEndTimezoneField");
                }
            }
        }

        private ModelType selectedEventRecurrenceIDField { get; set; }
        public ModelType SelectedEventRecurrenceIDField
        {
            get
            {
                return selectedEventRecurrenceIDField;
            }
            set
            {
                if (selectedEventRecurrenceIDField != value)
                {
                    selectedEventRecurrenceIDField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventRecurrenceIDField");
                }
            }
        }

        private ModelType selectedEventRecurrenceRuleField { get; set; }
        public ModelType SelectedEventRecurrenceRuleField
        {
            get
            {
                return selectedEventRecurrenceRuleField;
            }
            set
            {
                if (selectedEventRecurrenceRuleField != value)
                {
                    selectedEventRecurrenceRuleField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventRecurrenceRuleField");
                }
            }
        }

        private ModelType selectedEventRecurrenceExceptionField { get; set; }
        public ModelType SelectedEventRecurrenceExceptionField
        {
            get
            {
                return selectedEventRecurrenceExceptionField;
            }
            set
            {
                if (selectedEventRecurrenceExceptionField != value)
                {
                    selectedEventRecurrenceExceptionField = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedEventRecurrenceExceptionField");
                }
            }
        }

        public ModelType SelectedModelResourceField { get; set; }

        private bool useResources { get; set; }
        public bool UseResources
        {
            get
            {
                return useResources;
            }

            set
            {
                if (useResources != value)
                {
                    useResources = value;
                    RaisePropertyChanged("SelectedModelResourceField");
                    RaisePropertyChanged("SelectedResourceModelType");
                }
            }
        }

        public ModelType SelectedResourceModelType { get; set; }

        private ModelType selectedResourceDataTextField { get; set; }
        public ModelType SelectedResourceDataTextField
        {
            get
            {
                return selectedResourceDataTextField;
            }
            set
            {
                if (selectedResourceDataTextField != value)
                {
                    selectedResourceDataTextField = value;
                    RaisePropertyChangeOnOtherResourceFields("SelectedResourceDataTextField");
                }
            }
        }

        private ModelType selectedResourceDataValueField { get; set; }
        public ModelType SelectedResourceDataValueField
        {
            get
            {
                return selectedResourceDataValueField;
            }
            set
            {
                if (selectedResourceDataValueField != value)
                {
                    selectedResourceDataValueField = value;
                    RaisePropertyChangeOnOtherResourceFields("SelectedResourceDataTextField");
                }
            }
        }

        private ModelType selectedResourceDataColorField { get; set; }
        public ModelType SelectedResourceDataColorField
        {
            get
            {
                return selectedResourceDataColorField;
            }
            set
            {
                if (selectedResourceDataColorField != value)
                {
                    selectedResourceDataColorField = value;
                    RaisePropertyChangeOnOtherResourceFields("SelectedResourceDataTextField");
                }
            }
        }

        private ModelType selectedModelType { get; set; }
        public override ModelType SelectedModelType
        {
            get
            {
                return selectedModelType;
            }

            set
            {
                if (selectedModelType != value)
                {
                    selectedModelType = value;
                    RaisePropertyChangeOnOtherEventFields("SelectedModelType");
                }
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        private void RaisePropertyChanged(string name)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(name));
            }
        }

        private void RaisePropertyChangeOnOtherEventFields(string currentFieldName)
        {
            foreach (string item in SchedulerEventFields)
            {
                if (item != currentFieldName)
                {
                    RaisePropertyChanged(item);
                }
            }
        }

        private void RaisePropertyChangeOnOtherResourceFields(string currentFieldName)
        {
            foreach (string item in SchedulerResourceFields)
            {
                if (item != currentFieldName)
                {
                    RaisePropertyChanged(item);
                }
            }
        }

        public void UpdateModelFieldCollections() 
        {
            RemoveAll(ModelStringFields);
            RemoveAll(ModelBoolFields);
            RemoveAll(ModelDateTimeFields);
            RemoveAll(ModelFields);

            if (SelectedModelType != null)
            {
                var selectedModelFields = SelectedModelType.CodeType.Children;

                foreach (EnvDTE.CodeElement child in selectedModelFields)
                {
                    if (child.Kind == EnvDTE.vsCMElement.vsCMElementProperty) {
                        var prop = child as EnvDTE.CodeProperty;
                        var type = prop.Getter.Type.AsString;

                        ObservableCollection<ModelType> collection = null;
                        switch (type)
                        {
                            case "string":
                                collection = ModelStringFields;
                                break;
                            case "bool":
                                collection = ModelBoolFields;
                                break;
                            case "System.DateTime":
                                collection = ModelDateTimeFields;
                                break;
                        }

                        ModelType modelField = CreateModelType(prop);

                        ModelFields.Add(modelField);

                        if (collection != null)
                        {
                            collection.Add(modelField);
                        }
                    }
                }
            }
        }

        public void UpdateResourceModelFieldCollection()
        {
            RemoveAll(ResourceModelFields);
            RemoveAll(ResourceModelStringFields);

            if (SelectedResourceModelType != null)
            {
                var selectedResourceModelFields = SelectedResourceModelType.CodeType.Children;

                foreach (EnvDTE.CodeElement child in selectedResourceModelFields)
                {
                    if (child.Kind == EnvDTE.vsCMElement.vsCMElementProperty)
                    {
                        var prop = child as EnvDTE.CodeProperty;
                        var type = prop.Getter.Type.AsString;

                        if (type == "int" || type == "System.Guid")
                        {
                            ResourceModelFields.Add(CreateModelType(prop));
                        }
                        else if (type == "string")
                        {
                            ModelType modelField = CreateModelType(prop);
                            ResourceModelFields.Add(modelField);
                            ResourceModelStringFields.Add(modelField);
                        }
                    }
                }
            }
        }

        private static ModelType CreateModelType(EnvDTE.CodeProperty prop)
        {
            return new ModelType()
            {
                TypeName = prop.FullName,
                ShortTypeName = prop.Name,
                DisplayName = prop.FullName == null
                ? prop.Name
                : String.Format(CultureInfo.InvariantCulture, "{0} ({1})", prop.Name, prop.FullName)
            };
        }

        private void RemoveAll(ObservableCollection<ModelType> collection)
        {
            var items = collection.ToList();
            foreach (var item in items)
            {
                collection.Remove(item);
            }
        }
    }
}
