namespace Kendo.Mvc.UI.Tests.UITests
{
    using Moq;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;
    using Xunit;

    public class NavigationHtmlBuilderBaseTests
    {
        private TComponentTestDouble component;
        private Mock<IUrlGenerator> generator;

        NavigationHtmlBuilderBaseTestDouble builder;

        public NavigationHtmlBuilderBaseTests()
        {            
            var viewContext = TestHelper.CreateViewContext();
            component = new TComponentTestDouble(viewContext);
            builder = new NavigationHtmlBuilderBaseTestDouble(component);

            generator = new Mock<IUrlGenerator>();
        }

        [Fact]
        public void ImageHtmlAttributes_set_the_attributes_of_the_image_tag()
        {
            const string value = "imageAlternativeName";

            NavigationItemTestDouble item = new NavigationItemTestDouble();

            item.ImageHtmlAttributes.Add("alt", value);
            item.ImageUrl = "#";

            IHtmlNode imageTag = builder.ImageTag(item);

            Assert.Equal(value, imageTag.Attribute("alt"));
        }

        [Fact]
        public void ImageTag_should_output_image_tag_with_alt_attribute_value_set_to_predifined_string()
        {
            const string value = "image";

            NavigationItemTestDouble item = new NavigationItemTestDouble();

            item.ImageUrl = "#";

            IHtmlNode imageTag = builder.ImageTag(item);

            Assert.Equal(value, imageTag.Attribute("alt"));
        }

        [Fact]
        public void LinkTag_should_render_an_anchor_if_needed()
        {
            const string url = "foo";

            NavigationItemTestDouble item = new NavigationItemTestDouble();

            item.Url(url);

            generator.Setup(g => g.Generate(component.ViewContext.RequestContext, item)).Returns(url);
            component.UrlGenerator = generator.Object;

            IHtmlNode linkTag = builder.LinkTag(item, (p) => { });

            Assert.Equal("a", linkTag.TagName);
        }

        [Fact]
        public void LinkTag_should_not_render_an_anchor_if_url_is_empty()
        {
            const string url = "";

            NavigationItemTestDouble item = new NavigationItemTestDouble();

            item.Url(url);

            generator.Setup(g => g.Generate(component.ViewContext.RequestContext, item)).Returns(url);
            component.UrlGenerator = generator.Object;

            IHtmlNode linkTag = builder.LinkTag(item, (p) => { });

            Assert.Equal("span", linkTag.TagName);
        }

        [Fact]
        public void LinkTag_should_not_render_an_anchor_if_url_is_null()
        {
            const string url = null;

            NavigationItemTestDouble item = new NavigationItemTestDouble();

            item.Url(url);


            generator.Setup(g => g.Generate(component.ViewContext.RequestContext, item)).Returns(url);
            component.UrlGenerator = generator.Object;

            IHtmlNode linkTag = builder.LinkTag(item, (p) => { });

            Assert.Equal("span", linkTag.TagName);
        }

        [Fact]
        public void LinkTag_should_not_render_an_anchor_if_not_needed()
        {
            const string url = "#";

            NavigationItemTestDouble item = new NavigationItemTestDouble();

            item.Url(url);

            generator.Setup(g => g.Generate(component.ViewContext.RequestContext, item)).Returns(url);
            component.UrlGenerator = generator.Object;

            IHtmlNode linkTag = builder.LinkTag(item, (p) => { });

            Assert.Equal("span", linkTag.TagName);
        }
    }

    public class NavigationHtmlBuilderBaseTestDouble : NavigationHtmlBuilderBase<TComponentTestDouble, NavigationItemTestDouble>
    {
        public NavigationHtmlBuilderBaseTestDouble(TComponentTestDouble component)
            : base(component)
        {

        }
    }

    public class TComponentTestDouble : WidgetBase, INavigationItemComponent<NavigationItemTestDouble>
    {
        public IList<TComponentTestDouble> Items
        {
            get;
            set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            set;
        }

        public TComponentTestDouble(ViewContext viewContext, ViewDataDictionary viewData = null) : base(viewContext, viewData)
        {
        }

        IList<NavigationItemTestDouble> INavigationItemContainer<NavigationItemTestDouble>.Items
        {
            get { throw new System.NotImplementedException(); }
        }

        public SecurityTrimming SecurityTrimming
        {
            get;
            set;
        }

        #region INavigationItemComponent<NavigationItemTestDouble> Members


        public System.Action<NavigationItemTestDouble> ItemAction
        {
            get
            {
                throw new System.NotImplementedException();
            }
            set
            {
                throw new System.NotImplementedException();
            }
        }

        public INavigationItemAuthorization Authorization
        {
            get { throw new System.NotImplementedException(); }
        }

        #endregion
    }
}