namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring <see cref="GridGroupableSettings"/> messages.
    /// </summary>
    public class GroupingMessagesBuilder : IHideObjectMembers
    {
        private readonly GridGroupableMessages messages;

        public GroupingMessagesBuilder(GridGroupableMessages messages)
        {
            this.messages = messages;
        }

        /// <summary>
        /// Sets the text of the group panel when grid is not grouped.
        /// </summary>
        /// <param name="message">The message</param>
        /// <returns></returns>
        public GroupingMessagesBuilder Empty(string message)
        {
            messages.Empty = message;

            return this;
        }
    }
}
