namespace Kendo.Mvc.UI
{
    public class MediaPlayerHtmlBuilder<T> where T : class
    {
        private readonly MediaPlayer<T> MediaPlayer;

        /// <summary>
        /// Initializes a new instance of the <see cref="MediaPlayerHtmlBuilder{T}" /> class.
        /// </summary>
        /// <param name="component">The MediaPlayer component.</param>
        public MediaPlayerHtmlBuilder(MediaPlayer<T> MediaPlayer)
        {
            this.MediaPlayer = MediaPlayer;
        }

        /// <summary>
        /// Builds the MediaPlayer component markup.
        /// </summary>
        /// <returns></returns>
        public IHtmlNode Build()
        {
            var html = new HtmlElement("div");

            var tagName = MediaPlayer.TagName;
            if (string.IsNullOrEmpty(tagName))
            {
                tagName = "div";
            }
            return html;
        }
    }
}
