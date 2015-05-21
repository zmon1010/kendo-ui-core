// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class MeetingAttendee
    {
        public MeetingAttendee()
        {
        }
        
        // Properties
        public int MeetingID { get; set; }
        public int AttendeeID { get; set; }
        
        // Navigation Properties
        public virtual Meeting Meeting { get; set; }
    }
}
