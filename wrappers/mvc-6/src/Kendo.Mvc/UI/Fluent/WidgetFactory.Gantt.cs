namespace Kendo.Mvc.UI.Fluent
{
    public partial class WidgetFactory<TModel>
    {
        /// <summary>
        /// Creates a new <see cref="Gantt"/>.
        /// </summary>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Gantt()
        /// %&gt;
        /// </code>
        /// </example>
        public virtual GanttBuilder<TTaskModel, TDependenciesModel> Gantt<TTaskModel, TDependenciesModel>() where TTaskModel : class, IGanttTask where TDependenciesModel : class, IGanttDependency
        {
            return new GanttBuilder<TTaskModel, TDependenciesModel>(new Gantt<TTaskModel, TDependenciesModel>(HtmlHelper.ViewContext));
        }
    }
}