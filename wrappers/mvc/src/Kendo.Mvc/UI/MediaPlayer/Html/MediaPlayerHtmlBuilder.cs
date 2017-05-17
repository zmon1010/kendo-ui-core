using System.Web.Mvc;

namespace Kendo.Mvc.UI
{
    public class MediaPlayerHtmlBuilder
    {
        private readonly MediaPlayer MediaPlayer;

        /// <summary>
        /// Initializes a new instance of the <see cref="MediaPlayerHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The MediaPlayer component.</param>
        public MediaPlayerHtmlBuilder(MediaPlayer MediaPlayer)
        {
            this.MediaPlayer = MediaPlayer;
        }

        /// <summary>
        /// Builds the MediaPlayer component markup.
        /// </summary>
        public IHtmlNode Build()
        {
            var tagName = MediaPlayer.TagName;
            if (string.IsNullOrEmpty(tagName))
            {
                tagName = "div";
            }
            var html = new HtmlElement(tagName).
                Attributes(new { name = this.MediaPlayer.Name, id = this.MediaPlayer.Id }).
                Attributes(this.MediaPlayer.HtmlAttributes);

            return html;
        }
    }
}
