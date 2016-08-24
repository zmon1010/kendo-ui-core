namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Infrastructure;
    using Moq;
    using Mvc.Tests;
    using Mvc.UI;
    using System.Web.Mvc;

    public static class MediaPlayerTestHelper
    {
        public static MediaPlayer CreateMediaPlayer(ViewContext viewContext)
        {
            viewContext = viewContext ?? TestHelper.CreateViewContext();

            var initializer = new Mock<IJavaScriptInitializer>();
            Mock<IUrlGenerator> urlGenerator = new Mock<IUrlGenerator>();

            MediaPlayer mediaplayer = new MediaPlayer(viewContext, initializer.Object, urlGenerator.Object);

            return mediaplayer;
        }
    }
}
