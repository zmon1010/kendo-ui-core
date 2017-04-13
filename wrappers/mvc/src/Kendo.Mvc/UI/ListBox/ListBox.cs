namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class ListBox : WidgetBase
    {
        private readonly ListBoxSettingsSerializer settingsSerializer;

        public IUrlGenerator UrlGenerator { get; private set; }

        public string DataSourceId { get; set; }

        public DataSource DataSource { get; private set; }

        public ListBoxSelectable? Selectable { get; set; }

        public ListBox(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            settingsSerializer = new ListBoxSettingsSerializer(this);
            UrlGenerator = urlGenerator;
            DataSource = new DataSource();

//>> Initialization
        
            Draggable = new ListBoxDraggableSettings();
                
            Messages = new ListBoxMessagesSettings();
                
            Toolbar = new ListBoxToolbarSettings();
                
        //<< Initialization
        }

//>> Fields
        
        public bool? AutoBind { get; set; }
        
        public string ConnectWith { get; set; }
        
        public string DataTextField { get; set; }
        
        public string DataValueField { get; set; }
        
        public bool? Disabled { get; set; }
        
        public string Hint { get; set; }
        
        public ListBoxDraggableSettings Draggable
        {
            get;
            set;
        }
        
        public string[] DropSources { get; set; }
        
        public double? Height { get; set; }
        
        public bool? Navigatable { get; set; }
        
        public ListBoxMessagesSettings Messages
        {
            get;
            set;
        }
        
        public bool? Reorderable { get; set; }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        public ListBoxToolbarSettings Toolbar
        {
            get;
            set;
        }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

//>> Serialization
        
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            if (ConnectWith.HasValue())
            {
                json["connectWith"] = ConnectWith;
            }
            
            if (DataTextField.HasValue())
            {
                json["dataTextField"] = DataTextField;
            }
            
            if (DataValueField.HasValue())
            {
                json["dataValueField"] = DataValueField;
            }
            
            if (Disabled.HasValue)
            {
                json["disabled"] = Disabled;
            }
                
            if (Hint.HasValue())
            {
                json["hint"] = Hint;
            }
            
            var draggable = Draggable.ToJson();
            if (draggable.Any())
            {
                json["draggable"] = draggable;
            } else if (Draggable.Enabled != false) {
                json["draggable"] = Draggable.Enabled;
            }

            if (DropSources != null)
            {
                json["dropSources"] = DropSources;
            }
            
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
            if (Navigatable.HasValue)
            {
                json["navigatable"] = Navigatable;
            }
                
            var messages = Messages.ToJson();
            if (messages.Any())
            {
                json["messages"] = messages;
            }
            if (Reorderable.HasValue)
            {
                json["reorderable"] = Reorderable;
            }
                
            if (!string.IsNullOrEmpty(TemplateId))
            {
                json["template"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()",
                        TemplateId
                    )
                };
            }
            else if (!string.IsNullOrEmpty(Template))
            {
                json["template"] = Template;
            }
                
            var toolbar = Toolbar.ToJson();
            if (toolbar.Any())
            {
                json["toolbar"] = toolbar;
            }
        //<< Serialization

            // Manually serialized settings go here
            settingsSerializer.Serialize(json);

            writer.Write(Initializer.Initialize(Selector, "ListBox", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new ListBoxHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

