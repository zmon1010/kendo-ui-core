namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorWeekdaysMessagesBuilder"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorWeekdaysMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorWeekdaysMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorWeekdaysMessages"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorWeekdaysMessagesBuilder(SchedulerRecurrenceEditorWeekdaysMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        /// <summary>
        /// Sets the Recurrence Editor Day message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor Day message</param>
        public SchedulerRecurrenceEditorWeekdaysMessagesBuilder Day(string message)
        {
            editorMessages.Day = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Weekday message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor Weekday message</param>
        public SchedulerRecurrenceEditorWeekdaysMessagesBuilder Weekday(string message)
        {
            editorMessages.Weekday = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor Weekend message of the scheduler.
        /// </summary>
        /// <param name="message">Recurrence Editor Weekend message</param>
        public SchedulerRecurrenceEditorWeekdaysMessagesBuilder Weekend(string message)
        {
            editorMessages.Weekend = message;

            return this;
        }
    }
}
