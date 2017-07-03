namespace Kendo.Mvc.UI
{
    using Html;
    using System.Collections.Generic;

    public class GridSelectColumn<T> : GridColumnBase<T> where T : class
    {
        public GridSelectColumn(Grid<T> grid)
            : base(grid)
        {
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);
            json["selectable"] = true;
        }
        protected override IGridDataCellBuilder CreateEditBuilderCore(IGridHtmlHelper htmlHelper)
        {
            return new GridSelectCellBuilder();
        }

        protected override IGridDataCellBuilder CreateInsertBuilderCore(IGridHtmlHelper htmlHelper)
        {
            return new GridSelectCellBuilder();
        }


        protected override IGridCellBuilder CreateHeaderBuilderCore()
        {
             return new GridSelectHeaderCellBuilder(HeaderHtmlAttributes); 
        }
    }
}
