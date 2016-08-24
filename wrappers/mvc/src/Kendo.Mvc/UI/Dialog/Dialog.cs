namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class Dialog : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public Dialog(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
            Actions = new List<DialogAction>();
                
            Messages = new DialogMessagesSettings();
                
        //<< Initialization

            Animation = new PopupAnimation();
        }

        public PopupAnimation Animation
        {
            get;
            set;
        }
        //>> Fields
        
        public List<DialogAction> Actions
        {
            get;
            set;
        }
        
        public string ButtonLayout { get; set; }
        
        public bool? Closable { get; set; }
        
        public string Content { get; set; }
        
        public double? Height { get; set; }
        
        public double? MaxHeight { get; set; }
        
        public double? MaxWidth { get; set; }
        
        public DialogMessagesSettings Messages
        {
            get;
            set;
        }
        
        public double? MinHeight { get; set; }
        
        public double? MinWidth { get; set; }
        
        public bool? Modal { get; set; }
        
        public string Title { get; set; }
        
        public bool? Visible { get; set; }
        
        public double? Width { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

            var animation = Animation.ToJson();

            if (animation.Any())
            {
                if (animation["animation"] is bool)
                {
                    json["animation"] = false;
                }
                else
                {
                    json["animation"] = animation["animation"];
                }
            }

            //>> Serialization
        
            var actions = Actions.ToJson();
            if (actions.Any())
            {
                json["actions"] = actions;
            }
            if (ButtonLayout.HasValue())
            {
                json["buttonLayout"] = ButtonLayout;
            }
            
            if (Closable.HasValue)
            {
                json["closable"] = Closable;
            }
                
            if (Content.HasValue())
            {
                json["content"] = Content;
            }
            
            if (Height.HasValue)
            {
                json["height"] = Height;
            }
                
            if (MaxHeight.HasValue)
            {
                json["maxHeight"] = MaxHeight;
            }
                
            if (MaxWidth.HasValue)
            {
                json["maxWidth"] = MaxWidth;
            }
                
            var messages = Messages.ToJson();
            if (messages.Any())
            {
                json["messages"] = messages;
            }
            if (MinHeight.HasValue)
            {
                json["minHeight"] = MinHeight;
            }
                
            if (MinWidth.HasValue)
            {
                json["minWidth"] = MinWidth;
            }
                
            if (Modal.HasValue)
            {
                json["modal"] = Modal;
            }
                
            if (Title.HasValue())
            {
                json["title"] = Title;
            }
            
            if (Visible.HasValue)
            {
                json["visible"] = Visible;
            }
                
            if (Width.HasValue)
            {
                json["width"] = Width;
            }
                
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "Dialog", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new DialogHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}

