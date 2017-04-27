namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo ListBox for ASP.NET MVC events.
    /// </summary>
    public class ListBoxEventBuilder: EventBuilder
    {
        public ListBoxEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        //>> Handlers
        
        /// <summary>
        /// Fires before an item is added to the ListBox.The function context of the event handler (available through the this keyword) that will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the add event.</param>
        public ListBoxEventBuilder Add(string handler)
        {
            Handler("add", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the ListBox selection has changed.The function context of the event handler (available through the this keyword) that will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public ListBoxEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the ListBox has received data from the data source and is already rendered.The function context of the event handler (available through the this keyword) that will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public ListBoxEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the dragging of the ListBox items starts.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dragstart event.</param>
        public ListBoxEventBuilder DragStart(string handler)
        {
            Handler("dragstart", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the placeholder of the ListBox changes its position.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the drag event.</param>
        public ListBoxEventBuilder Drag(string handler)
        {
            Handler("drag", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when a ListBox item is dropped over one of the drop targets.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the drop event.</param>
        public ListBoxEventBuilder Drop(string handler)
        {
            Handler("drop", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the dragging of the item ends but before its position is changed in the DOM.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dragend event.</param>
        public ListBoxEventBuilder DragEnd(string handler)
        {
            Handler("dragend", handler);

            return this;
        }
        
        /// <summary>
        /// Fires before an item is removed from the ListBox.The function context of the event handler (available through the this keyword) that will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the remove event.</param>
        public ListBoxEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when ListBox items are reordered.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the reorder event.</param>
        public ListBoxEventBuilder Reorder(string handler)
        {
            Handler("reorder", handler);

            return this;
        }
        
        //<< Handlers
    }
}

