using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
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
            var identity = ModelMetadataIdentity.ForProperty(typeof(int), "property", typeof(string));
            var metaDataMock = new Mock<ModelMetadata>(identity);

            metaDataMock.SetupGet(x => x.DisplayName).Returns(MetaDataDisplayName);

            return metaDataMock.Object;
        }
    }
}
