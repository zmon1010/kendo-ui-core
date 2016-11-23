namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder"/>.
    /// </summary>
    public class SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerRecurrenceEditorOffsetPositionsMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceEditorOffsetPositionsMessages"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder(SchedulerRecurrenceEditorOffsetPositionsMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

		/// <summary>
		/// Sets the Recurrence Editor First Offset message of the scheduler.
		/// </summary>
		/// <param name="message">Recurrence Editor First Offset message</param>
		public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder First(string message)
        {
            editorMessages.First = message;

            return this;
        }

		/// <summary>
		/// Sets the Recurrence Editor Second Offset message of the scheduler.
		/// </summary>
		/// <param name="message">Recurrence Editor Second Offset message</param>
		public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder Second(string message)
        {
            editorMessages.Second = message;

            return this;
        }

		/// <summary>
		/// Sets the Recurrence Editor Third Offset message of the scheduler.
		/// </summary>
		/// <param name="message">Recurrence Editor Third Offset message</param>
		public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder Third(string message)
        {
            editorMessages.Third = message;

            return this;
        }

		/// <summary>
		/// Sets the Recurrence Editor Fourth Offset message of the scheduler.
		/// </summary>
		/// <param name="message">Recurrence Editor Fourth Offset message</param>
		public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder Fourth(string message)
        {
            editorMessages.Fourth = message;

            return this;
        }

		/// <summary>
		/// Sets the Recurrence Editor Last Offset message of the scheduler.
		/// </summary>
		/// <param name="message">Recurrence Editor Last Offset message</param>
		public SchedulerRecurrenceEditorOffsetPositionsMessagesBuilder Last(string message)
        {
            editorMessages.Last = message;

            return this;
        }
    }
}
