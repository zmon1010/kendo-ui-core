namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Dialog for ASP.NET MVC.
    /// </summary>
    public class DialogBuilder: WidgetBuilderBase<Dialog, DialogBuilder>
    {
        private readonly Dialog container;
        /// <summary>
        /// Initializes a new instance of the <see cref="Dialog"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public DialogBuilder(Dialog component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// A collection of objects containing text, action and primary attributes used to specify the dialog buttons. #### Example
        /// </summary>
        /// <param name="configurator">The action that configures the actions.</param>
        public DialogBuilder Actions(Action<DialogActionFactory> configurator)
        {
            configurator(new DialogActionFactory(container.Actions));
            return this;
        }
        
        /// <summary>
        /// Specifies the possible layout of the action buttons in the Dialog.Possible values are: normal or stretched.
        /// </summary>
        /// <param name="value">The value that configures the buttonlayout.</param>
        public DialogBuilder ButtonLayout(string value)
        {
            container.ButtonLayout = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether a close button should be rendered at the top corner of the dialog.
        /// </summary>
        /// <param name="value">The value that configures the closable.</param>
        public DialogBuilder Closable(bool value)
        {
            container.Closable = value;

            return this;
        }
        
        /// <summary>
        /// Specifies height of the dialog.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public DialogBuilder Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// The maximum height (in pixels) that may be achieved by resizing the dialog.
        /// </summary>
        /// <param name="value">The value that configures the maxheight.</param>
        public DialogBuilder MaxHeight(double value)
        {
            container.MaxHeight = value;

            return this;
        }
        
        /// <summary>
        /// The maximum width (in pixels) that may be achieved by resizing the dialog.
        /// </summary>
        /// <param name="value">The value that configures the maxwidth.</param>
        public DialogBuilder MaxWidth(double value)
        {
            container.MaxWidth = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of the labels that are shown within the dialog. Used primarily for localization.
        /// </summary>
        /// <param name="configurator">The action that configures the messages.</param>
        public DialogBuilder Messages(Action<DialogMessagesSettingsBuilder> configurator)
        {
            configurator(new DialogMessagesSettingsBuilder(container.Messages));
            return this;
        }
        
        /// <summary>
        /// The minimum height (in pixels) that may be achieved by resizing the dialog.
        /// </summary>
        /// <param name="value">The value that configures the minheight.</param>
        public DialogBuilder MinHeight(double value)
        {
            container.MinHeight = value;

            return this;
        }
        
        /// <summary>
        /// The minimum width (in pixels) that may be achieved by resizing the dialog.
        /// </summary>
        /// <param name="value">The value that configures the minwidth.</param>
        public DialogBuilder MinWidth(double value)
        {
            container.MinWidth = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the dialog should show a modal overlay over the page.
        /// </summary>
        /// <param name="value">The value that configures the modal.</param>
        public DialogBuilder Modal(bool value)
        {
            container.Modal = value;

            return this;
        }
        
        /// <summary>
        /// The text in the dialog title bar. If false, the dialog will be displayed without a title bar.
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public DialogBuilder Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the dialog will be initially visible.
        /// </summary>
        /// <param name="value">The value that configures the visible.</param>
        public DialogBuilder Visible(bool value)
        {
            container.Visible = value;

            return this;
        }
        
        /// <summary>
        /// Specifies width of the dialog.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public DialogBuilder Width(double value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// The content of the dialog
        /// </summary>
        /// <param name="value">The value that configures the content.</param>
        public DialogBuilder Content(string value)
        {
            container.Content = value;

            return this;
        }
        
        //<< Fields


        /// <summary>
        /// A collection of {Animation} objects, used to change default animations. A value of false will disable all animations in the widget. is not a valid configuration.
        /// </summary>
        /// <param name="enabled">Enables or disables the animation option.</param>
        public DialogBuilder Animation(bool enabled)
        {
            container.Animation.Enabled = enabled;
            return this;
        }


        /// <summary>
        /// A collection of {Animation} objects, used to change default animations. A value of false will disable all animations in the widget. is not a valid configuration.
        /// </summary>
        /// <param name="configurator">The action that configures the animation.</param>
        public DialogBuilder Animation(Action<PopupAnimationBuilder> configurator)
        {
            container.Animation.Enabled = true;

            configurator(new PopupAnimationBuilder(container.Animation));
            return this;
        }


        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Dialog()
        ///             .Name("Dialog")
        ///             .Events(events => events
        ///                 .Close("onClose")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public DialogBuilder Events(Action<DialogEventBuilder> configurator)
        {

            configurator(new DialogEventBuilder(Component.Events));

            return this;
        }
        
    }
}

