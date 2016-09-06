namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the DialogAction settings.
    /// </summary>
    public class DialogActionBuilder: IHideObjectMembers
    {
        private readonly DialogAction container;

        public DialogActionBuilder(DialogAction settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The text to be shown in the action's button.
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public DialogActionBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        /// <summary>
        /// The callback function to be called after pressing the action button.
        /// </summary>
        /// <param name="value">The value that configures the action action.</param>
        public DialogActionBuilder Action(Func<object, object> handler)
        {
            container.Action.TemplateDelegate = handler;

            return this;
        }

        /// <summary>
        /// The callback function to be called after pressing the action button.
        /// </summary>
        /// <param name="value">The value that configures the action action.</param>
        public DialogActionBuilder Action(string handler)
        {
            container.Action.HandlerName = handler;

            return this;
        }
        
        /// <summary>
        /// A boolean property indicating whether the action button will be decorated as primary button or not.
        /// </summary>
        /// <param name="value">The value that configures the primary.</param>
        public DialogActionBuilder Primary(bool value)
        {
            container.Primary = value;

            return this;
        }
        
        //<< Fields
    }
}

