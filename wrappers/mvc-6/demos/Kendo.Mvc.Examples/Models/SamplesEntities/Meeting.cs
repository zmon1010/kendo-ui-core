namespace Kendo.Mvc.Examples.Models
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel.DataAnnotations;
	using System.ComponentModel.DataAnnotations.Schema;

	public partial class Meeting
    {
        public Meeting()
        {
            MeetingAttendees = new HashSet<MeetingAttendee>();
            Meetings1 = new HashSet<Meeting>();
        }

        public int MeetingID { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        [Column(TypeName = "ntext")]
        [Required]
        public string Title { get; set; }

        [Column(TypeName = "ntext")]
        public string Description { get; set; }

        public int? RoomID { get; set; }

        public bool IsAllDay { get; set; }

        [Column(TypeName = "ntext")]
        public string RecurrenceRule { get; set; }

        public int? RecurrenceID { get; set; }

        [Column(TypeName = "ntext")]
        public string RecurrenceException { get; set; }

        [Column(TypeName = "ntext")]
        public string StartTimezone { get; set; }

        [Column(TypeName = "ntext")]
        public string EndTimezone { get; set; }

        public virtual ICollection<MeetingAttendee> MeetingAttendees { get; set; }

        public virtual ICollection<Meeting> Meetings1 { get; set; }

        public virtual Meeting Meeting1 { get; set; }
    }
}
