namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class GanttEditableSettings : JsonObject
    {
        public GanttEditableSettings()
        {
            Enabled = true;
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public bool? Confirmation { get; set; }
        
        public bool? Create { get; set; }
        
        public bool? DependencyCreate { get; set; }
        
        public bool? DependencyDestroy { get; set; }
        
        public bool? DragPercentComplete { get; set; }
        
        public bool? Destroy { get; set; }
        
        public bool? Move { get; set; }
        
        public bool? Reorder { get; set; }
        
        public bool? Resize { get; set; }
        
        public string Template { get; set; }

        public string TemplateId { get; set; }
        
        public bool? Update { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Confirmation.HasValue)
            {
                json["confirmation"] = Confirmation;
            }
                
            if (Create.HasValue)
            {
                json["create"] = Create;
            }
                
            if (DependencyCreate.HasValue)
            {
                json["dependencyCreate"] = DependencyCreate;
            }
                
            if (DependencyDestroy.HasValue)
            {
                json["dependencyDestroy"] = DependencyDestroy;
            }
                
            if (DragPercentComplete.HasValue)
            {
                json["dragPercentComplete"] = DragPercentComplete;
            }
                
            if (Destroy.HasValue)
            {
                json["destroy"] = Destroy;
            }
                
            if (Move.HasValue)
            {
                json["move"] = Move;
            }
                
            if (Reorder.HasValue)
            {
                json["reorder"] = Reorder;
            }
                
            if (Resize.HasValue)
            {
                json["resize"] = Resize;
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
                
            if (Update.HasValue)
            {
                json["update"] = Update;
            }
                
        //<< Serialization
        }
    }
}
