namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public class ListBoxSettingsSerializer
    {
        private readonly ListBox listBox;

        public ListBoxSettingsSerializer(ListBox listBox)
        {
            this.listBox = listBox;
        }

        public void Serialize(IDictionary<string, object> options)
        {
            if (!string.IsNullOrEmpty(listBox.DataSourceId))
            {
                options["dataSource"] = listBox.DataSourceId;
            }
            else
            {
                if (listBox.DataSource.Data != null)
                {
                    options["dataSource"] = listBox.DataSource.Data;
                }
                else
                {
                    options["dataSource"] = listBox.DataSource.ToJson();
                }
            }

            var autoBind = listBox.DataSource.Type != DataSourceType.Server && listBox.AutoBind.GetValueOrDefault(true);

            if (!autoBind)
            {
                options["autoBind"] = autoBind;
            }
        }
    }
}

