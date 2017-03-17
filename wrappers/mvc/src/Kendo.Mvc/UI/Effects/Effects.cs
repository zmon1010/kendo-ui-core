namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;

    public class Effects: JsonObject
    {
        public Effects(string name)
        {

            Name = name;

            Container = new List<string>();
            Duration = (int)AnimationDuration.Normal;
        }

        protected string Name 
        { 
            get;
            set; 
        }

        public IList<string> Container
        {
            get;
            private set;
        }

        public int Duration
        {
            get;
            set;
        }

        public bool Reverse 
        {
            get; 
            set; 
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var options = new Dictionary<string, object>();
            if (Duration != (int)AnimationDuration.Normal)
            {
                options["duration"] = Duration;
            }
            if (Container.Any())
            {
                options["effects"] = string.Join(" ", Container);
            }
            if (Reverse)
            {
                options["reverse"] = Reverse;
            }
            if (options.Keys.Any())
            {
                json[Name] = options;
            }
        }
    }
}