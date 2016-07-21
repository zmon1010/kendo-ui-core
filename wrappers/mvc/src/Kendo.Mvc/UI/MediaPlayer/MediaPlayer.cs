namespace Kendo.Mvc.UI
{
    using Extensions;
    using Infrastructure;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using System.Web.UI;

    /// <summary>
    /// Kendo UI MediaPlayer component
    /// </summary>
    public class MediaPlayer: WidgetBase
    {
        public MediaPlayer(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.Media = new MediaPlayerMedia();
        }
        public string TagName
        {
            get;
            set;
        }
        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new MediaPlayerHtmlBuilder(this).Build();
            writer.Write(html);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = new Dictionary<string, object>(Events);

            if (AutoPlay.HasValue)
            {
                settings["autoPlay"] = AutoPlay;
            }

            if (AutoRepeat.HasValue)
            {
                settings["autoRepeat"] = AutoRepeat;
            }

            if (Volume.HasValue)
            {
                settings["volume"] = Volume;
            }

            if (FullScreen.HasValue)
            {
                settings["fullScreen"] = FullScreen;
            }

            if (Mute.HasValue)
            {
                settings["mute"] = Mute;
            }

            if (ForwardSeek.HasValue)
            {
                settings["forwardSeek"] = ForwardSeek;
            }

            if (Media.Source != null && !string.IsNullOrEmpty(Media.Title))
            {
                settings["media"] = Media.ToJson();
            }

            writer.Write(Initializer.Initialize(Selector, "MediaPlayer", settings));
            base.WriteInitializationScript(writer);
        }


        public bool? AutoPlay { get; set; }

        public bool? AutoRepeat { get; set; }

        public double? Volume { get; set; }

        public bool? FullScreen { get; set; }

        public bool? Mute { get; set; }

        public bool? ForwardSeek { get; set; }

        public MediaPlayerMedia Media { get; set; }

    }
}

