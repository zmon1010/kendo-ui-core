using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI TreeList for ASP.NET MVC events.
    /// </summary>
    public class TreeListEventBuilder: EventBuilder
    {
        public TreeListEventBuilder(IDictionary<string, object> events)
            : base(events)
        {
        }

        /// <summary>
        /// Fired when the user clicks the "cancel" button (in inline or popup editing mode) or closes the popup window.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the cancel event.</param>
        public TreeListEventBuilder Cancel(string handler)
        {
            Handler("cancel", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user clicks the "cancel" button (in inline or popup editing mode) or closes the popup window.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder Cancel(Func<object, object> handler)
        {
            Handler("cancel", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user selects a table row or cell in the treelist.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the change event.</param>
        public TreeListEventBuilder Change(string handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user selects a table row or cell in the treelist.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder Change(Func<object, object> handler)
        {
            Handler("change", handler);

            return this;
        }

        /// <summary>
        /// Fired when an item is about to be collapsed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the collapse event.</param>
        public TreeListEventBuilder Collapse(string handler)
        {
            Handler("collapse", handler);

            return this;
        }

        /// <summary>
        /// Fired when an item is about to be collapsed.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder Collapse(Func<object, object> handler)
        {
            Handler("collapse", handler);

            return this;
        }

        /// <summary>
        /// Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBinding event.</param>
        public TreeListEventBuilder DataBinding(string handler)
        {
            Handler("dataBinding", handler);

            return this;
        }

        /// <summary>
        /// Fired before the widget binds to its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder DataBinding(Func<object, object> handler)
        {
            Handler("dataBinding", handler);

            return this;
        }

        /// <summary>
        /// Fired when the widget is bound to data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the dataBound event.</param>
        public TreeListEventBuilder DataBound(string handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Fired when the widget is bound to data from its data source.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder DataBound(Func<object, object> handler)
        {
            Handler("dataBound", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user edits or creates a data item.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the edit event.</param>
        public TreeListEventBuilder Edit(string handler)
        {
            Handler("edit", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user edits or creates a data item.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder Edit(Func<object, object> handler)
        {
            Handler("edit", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user clicks the "Export to Excel" toolbar button.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the excelExport event.</param>
        public TreeListEventBuilder ExcelExport(string handler)
        {
            Handler("excelExport", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user clicks the "Export to Excel" toolbar button.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder ExcelExport(Func<object, object> handler)
        {
            Handler("excelExport", handler);

            return this;
        }

        /// <summary>
        /// Fired when an item is about to be expanded.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the expand event.</param>
        public TreeListEventBuilder Expand(string handler)
        {
            Handler("expand", handler);

            return this;
        }

        /// <summary>
        /// Fired when an item is about to be expanded.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder Expand(Func<object, object> handler)
        {
            Handler("expand", handler);

            return this;
        }

        /// <summary>
        /// Fired when the treelist filter menu is initialized.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the filterMenuInit event.</param>
        public TreeListEventBuilder FilterMenuInit(string handler)
        {
            Handler("filterMenuInit", handler);

            return this;
        }

        /// <summary>
        /// Fired when the treelist filter menu is initialized.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder FilterMenuInit(Func<object, object> handler)
        {
            Handler("filterMenuInit", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user clicks the "Export to PDF" toolbar button.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the pdfExport event.</param>
        public TreeListEventBuilder PdfExport(string handler)
        {
            Handler("pdfExport", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user clicks the "Export to PDF" toolbar button.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder PdfExport(Func<object, object> handler)
        {
            Handler("pdfExport", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user clicks the "destroy" command button.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the remove event.</param>
        public TreeListEventBuilder Remove(string handler)
        {
            Handler("remove", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user clicks the "destroy" command button.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder Remove(Func<object, object> handler)
        {
            Handler("remove", handler);

            return this;
        }

        /// <summary>
        /// Fired when a data item is saved.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the save event.</param>
        public TreeListEventBuilder Save(string handler)
        {
            Handler("save", handler);

            return this;
        }

        /// <summary>
        /// Fired when a data item is saved.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder Save(Func<object, object> handler)
        {
            Handler("save", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user shows a column.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the columnShow event.</param>
        public TreeListEventBuilder ColumnShow(string handler)
        {
            Handler("columnShow", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user shows a column.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder ColumnShow(Func<object, object> handler)
        {
            Handler("columnShow", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user hides a column.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the columnHide event.</param>
        public TreeListEventBuilder ColumnHide(string handler)
        {
            Handler("columnHide", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user hides a column.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder ColumnHide(Func<object, object> handler)
        {
            Handler("columnHide", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user changes the order of a column.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the columnReorder event.</param>
        public TreeListEventBuilder ColumnReorder(string handler)
        {
            Handler("columnReorder", handler);

            return this;
        }

        /// <summary>
        /// Fired when the user changes the order of a column.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder ColumnReorder(Func<object, object> handler)
        {
            Handler("columnReorder", handler);

            return this;
        }

        /// <summary>
        /// Fired when the column menu is initialized.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will handle the columnMenuInit event.</param>
        public TreeListEventBuilder ColumnMenuInit(string handler)
        {
            Handler("columnMenuInit", handler);

            return this;
        }

        /// <summary>
        /// Fired when the column menu is initialized.The event handler function context (available via the this keyword) will be set to the widget instance.
        /// </summary>
        /// <param name="handler">The handler code wrapped in a text tag.</param>
        public TreeListEventBuilder ColumnMenuInit(Func<object, object> handler)
        {
            Handler("columnMenuInit", handler);

            return this;
        }


    }
}

