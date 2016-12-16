namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the PanelBarMessagesSettings settings.
    /// </summary>
    public class PanelBarMessagesSettingsBuilder: IHideObjectMembers
    {
        private readonly PanelBarMessagesSettings container;

        public PanelBarMessagesSettingsBuilder(PanelBarMessagesSettings settings)
        {
            container = settings;
        }


        /// <summary>
        /// The text message shown while the root level items are loading.
        /// </summary>
        /// <param name="value">The value that configures the loading.</param>
        public PanelBarMessagesSettingsBuilder Loading(string value)
        {
            container.Loading = value;

            return this;
        }
        
        /// <summary>
        /// The text message shown when an error occurs while fetching the content.
        /// </summary>
        /// <param name="value">The value that configures the request failed.</param>
        public PanelBarMessagesSettingsBuilder RequestFailed(string value)
        {
            container.RequestFailed = value;

            return this;
        }
        
        /// <summary>
        /// The text message shown in the retry button.
        /// </summary>
        /// <param name="value">The value that configures the retry.</param>
        public PanelBarMessagesSettingsBuilder Retry(string value)
        {
            container.Retry = value;

            return this;
        }
    }
}

