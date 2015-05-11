// 
// Generated code
// 

using System;
using System.Collections.Generic;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;

namespace Kendo.Mvc.Examples.Models
{
    public partial class Meeting
    {
        public Meeting()
        {
            MeetingAttendees = new HashSet<MeetingAttendee>();
        }
        
        // Properties
        public int MeetingID { get; set; }
        public string Description { get; set; }
        public DateTime End { get; set; }
        public string EndTimezone { get; set; }
        public bool IsAllDay { get; set; }
        public string RecurrenceException { get; set; }
        public int? RecurrenceID { get; set; }
        public string RecurrenceRule { get; set; }
        public int? RoomID { get; set; }
        public DateTime Start { get; set; }
        public string StartTimezone { get; set; }
        public string Title { get; set; }
        
        // Navigation Properties
        public virtual ICollection<MeetingAttendee> MeetingAttendees { get; set; }
        public virtual Meeting Recurrence { get; set; }
    }
}
