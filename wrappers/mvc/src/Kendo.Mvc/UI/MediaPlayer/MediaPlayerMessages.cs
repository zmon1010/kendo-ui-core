using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI.Fluent;
using System;
using System.Collections.Generic;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MediaPlayerMessagesSettings class
    /// </summary>
    public class MediaPlayerMessages
    {
        private readonly string MuteDefault = "Toggle audio";
        private readonly string PlayDefault = "Play video";
        private readonly string PauseDefault = "Pause video";
        private readonly string QualityDefault = "Change quality";
        private readonly string VolumeDefault = "Change volume";
        private readonly string FullscreenDefault = "Toggle fullscreen";

        public MediaPlayer MediaPlayer { get; set; }

        public string Pause { get; set; }

        public string Play { get; set; }

        public string Mute { get; set; }

        public string Volume { get; set; }

        public string Quality { get; set; }

        public string Fullscreen { get; set; }

        public MediaPlayerMessages()
        {
            if (Messages.MediaPlayer_Mute != MuteDefault)
            {
                this.Mute = Messages.MediaPlayer_Mute;
            }
            if (Messages.MediaPlayer_Pause != PauseDefault)
            {
                this.Pause = Messages.MediaPlayer_Pause;
            }
            if (Messages.MediaPlayer_Play != PlayDefault)
            {
                this.Play = Messages.MediaPlayer_Play;
            }
            if (Messages.MediaPlayer_Quality != QualityDefault)
            {
                this.Quality = Messages.MediaPlayer_Quality;
            }
            if (Messages.MediaPlayer_Volume != VolumeDefault)
            {
                this.Volume = Messages.MediaPlayer_Volume;
            }
            if (Messages.MediaPlayer_Fullscreen != FullscreenDefault)
            {
                this.Fullscreen = Messages.MediaPlayer_Fullscreen;
            }
        }

        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            // Do manual serialization here

            return settings;
        }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Pause?.HasValue() == true)
            {
                settings["pause"] = Pause;
            }

            if (Play?.HasValue() == true)
            {
                settings["play"] = Play;
            }

            if (Mute?.HasValue() == true)
            {
                settings["mute"] = Mute;
            }

            if (Volume?.HasValue() == true)
            {
                settings["volume"] = Volume;
            }

            if (Quality?.HasValue() == true)
            {
                settings["quality"] = Quality;
            }

            if (Fullscreen?.HasValue() == true)
            {
                settings["fullscreen"] = Fullscreen;
            }

            return settings;
        }
    }
}

