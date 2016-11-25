namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorMonthlyMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorMonthlyMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorMonthlyMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorMonthlyMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorMonthlyMessagesBuilder(SchedulerRecurrenceEditorMonthlyMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        /// <summary>
        /// Sets the Recurrence Editor RepeatEvery message of the scheduler in Monthly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor RepeatEvery message</param>
        public SchedulerRecurrenceEditorMonthlyMessagesBuilder RepeatEvery(string message)
        {
            editorMessages.RepeatEvery = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor RepeatOn message of the scheduler in Monthly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor RepeatOn message</param>
        public SchedulerRecurrenceEditorMonthlyMessagesBuilder RepeatOn(string message)
        {
            editorMessages.RepeatOn = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Interval message of the scheduler in Monthly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor Interval message</param>
        public SchedulerRecurrenceEditorMonthlyMessagesBuilder Interval(string message)
        {
            editorMessages.Interval = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Day message of the scheduler in Monthly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor Day message</param>
        public SchedulerRecurrenceEditorMonthlyMessagesBuilder Day(string message)
        {
            editorMessages.Day = message;

            return this;
        }
    }
}
