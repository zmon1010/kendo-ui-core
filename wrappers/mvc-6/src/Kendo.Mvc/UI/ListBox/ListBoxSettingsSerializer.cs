namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;

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
                if (!string.IsNullOrEmpty(listBox.DataSource.Transport.Read.Url) || 
                    listBox.DataSource.Type == DataSourceType.Custom)
                {
                    options["dataSource"] = listBox.DataSource.ToJson();
                }
                else if (listBox.DataSource.Data != null)
                {
                    options["dataSource"] = listBox.DataSource.Data;
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