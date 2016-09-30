using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListSelectableSettings class
    /// </summary>
    public class TreeListSelectableSettings<T> where T : class
    {
        public void Serialize(Dictionary<string, object> settings)
        {


            if (Enabled == true)
            {
                if (Mode.HasValue || Type.HasValue)
                {
                    var selectable = "row";

                    if (Mode.HasValue)
                    {
                        selectable = Mode.Value.Serialize();
                    }

                    if (Type.HasValue)
                    {
                        selectable += ", " + Type.Value.Serialize();
                    }

                    settings["selectable"] = selectable;
                }

                if (!Mode.HasValue && !Type.HasValue)
                {
                    settings["selectable"] = true;
                }
            }

        }

        public TreeListSelectionMode? Mode { get; set; }

        public TreeListSelectionType? Type { get; set; }

        public bool Enabled { get; set; }

        public TreeList<T> TreeList { get; set; }



    }
}
