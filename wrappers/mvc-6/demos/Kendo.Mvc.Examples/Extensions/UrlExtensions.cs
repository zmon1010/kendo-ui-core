using System;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Extensions
{
    public static class IUrlHelperExtensions
    {
        private static readonly string cdnRoot = "http://kendo.cdn.telerik.com/2016.2.714";

        public static string Widget(this IUrlHelper url, string widget)
        {
            return url.ExampleUrl(widget, "index");
        }

        public static string ExampleUrl(this IUrlHelper url, string widget, string example)
        {
            return url.Action(example, widget);
        }

        public static string Script(this IUrlHelper url, string file)
        {
            return ResourceUrl(url, "js", file, IsAbsoluteUrl(file));
        }

        public static string Style(this IUrlHelper url, string file, string theme, string commonFile)
        {
            return url.Style(file)
                .Replace("CURRENT_THEME", theme)
                .Replace("CURRENT_COMMON", commonFile);
        }

        public static string Style(this IUrlHelper url, string file)
        {
            return ResourceUrl(url, "styles", file, IsAbsoluteUrl(file));
        }

        private static string ResourceUrl(IUrlHelper url, string assetType, string file, bool isAbsoluteUrl)
        {
#if DEBUG
            if (assetType == "styles")
            {
                return url.Content(string.Format("~/lib/kendo/css/web/{0}", file));
            }

            return url.Content(string.Format("~/lib/kendo/js/{0}", file));
#else
            if (isAbsoluteUrl == true)
            {
                return file;
            }

            return url.Content(string.Format("{0}/{1}/{2}", cdnRoot, assetType, file));
#endif
        }

        private static bool IsAbsoluteUrl(string url)
        {
            Uri result;
            return Uri.TryCreate(url, UriKind.Absolute, out result);
        }
    }
}
