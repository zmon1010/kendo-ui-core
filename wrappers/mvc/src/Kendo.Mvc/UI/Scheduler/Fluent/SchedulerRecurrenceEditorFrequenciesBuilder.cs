namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorFrequenciesMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorFrequenciesMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorFrequenciesMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorFrequenciesMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder(SchedulerRecurrenceEditorFrequenciesMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        /// <summary>
        /// Sets the Recurrence Editor Frequencies Never message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor Never message</param>
        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Never(string message)
        {
            editorMessages.Never = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Frequencies Daily message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor Daily message</param>
        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Daily(string message)
        {
            editorMessages.Daily = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Frequencies Weekly message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor Weekly message</param>
        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Weekly(string message)
        {
            editorMessages.Weekly = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Frequencies Monthly message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor Monthly message</param>
        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Monthly(string message)
        {
            editorMessages.Monthly = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Frequencies Yearly message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor Yearly message</param>
        public SchedulerRecurrenceEditorFrequenciesMessagesBuilder Yearly(string message)
        {
            editorMessages.Yearly = message;

            return this;
        }
    }
}
