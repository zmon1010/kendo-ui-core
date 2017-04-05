namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    /* 
     * This class inherits the EditorMessages class 
     * in order to utilize server-side localization.
     */
    public class EditorMessagesSettings : EditorMessages
    {
        public EditorMessagesSettings()
            :base()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string AccessibilityTab { get; set; }
        
        public string AlignCenter { get; set; }
        
        public string AlignCenterBottom { get; set; }
        
        public string AlignCenterMiddle { get; set; }
        
        public string AlignCenterTop { get; set; }
        
        public string AlignLeft { get; set; }
        
        public string AlignLeftBottom { get; set; }
        
        public string AlignLeftMiddle { get; set; }
        
        public string AlignLeftTop { get; set; }
        
        public string AlignRemove { get; set; }
        
        public string AlignRight { get; set; }
        
        public string AlignRightBottom { get; set; }
        
        public string AlignRightMiddle { get; set; }
        
        public string AlignRightTop { get; set; }
        
        public string Alignment { get; set; }
        
        public string AssociateCellsWithHeaders { get; set; }
        
        public string Background { get; set; }
        
        public string Border { get; set; }
        
        public string Style { get; set; }
        
        public string Caption { get; set; }
        
        public string CellMargin { get; set; }
        
        public string CellPadding { get; set; }
        
        public string CellSpacing { get; set; }
        
        public string CellTab { get; set; }
        
        public string CollapseBorders { get; set; }
        
        public string Columns { get; set; }
        
        public string CreateTableHint { get; set; }
        
        public string CssClass { get; set; }
        
        public string DialogOk { get; set; }
        
        public string EditAreaTitle { get; set; }
        
        public string FileTitle { get; set; }
        
        public string FileWebAddress { get; set; }
        
        public string Height { get; set; }
        
        public string Id { get; set; }
        
        public string ImageHeight { get; set; }
        
        public string ImageWidth { get; set; }
        
        public string OverflowAnchor { get; set; }
        
        public string Rows { get; set; }
        
        public string SelectAllCells { get; set; }
        
        public string Summary { get; set; }
        
        public string TableTab { get; set; }
        
        public string TableWizard { get; set; }
        
        public string Width { get; set; }
        
        public string WrapText { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (AccessibilityTab.HasValue())
            {
                json["accessibilityTab"] = AccessibilityTab;
            }
            
            if (AlignCenter.HasValue())
            {
                json["alignCenter"] = AlignCenter;
            }
            
            if (AlignCenterBottom.HasValue())
            {
                json["alignCenterBottom"] = AlignCenterBottom;
            }
            
            if (AlignCenterMiddle.HasValue())
            {
                json["alignCenterMiddle"] = AlignCenterMiddle;
            }
            
            if (AlignCenterTop.HasValue())
            {
                json["alignCenterTop"] = AlignCenterTop;
            }
            
            if (AlignLeft.HasValue())
            {
                json["alignLeft"] = AlignLeft;
            }
            
            if (AlignLeftBottom.HasValue())
            {
                json["alignLeftBottom"] = AlignLeftBottom;
            }
            
            if (AlignLeftMiddle.HasValue())
            {
                json["alignLeftMiddle"] = AlignLeftMiddle;
            }
            
            if (AlignLeftTop.HasValue())
            {
                json["alignLeftTop"] = AlignLeftTop;
            }
            
            if (AlignRemove.HasValue())
            {
                json["alignRemove"] = AlignRemove;
            }
            
            if (AlignRight.HasValue())
            {
                json["alignRight"] = AlignRight;
            }
            
            if (AlignRightBottom.HasValue())
            {
                json["alignRightBottom"] = AlignRightBottom;
            }
            
            if (AlignRightMiddle.HasValue())
            {
                json["alignRightMiddle"] = AlignRightMiddle;
            }
            
            if (AlignRightTop.HasValue())
            {
                json["alignRightTop"] = AlignRightTop;
            }
            
            if (Alignment.HasValue())
            {
                json["alignment"] = Alignment;
            }
            
            if (AssociateCellsWithHeaders.HasValue())
            {
                json["associateCellsWithHeaders"] = AssociateCellsWithHeaders;
            }
            
            if (Background.HasValue())
            {
                json["background"] = Background;
            }
            
            if (Border.HasValue())
            {
                json["border"] = Border;
            }
            
            if (Style.HasValue())
            {
                json["style"] = Style;
            }
            
            if (Caption.HasValue())
            {
                json["caption"] = Caption;
            }
            
            if (CellMargin.HasValue())
            {
                json["cellMargin"] = CellMargin;
            }
            
            if (CellPadding.HasValue())
            {
                json["cellPadding"] = CellPadding;
            }
            
            if (CellSpacing.HasValue())
            {
                json["cellSpacing"] = CellSpacing;
            }
            
            if (CellTab.HasValue())
            {
                json["cellTab"] = CellTab;
            }
            
            if (CollapseBorders.HasValue())
            {
                json["collapseBorders"] = CollapseBorders;
            }
            
            if (Columns.HasValue())
            {
                json["columns"] = Columns;
            }
            
            if (CreateTableHint.HasValue())
            {
                json["createTableHint"] = CreateTableHint;
            }
            
            if (CssClass.HasValue())
            {
                json["cssClass"] = CssClass;
            }
            
            if (DialogOk.HasValue())
            {
                json["dialogOk"] = DialogOk;
            }
            
            if (EditAreaTitle.HasValue())
            {
                json["editAreaTitle"] = EditAreaTitle;
            }
            
            if (FileTitle.HasValue())
            {
                json["fileTitle"] = FileTitle;
            }
            
            if (FileWebAddress.HasValue())
            {
                json["fileWebAddress"] = FileWebAddress;
            }
            
            if (Height.HasValue())
            {
                json["height"] = Height;
            }
            
            if (Id.HasValue())
            {
                json["id"] = Id;
            }
            
            if (ImageHeight.HasValue())
            {
                json["imageHeight"] = ImageHeight;
            }
            
            if (ImageWidth.HasValue())
            {
                json["imageWidth"] = ImageWidth;
            }
            
            if (OverflowAnchor.HasValue())
            {
                json["overflowAnchor"] = OverflowAnchor;
            }
            
            if (Rows.HasValue())
            {
                json["rows"] = Rows;
            }
            
            if (SelectAllCells.HasValue())
            {
                json["selectAllCells"] = SelectAllCells;
            }
            
            if (Summary.HasValue())
            {
                json["summary"] = Summary;
            }
            
            if (TableTab.HasValue())
            {
                json["tableTab"] = TableTab;
            }
            
            if (TableWizard.HasValue())
            {
                json["tableWizard"] = TableWizard;
            }
            
            if (Width.HasValue())
            {
                json["width"] = Width;
            }
            
            if (WrapText.HasValue())
            {
                json["wrapText"] = WrapText;
            }
            
        //<< Serialization

            base.Serialize(json);
        }
    }
}
