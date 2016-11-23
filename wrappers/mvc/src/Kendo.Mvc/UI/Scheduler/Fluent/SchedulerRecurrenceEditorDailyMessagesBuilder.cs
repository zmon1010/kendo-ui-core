namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorDailyMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorDailyMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorDailyMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorDailyMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorDailyMessagesBuilder(SchedulerRecurrenceEditorDailyMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

		/// <summary>
		/// Sets the Recurrence Editor RepeatEvery message of the scheduler in Daily mode.
		/// </summary>
		/// <param name="message">Recurrence Editor RepeatEvery message</param>
		public SchedulerRecurrenceEditorDailyMessagesBuilder RepeatEvery(string message)
        {
            editorMessages.RepeatEvery = message;

            return this;
        }

		/// <summary>
		/// Sets the Recurrence Editor Interval message of the scheduler in Daily mode.
		/// </summary>
		/// <param name="message">Recurrence Editor Interval message</param>
		public SchedulerRecurrenceEditorDailyMessagesBuilder Interval(string message)
        {
            editorMessages.Interval = message;

            return this;
        }
    }
}
