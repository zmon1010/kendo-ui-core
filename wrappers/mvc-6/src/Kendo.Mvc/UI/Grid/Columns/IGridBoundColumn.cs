namespace Kendo.Mvc.UI
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel;
	using Microsoft.AspNet.Mvc.Rendering;

	public interface IGridBoundColumn : IGridColumn
    {
        string Format 
        { 
            get;
            set; 
        }

        bool Groupable
        {
            get;
            set;
        }
        
        bool Filterable
        {
            get;
            set;
        }        

        GridBoundColumnFilterableSettings FilterableSettings
        {
            get;
            set;
        }

        bool Sortable
        {
            get;
            set;
        }

        string Member
        {
            get;
            set;
        }

        Type MemberType
        {
            get;
            set;
        }

        object AdditionalViewData 
        { 
            get;
            set; 
        }

        string EditorHtml
        {
            get;
			set;
        }

        string EditorTemplateName
        {
            get; 
            set;
        }

        string ClientGroupHeaderTemplate
        {
            get;
            set;
        }

		string GetEditor(IHtmlHelper helper);		
    }
}
