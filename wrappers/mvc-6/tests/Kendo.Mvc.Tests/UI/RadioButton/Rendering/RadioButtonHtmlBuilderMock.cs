using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.ModelBinding.Metadata;
using Moq;

namespace Kendo.Mvc.Tests
{
    public class RadioButtonHtmlBuilderMock : RadioButtonHtmlBuilder
    {
        public RadioButtonHtmlBuilderMock(RadioButton component) : base(component) { }

        public string MetaDataDisplayName { get; set; }

        public bool MetaDataChecked { get; set; }

        public new IHtmlNode BuildRadioButton()
        {
            return base.BuildRadioButton();
        }

        public new IHtmlNode BuildLabel()
        {
            return base.BuildLabel();
        }

        protected override bool IsCheckedFromModel()
        {
            return MetaDataChecked;
        }

        protected override ModelMetadata GetModelMetaData()
        {
            var modelIdentity = new ModelMetadataIdentity();
            var metaDataMock = new Mock<ModelMetadata>(modelIdentity);

            metaDataMock.SetupGet(x => x.DisplayName).Returns(MetaDataDisplayName);

            return metaDataMock.Object;
        }
    }
}
