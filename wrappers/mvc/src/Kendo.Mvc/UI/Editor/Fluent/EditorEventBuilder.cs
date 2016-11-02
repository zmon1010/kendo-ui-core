namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent interface for configuring the Editor events.
    /// </summary>
    public class EditorEventBuilder : EventBuilder
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="EditorEventBuilder" /> class.
        /// </summary>
        /// <param name="events">The client events.</param>
        public EditorEventBuilder(IDictionary<string, object> events) : base(events)
        {
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Change client-side event.
        /// </summary>
        /// <param name="onChangeHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Editor()
        ///            .Name("Editor")
        ///            .Events(events => events.Change("onChange"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Change client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Editor()
        ///           .Name("Editor")
        ///           .Events(events => events.Change(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Execute client-side event.
        /// </summary>
        /// <param name="onExecuteHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Editor()
        ///            .Name("Editor")
        ///            .Events(events => events.Execute("onExecute"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder Execute(string handler)
        {
            Handler("execute", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Execute client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Editor()
        ///           .Name("Editor")
        ///           .Events(events => events.Execute(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder Execute(Func<object, object> handler)
        {
            Handler("execute", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Paste client-side event.
        /// </summary>
        /// <param name="onPasteHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Editor()
        ///            .Name("Editor")
        ///            .Events(events => events.Paste("onPaste"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder Paste(string handler)
        {
            Handler("paste", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Paste client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Editor()
        ///           .Name("Editor")
        ///           .Events(events => events.Paste(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder Paste(Func<object, object> handler)
        {
            Handler("paste", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the Select client-side event.
        /// </summary>
        /// <param name="onSelectHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Editor()
        ///            .Name("Editor")
        ///            .Events(events => events.Select("onSelect"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder Select(string handler)
        {
            Handler("select", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the Select client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Editor()
        ///           .Name("Editor")
        ///           .Events(events => events.Select(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder Select(Func<object, object> handler)
        {
            Handler("select", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the KeyUp client-side event.
        /// </summary>
        /// <param name="onKeyUpHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Editor()
        ///            .Name("Editor")
        ///            .Events(events => events.KeyUp("onKeyUp"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder KeyUp(string handler)
        {
            Handler("keyup", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the KeyUp client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Editor()
        ///           .Name("Editor")
        ///           .Events(events => events.KeyUp(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder KeyUp(Func<object, object> handler)
        {
            Handler("keyup", handler);

            return this;
        }

        /// <summary>
        ///  Defines the name of the JavaScript function that will handle the the KeyDown client-side event.
        /// </summary>
        /// <param name="onKeyDownHandlerName">The name of the JavaScript function that will handle the event.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().Editor()
        ///            .Name("Editor")
        ///            .Events(events => events.KeyDown("onKeyDown"))
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder KeyDown(string handler)
        {
            Handler("keydown", handler);

            return this;
        }

        /// <summary>
        /// Defines the inline handler of the KeyDown client-side event
        /// </summary>
        /// <param name="inlineCodeBlock">The handler code wrapped in a text tag (Razor syntax).</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;% Html.Kendo().Editor()
        ///           .Name("Editor")
        ///           .Events(events => events.KeyDown(
        ///                @&lt;text&gt;
        ///                function(e) {
        ///                    //event handling code
        ///                }
        ///                &lt;/text&gt;
        ///           ))
        ///           .Render();
        /// %&gt;
        /// </code>
        /// </example>
        public EditorEventBuilder KeyDown(Func<object, object> handler)
        {
            Handler("keydown", handler);

            return this;
        }
    }
}
