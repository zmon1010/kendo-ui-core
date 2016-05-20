using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Moq;

namespace Kendo.Mvc.Tests
{
    public class CheckBoxHtmlBuilderMock : CheckBoxHtmlBuilder
    {
        public CheckBoxHtmlBuilderMock(CheckBox checkBox) : base(checkBox) { }

        public string MetaDataDisplayName { get; set; }

        public new IHtmlNode BuildCheckBox()
        {
            return base.BuildCheckBox();
        }

        public new IHtmlNode BuildLabel()
        {
            return base.BuildLabel();
        }

        public new IHtmlNode BuildHiddenInput()
        {
            return base.BuildHiddenInput();
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
