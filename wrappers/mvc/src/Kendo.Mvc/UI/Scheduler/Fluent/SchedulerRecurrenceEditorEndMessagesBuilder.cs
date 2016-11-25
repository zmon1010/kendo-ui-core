namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorEndMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorEndMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorEndMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorEndMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorEndMessagesBuilder(SchedulerRecurrenceEditorEndMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        /// <summary>
        /// Sets the Recurrence Editor End label message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor End label message</param>
        public SchedulerRecurrenceEditorEndMessagesBuilder Label(string message)
        {
            editorMessages.Label = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor End label message of the scheduler on mobile.
        /// </summary>
        /// <param name="message">Recurrence Editor End label message</param>
        public SchedulerRecurrenceEditorEndMessagesBuilder MobileLabel(string message)
        {
            editorMessages.MobileLabel = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor End Never option message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor End Never option message</param>
        public SchedulerRecurrenceEditorEndMessagesBuilder Never(string message)
        {
            editorMessages.Never = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor End After option message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor End After option message</param>
        public SchedulerRecurrenceEditorEndMessagesBuilder After(string message)
        {
            editorMessages.After = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor End After Occurrence message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor End After Occurrence message</param>
        public SchedulerRecurrenceEditorEndMessagesBuilder Occurrence(string message)
        {
            editorMessages.Occurrence = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor End On option message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor End On option message</param>
        public SchedulerRecurrenceEditorEndMessagesBuilder On(string message)
        {
            editorMessages.On = message;

            return this;
        }
    }
}
