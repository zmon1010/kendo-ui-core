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
        /// Sets the text displayed as the Scheduler's "day" view title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerViewMessagesBuilder Day(string message)
        {
            viewMessages.Day = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed as the Scheduler's "week" view title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerViewMessagesBuilder Week(string message)
        {
            viewMessages.Week = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed as the Scheduler's "workweek" view title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerViewMessagesBuilder WorkWeek(string message)
        {
            viewMessages.WorkWeek = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed as the Scheduler's "month" view title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerViewMessagesBuilder Month(string message)
        {
            viewMessages.Month = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed as the Scheduler's "agenda" view title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerViewMessagesBuilder Agenda(string message)
        {
            viewMessages.Agenda = message;

            return this;
        }
    }
}
