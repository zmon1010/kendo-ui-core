namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;

    using Extensions;
    using Infrastructure;
    using Resources;

    public class PanelBar : WidgetBase, INavigationItemComponent<PanelBarItem>
    {
        internal bool isPathHighlighted;
        internal bool isExpanded;

        public PanelBar(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator, INavigationItemAuthorization authorization)
            : base(viewContext, initializer)
        {

            Authorization = authorization;
            UrlGenerator = urlGenerator;

            Animation = new ExpandableAnimation();

            ExpandMode = PanelBarExpandMode.Multiple;
            HighlightPath = true;

            LoadOnDemand = true;

            DataSource = new DataSource();
            DataSource.ModelType(typeof(object));

            AutoBind = true;

            DataTextField = new List<string>();

            Messages = new PanelBarMessagesSettings();

            Items = new LinkedObjectCollection<PanelBarItem>(null);

            SelectedIndex = -1;
            SecurityTrimming = new SecurityTrimming();
        }

        public string DataImageUrlField { get; set; }

        public string DataSpriteCssClassField { get; set; }

        public string DataUrlField { get; set; }

        public PanelBarMessagesSettings Messages
        {
            get;
            set;
        }

        public List<string> DataTextField { get; set; }

        public DataSource DataSource
        {
            get;
            private set;
        }

        public string DataSourceId
        {
            get;
            set;
        }

        public bool AutoBind
        {
            get;
            set;
        }

        public string Template
        {
            get;
            set;
        }

        public string TemplateId
        {
            get;
            set;
        }

        public bool LoadOnDemand
        {
            get;
            set;
        }

        public INavigationItemAuthorization Authorization
        {
            get;
            private set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public ExpandableAnimation Animation
        {
            get;
            private set;
        }

        public Action<PanelBarItem> ItemAction
        {
            get;
            set;
        }

        public bool HighlightPath
        {
            get;
            set;
        }

        public PanelBarExpandMode ExpandMode
        {
            get;
            set;
        }

        public bool ExpandAll
        {
            get;
            set;
        }

        public int SelectedIndex
        {
            get;
            set;
        }

        public Effects Effects
        {
            get;
            set;
        }

        public IList<PanelBarItem> Items
        {
            get;
            private set;
        }

        public SecurityTrimming SecurityTrimming
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            var animation = Animation.ToJson();

            if (animation.Keys.Any())
            {
                options["animation"] = animation["animation"];
            }

            options["expandMode"] = ExpandMode;
            //options["contentUrls"] = Items;


            if (string.IsNullOrEmpty(DataSourceId))
            {
                // use client-side rendering if templates are set
                //if (Items.Any() && this.UsesTemplates())
                //{
                //    this.DataSource.Data = SerializeItems(Items);
                //    this.LoadOnDemand = false;
                //}

                if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url) || DataSource.Type == DataSourceType.Custom)
                {
                    options["dataSource"] = DataSource.ToJson();
                }
                else if (DataSource.Data != null)
                {
                    options["dataSource"] = DataSource.Data;
                }
            }
            else
            {
                options["dataSourceId"] = DataSourceId;
            }

            if (!AutoBind)
            {
                options["autoBind"] = false;
            }

            if (!LoadOnDemand)
            {
                options["loadOnDemand"] = false;
            }

            var idPrefix = "#";
            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            if (!string.IsNullOrEmpty(TemplateId))
            {
                options["template"] = new ClientHandlerDescriptor { HandlerName = string.Format("jQuery('{0}{1}').html()", idPrefix, TemplateId) };
            }
            else if (!string.IsNullOrEmpty(Template))
            {
                options["template"] = Template;
            }

            if (DataImageUrlField.HasValue())
            {
                options["dataImageUrlField"] = DataImageUrlField;
            }

            if (DataSpriteCssClassField.HasValue())
            {
                options["dataSpriteCssClassField"] = DataSpriteCssClassField;
            }

            if (DataUrlField.HasValue())
            {
                options["dataUrlField"] = DataUrlField;
            }

            var messages = Messages.ToJson();
            if (messages.Any())
            {
                options["messages"] = messages;
            }

            if (DataTextField.Any())
            {
                options["dataTextField"] = DataTextField;
            }

            writer.Write(Initializer.Initialize(Selector, "PanelBar", options));

            base.WriteInitializationScript(writer);
        }

        internal bool UsesTemplates()
        {
            return !string.IsNullOrEmpty(TemplateId) || !string.IsNullOrEmpty(Template);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var builder = new PanelBarHtmlBuilder(this, DI.Current.Resolve<IActionMethodCache>());

            if (Items.Any())
            {
                if (SelectedIndex != -1 && Items.Count < SelectedIndex)
                {
                    throw new ArgumentOutOfRangeException(Exceptions.IndexOutOfRange);
                }

                int itemIndex = 0;

              

                IHtmlNode panelbarTag = builder.Build();

                //this loop is required because of SelectedIndex feature.
                if (HighlightPath)
                {
                    Items.Each(HighlightSelectedItem);
                }

                this.Items.Each(item =>
                {
                    if (item.Enabled)
                    {
                        PrepareItem(item, itemIndex);
                    }

                    itemIndex++;

                    item.WriteItem<PanelBar, PanelBarItem>(this, panelbarTag, builder);
                });

                panelbarTag.WriteTo(writer);
            }
            else
            {
                var tag = builder.PanelBarTag();

                tag.WriteTo(writer);
            }


            base.WriteHtml(writer);
        }

        private void HighlightSelectedItem(PanelBarItem item)
        {
            if (item.Enabled)
            {
                if (item.IsCurrent(ViewContext, UrlGenerator))
                {
                    item.Selected = true;
                    isPathHighlighted = true;

                    PanelBarItem tmpItem = item.Parent;
                    while (tmpItem != null)
                    {
                        tmpItem.Expanded = true;
                        tmpItem = tmpItem.Parent;
                    }
                }
                item.Items.Each(HighlightSelectedItem);
            }
        }

        private void PrepareItem(PanelBarItem item, int itemIndex) 
        {
            if (!this.isPathHighlighted)
            {
                if (itemIndex == this.SelectedIndex)
                {
                    item.Selected = true;

                    if (item.Items.Any() || item.Template.HasValue() || !string.IsNullOrEmpty(item.ContentUrl))
                        item.Expanded = true;
                }
            }

            if (ExpandMode == PanelBarExpandMode.Single)
            {
                if (item.Expanded && !isExpanded)
                {
                    isExpanded = true;
                }
                else
                {
                    if (item.Parent != null && item.Parent.Expanded)
                        item.Expanded = true;
                    else
                        item.Expanded = false;
                }
            }
            else
            {
                if (ExpandAll)
                {
                    item.Expanded = true;
                }
            }
        }
    }
}
