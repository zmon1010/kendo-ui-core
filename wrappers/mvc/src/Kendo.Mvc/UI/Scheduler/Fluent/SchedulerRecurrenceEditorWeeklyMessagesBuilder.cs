namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorWeeklyMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorWeeklyMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorWeeklyMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorWeeklyMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorWeeklyMessagesBuilder(SchedulerRecurrenceEditorWeeklyMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

        /// <summary>
        /// Sets the Recurrence Editor Interval message of the scheduler in Weekly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor Interval message</param>
        public SchedulerRecurrenceEditorWeeklyMessagesBuilder Interval(string message)
        {
            editorMessages.Interval = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor RepeatEvery message of the scheduler in Weekly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor RepeatEvery message</param>
        public SchedulerRecurrenceEditorWeeklyMessagesBuilder RepeatEvery(string message)
        {
            editorMessages.RepeatEvery = message;

            return this;
        }

        /// <summary>
        /// Sets the Recurrence Editor RepeatOn message of the scheduler in Weekly mode.
        /// </summary>
        /// <param name="message">Recurrence Editor RepeatOn message</param>
        public SchedulerRecurrenceEditorWeeklyMessagesBuilder RepeatOn(string message)
        {
            editorMessages.RepeatOn = message;

            return this;
        }
    }
}
