namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the EditorImmutablesSettings settings.
    /// </summary>
    public class EditorImmutablesSettingsBuilder: IHideObjectMembers
    {
        private readonly EditorImmutablesSettings container;

        public EditorImmutablesSettingsBuilder(EditorImmutablesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Kendo template or a callback that allows custom serialization of an immutable element. The callback accepts DOM element as only parameter and is expected to return the HTML source of a DOM element.
        /// </summary>
        /// <param name="value">The value that configures the serialization.</param>
        public EditorImmutablesSettingsBuilder Serialization(string value)
        {
            container.Serialization = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// Kendo template or a callback that allows custom serialization of an immutable element. The callback accepts DOM element as only parameter and is expected to return the HTML source of a DOM element.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public EditorImmutablesSettingsBuilder SerializationHandler(string handler)
        {
            container.Serialization = null;
            container.SerializationHandler = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// Kendo template or a callback that allows custom serialization of an immutable element. The callback accepts DOM element as only parameter and is expected to return the HTML source of a DOM element.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public EditorImmutablesSettingsBuilder SerializationHandler(Func<object, object> handler)
        {
            container.Serialization = null;
            container.SerializationHandler = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }

        /// <summary>
        /// Callback that allows custom deserialization of an immutable element. The callback accepts two arguments. The DOM element representing the immutable element in the html view and the immutable DOM element, which will be restored.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will be evaluated.</param>
        public EditorImmutablesSettingsBuilder Deserialization(string handler)
        {
            container.Deserialization = new ClientHandlerDescriptor { HandlerName = handler };
            return this;
        }

        /// <summary>
        /// Callback that allows custom deserialization of an immutable element. The callback accepts two arguments. The DOM element representing the immutable element in the html view and the immutable DOM element, which will be restored.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public EditorImmutablesSettingsBuilder Deserialization(Func<object, object> handler)
        {
            container.Deserialization = new ClientHandlerDescriptor { TemplateDelegate = handler };
            return this;
        }
    }
}

