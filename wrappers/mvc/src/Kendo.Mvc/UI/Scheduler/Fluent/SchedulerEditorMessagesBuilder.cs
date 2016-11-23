namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerEditorMessages"/>.
    /// </summary>
    public class SchedulerEditorMessagesBuilder: IHideObjectMembers
    {
        private readonly SchedulerEditorMessages editorMessages;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerEditorMessagesBuilder"/> class.
        /// </summary>
        /// <param name="editorMessages">The editorMessages.</param>
        public SchedulerEditorMessagesBuilder(SchedulerEditorMessages editorMessages)
        {
            this.editorMessages = editorMessages;
        }

		/// <summary>
        /// Sets the text of the "Title" label in the Scheduler's event editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder Title(string message)
        {
            editorMessages.Title = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "Start" label in the Scheduler's event editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder Start(string message)
        {
            editorMessages.Start = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "End" label in the Scheduler's event editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder End(string message)
        {
            editorMessages.End = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "All day event" label in the Scheduler's event editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder AllDayEvent(string message)
        {
            editorMessages.AllDayEvent = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "Description" label in the Scheduler's event editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder Description(string message)
        {
            editorMessages.Description = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "Repeat" label in the Scheduler's event editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder Repeat(string message)
        {
            editorMessages.Repeat = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "Timezone" label in the Scheduler's event editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder Timezone(string message)
        {
            editorMessages.Timezone = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "Start timezone" label in the timezone editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder StartTimezone(string message)
        {
            editorMessages.StartTimezone = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "End timezone" label in the timezone editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder EndTimezone(string message)
        {
            editorMessages.EndTimezone = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "No Timezone" option in the timezone editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder NoTimezone(string message)
        {
            editorMessages.NoTimezone = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the "Use separate start and end time zones" label in the timezone editor.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder SeparateTimezones(string message)
        {
            editorMessages.SeparateTimezones = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the timezone editor's title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder TimezoneEditorTitle(string message)
        {
            editorMessages.TimezoneEditorTitle = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the timezone editor's button.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder TimezoneEditorButton(string message)
        {
            editorMessages.TimezoneEditorButton = message;

            return this;
        }

		/// <summary>
        /// Sets the text of the Scheduler event editor's title.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditorMessagesBuilder EditorTitle(string message)
        {
            editorMessages.EditorTitle = message;

            return this;
        }
    }
}
