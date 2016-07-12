using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MediaPlayer component
    /// </summary>
    public partial class MediaPlayer<T> where T : class 
    {
        public bool? AutoBind { get; set; }

        public bool? AutoPlay { get; set; }

        public bool? AutoRepeat { get; set; }

        public double? Volume { get; set; }

        public bool? FullScreen { get; set; }

        public bool? Mute { get; set; }

        public bool? ForwardSeek { get; set; }

        public bool? Playlist { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

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

            if (Playlist.HasValue)
            {
                settings["playlist"] = Playlist;
            }

            return settings;
        }
    }
}
