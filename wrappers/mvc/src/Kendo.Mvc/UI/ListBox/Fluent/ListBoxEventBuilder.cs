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
        /// Fires when item's position is changed or when the list view selection has changed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public ListBoxEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when the list box has received data from the data source and it is already rendered.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public ListBoxEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the sort action.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the end event.</param>
        public ListBoxEventBuilder End(string handler)
        {
            Handler("end", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when LisbBox's placeholder changes its position.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the move event.</param>
        public ListBoxEventBuilder Move(string handler)
        {
            Handler("move", handler);

            return this;
        }
        
        /// <summary>
        /// Fires before the list box item is removed. If it is not prevented will call DataSource sync method.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the remove event.</param>
        public ListBoxEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when items in the widget are reordered.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the reorder event.</param>
        public ListBoxEventBuilder Reorder(string handler)
        {
            Handler("reorder", handler);

            return this;
        }
        
        /// <summary>
        /// Fires when ListBox item(s) drag starts.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the start event.</param>
        public ListBoxEventBuilder Start(string handler)
        {
            Handler("start", handler);

            return this;
        }
        
        /// <summary>
        /// Fires before the list box items are transfered. If it is not prevented will call DataSource sync method.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the transfer event.</param>
        public ListBoxEventBuilder Transfer(string handler)
        {
            Handler("transfer", handler);

            return this;
        }
        
        //<< Handlers
    }
}

