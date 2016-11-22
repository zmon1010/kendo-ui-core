namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerRecurrenceMessages"/>.
    /// </summary>
    public class SchedulerRecurrenceMessagesBuilder: IHideObjectMembers
    {
        
        private readonly SchedulerRecurrenceMessages recurrenceMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerRecurrenceMessagesBuilder"/> class.
        /// </summary>
        /// <param name="recurrenceMessages">The recurrenceMessages.</param>
        public SchedulerRecurrenceMessagesBuilder(SchedulerRecurrenceMessages recurrenceMessages)
        {
            this.recurrenceMessages = recurrenceMessages;
        }

		/// <summary>
        /// Sets the text of the delete window's title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerRecurrenceMessagesBuilder DeleteWindowTitle(string message)
        {
            recurrenceMessages.DeleteWindowTitle = message;

            return this;
        }

		/// <summary>
        /// Sets the text displayed for the "Delete occurence" button in the delete window.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerRecurrenceMessagesBuilder DeleteWindowOccurrence(string message)
        {
            recurrenceMessages.DeleteWindowOccurrence = message;

            return this;
        }

		/// <summary>
        /// Sets the text displayed for the "Delete series" button in the delete window.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerRecurrenceMessagesBuilder DeleteWindowSeries(string message)
        {
            recurrenceMessages.DeleteWindowSeries = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the edit window's title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerRecurrenceMessagesBuilder EditWindowTitle(string message)
        {
            recurrenceMessages.EditWindowTitle = message;

            return this;
        }

		/// <summary>
        /// Sets the text displayed for the "Edit occurence" button in the edit window.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerRecurrenceMessagesBuilder EditWindowOccurrence(string message)
        {
            recurrenceMessages.EditWindowOccurrence = message;

            return this;
        }

		/// <summary>
        /// Sets the text displayed for the "Edit series" button in the edit window.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerRecurrenceMessagesBuilder EditWindowSeries(string message)
        {
            recurrenceMessages.EditWindowSeries = message;

            return this;
        }

		/// <summary>
        /// Sets the text displayed inside the edit window.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerRecurrenceMessagesBuilder EditRecurring(string message)
        {
            recurrenceMessages.EditRecurring = message;

            return this;
        }

		/// <summary>
        /// Sets the text displayed inside the delete window.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerRecurrenceMessagesBuilder DeleteRecurring(string message)
        {
            recurrenceMessages.DeleteRecurring = message;

            return this;
        }
    }
}
