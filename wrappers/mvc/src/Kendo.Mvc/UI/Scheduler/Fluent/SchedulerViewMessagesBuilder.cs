namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewMessages"/>.
    /// </summary>
    public class SchedulerViewMessagesBuilder: IHideObjectMembers
    {

        private readonly SchedulerViewMessages viewMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerViewMessagesBuilder"/> class.
        /// </summary>
        /// <param name="viewMessages">The viewMessages.</param>
        public SchedulerViewMessagesBuilder(SchedulerViewMessages viewMessages)
        {
            this.viewMessages = viewMessages;
        }

		/// <summary>
		/// Sets the Day message of the scheduler.
		/// </summary>
		/// <param name="message">Day message</param>
		public SchedulerViewMessagesBuilder Day(string message)
        {
            viewMessages.Day = message;

            return this;
        }

		/// <summary>
		/// Sets the Week message of the scheduler.
		/// </summary>
		/// <param name="message">Week message</param>
		public SchedulerViewMessagesBuilder Week(string message)
        {
            viewMessages.Week = message;

            return this;
        }

		/// <summary>
		/// Sets the WorkWeek message of the scheduler.
		/// </summary>
		/// <param name="message">WorkWeek message</param>
		public SchedulerViewMessagesBuilder WorkWeek(string message)
        {
            viewMessages.WorkWeek = message;

            return this;
        }

		/// <summary>
		/// Sets the Month message of the scheduler.
		/// </summary>
		/// <param name="message">Month message</param>
		public SchedulerViewMessagesBuilder Month(string message)
        {
            viewMessages.Month = message;

            return this;
        }

		/// <summary>
		/// Sets the Agenda message of the scheduler.
		/// </summary>
		/// <param name="message">Agenda message</param>
		public SchedulerViewMessagesBuilder Agenda(string message)
        {
            viewMessages.Agenda = message;

            return this;
        }
    }
}
