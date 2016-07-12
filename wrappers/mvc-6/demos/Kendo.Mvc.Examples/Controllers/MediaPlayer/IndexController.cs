using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MediaPlayerController : Controller
    {
        public IActionResult Index()
        {
            List<Video> videos = new List<Video>();
            videos.Add(new Video()
            {
                url = @"/shared/web/mediaplayer/Video1.mp4",
                title = "Digital Transformation: A New Way of Thinking",
                poster = @"/shared/web/mediaplayer/Video1.jpg"

            });
            videos.Add(new Video()
            {
                url = @"/shared/web/mediaplayer/Video2.mp4",
                title = "Learn How York Solved Its Database Problem",
                poster = @"/shared/web/mediaplayer/Video2.jpg"
            });
            videos.Add(new Video()
            {
                url = @"/shared/web/mediaplayer/Video3.mp4",
                title = "A Clear Vision for Digital Transformation",
                poster = @"/shared/web/mediaplayer/Video3.jpg"
            });
            ViewBag.Videos = videos;

            return View();
        }
    }
}
