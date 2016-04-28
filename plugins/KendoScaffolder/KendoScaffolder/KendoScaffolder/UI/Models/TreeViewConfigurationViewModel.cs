using Microsoft.AspNet.Scaffolding;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KendoScaffolder.UI.Models
{
    public enum TreeViewEvents
    {
        Error, Push, RequestEnd, RequestStart, Sync
    }

    public class TreeViewConfigurationViewModel : DataSourceBoundWidgetViewModel
    {
        public List<string> SelectedTreeViewEvents { get; set; }

        public TreeViewConfigurationViewModel(CodeGenerationContext context)
            : base(context)
        {
            SelectedTreeViewEvents = new List<string>();
            DataTextField = "";
            DataUrlField = "";
            ParentIdFieldName = "ParentId";
            HasChildrenFieldName = "";
        }
        public IEnumerable<CheckBoxListItem> TreeViewEvents
        {
            get
            {
                return Enum.GetValues(typeof(TreeViewEvents))
                           .Cast<TreeViewEvents>()
                           .Select(ev => new CheckBoxListItem
                           {
                               Checked = false,
                               Text = ev.ToString()
                           });
            }
        }
        public bool Animation
        {
            get;
            set;
        }
        public string DataTextField
        {
            get;
            set;
        }
        public string DataUrlField
        {
            get;
            set;
        }
        public string ParentIdFieldName
        {
            get;
            set;
        }
        public string HasChildrenFieldName
        {
            get;
            set;
        }
    }
}
