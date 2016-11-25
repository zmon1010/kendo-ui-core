namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorYearlyMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorYearlyMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorYearlyMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorYearlyMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorYearlyMessagesBuilder(SchedulerRecurrenceEditorYearlyMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        /// <summary>
        /// Sets the Recurrence Editor RepeatEvery message of the scheduler in Yearly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor RepeatEvery message</param>
        public SchedulerRecurrenceEditorYearlyMessagesBuilder RepeatEvery(string message)
        {
            editorMessages.RepeatEvery = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor RepeatOn message of the scheduler in Yearly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor RepeatOn message</param>
        public SchedulerRecurrenceEditorYearlyMessagesBuilder RepeatOn(string message)
        {
            editorMessages.RepeatOn = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Interval message of the scheduler in Yearly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor Interval message</param>
        public SchedulerRecurrenceEditorYearlyMessagesBuilder Interval(string message)
        {
            editorMessages.Interval = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Of message of the scheduler in Yearly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor Of message</param>
        public SchedulerRecurrenceEditorYearlyMessagesBuilder Of(string message)
        {
            editorMessages.Of = message;

            return this;
        }
    }
}
