using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc.ModelBinding;

namespace Kendo.Mvc.UI
{
    public class GridBoundColumnFilterableSettings : GridFilterableSettings
    {
		public GridBoundColumnFilterableSettings(IModelMetadataProvider modelMetadataProvider)
		{
			Enabled = true;
			FilterUIHandler = new ClientHandlerDescriptor();
			CellSettings = new GridColumnFilterableCellSettings(modelMetadataProvider);
		}

		public GridFilterUIRole FilterUIRole { get; set; }
        public ClientHandlerDescriptor FilterUIHandler { get; set; }
        public GridColumnFilterableCellSettings CellSettings { get; }

        protected override void Serialize(IDictionary<string, object> json)
        {            
            base.Serialize(json);

            if (FilterUIHandler.HasValue())
            {
                json["ui"] = FilterUIHandler;                
            }
            else if (FilterUIRole != GridFilterUIRole.Default)
            {
                json["ui"] = Enum.GetName(typeof(GridFilterUIRole), FilterUIRole).ToLowerInvariant();                
            }

           var cellSettings = CellSettings.ToJson();
           if (cellSettings.Any())
            {
                json["cell"] = cellSettings;
            }
            
        }
    }
}