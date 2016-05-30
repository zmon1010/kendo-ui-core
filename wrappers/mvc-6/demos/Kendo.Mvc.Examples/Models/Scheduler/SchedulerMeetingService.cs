namespace Kendo.Mvc.Examples.Models.Scheduler
{
    using Kendo.Mvc.UI;
    using System;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc.ModelBinding;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Collections;
    public class SchedulerMeetingService : ISchedulerEventService<MeetingViewModel>
    {
        private SampleEntitiesDataContext db;

        public SchedulerMeetingService(SampleEntitiesDataContext context)
        {
            db = context;
        }

        public SchedulerMeetingService()
            : this(new SampleEntitiesDataContext())
        {
        }

        public virtual IQueryable<MeetingViewModel> GetAll()
        {
            return db.Meetings
                .Include(model => model.MeetingAttendees)
                .ToList()
                .Select(meeting => new MeetingViewModel
                {
                    MeetingID = meeting.MeetingID,
                    Title = meeting.Title,
                    Start = DateTime.SpecifyKind(meeting.Start, DateTimeKind.Utc),
                    End = DateTime.SpecifyKind(meeting.End, DateTimeKind.Utc),
                    StartTimezone = meeting.StartTimezone,
                    EndTimezone = meeting.EndTimezone,
                    Description = meeting.Description,
                    IsAllDay = meeting.IsAllDay,
                    RoomID = meeting.RoomID,
                    RecurrenceRule = meeting.RecurrenceRule,
                    RecurrenceException = meeting.RecurrenceException,
                    RecurrenceID = meeting.RecurrenceID,
                    Attendees = meeting.MeetingAttendees.Select(m => m.AttendeeID).ToArray()
                }).AsQueryable();
        }

        public virtual void Insert(MeetingViewModel meeting, ModelStateDictionary modelState)
        {
            if (ValidateModel(meeting, modelState))
            {
                if (meeting.Attendees == null)
                {
                    meeting.Attendees = new int[0];
                }

                if (string.IsNullOrEmpty(meeting.Title))
                {
                    meeting.Title = "";
                }

                var entity = meeting.ToEntity();

                foreach (var attendeeId in meeting.Attendees)
                {
                    entity.MeetingAttendees.Add(new MeetingAttendee
                    {
                        AttendeeID = attendeeId
                    });
                }

                db.Meetings.Add(entity);
                db.SaveChanges();

                meeting.MeetingID = entity.MeetingID;
            }
        }

        public virtual void Update(MeetingViewModel meeting, ModelStateDictionary modelState)
        {
            if (ValidateModel(meeting, modelState))
            {
                if (string.IsNullOrEmpty(meeting.Title))
                {
                    meeting.Title = "";
                }

                var entity = meeting.ToEntity();
                db.Meetings.Attach(entity);
                db.Entry(entity).State = EntityState.Modified;

                var oldMeeting = db.Meetings
                    .Include(model => model.MeetingAttendees)
                    .FirstOrDefault(m => m.MeetingID == meeting.MeetingID);

                foreach (var attendee in oldMeeting.MeetingAttendees.ToList())
                {
                    db.MeetingAttendees.Attach(attendee);

                    if (meeting.Attendees == null || !meeting.Attendees.Contains(attendee.AttendeeID))
                    {
                        db.Entry(attendee).State = EntityState.Deleted;
                    }
                    else
                    {
                        db.Entry(attendee).State = EntityState.Unchanged;

                        ((List<int>)meeting.Attendees).Remove(attendee.AttendeeID);
                    }

                    entity.MeetingAttendees.Add(attendee);
                }

                if (meeting.Attendees != null)
                {
                    foreach (var attendeeId in meeting.Attendees)
                    {
                        var meetingAttendee = new MeetingAttendee
                        {
                            MeetingID = entity.MeetingID,
                            AttendeeID = attendeeId
                        };

                        db.MeetingAttendees.Attach(meetingAttendee);
                        db.Entry(meetingAttendee).State = EntityState.Added;

                        entity.MeetingAttendees.Add(meetingAttendee);
                    }
                }

                db.SaveChanges();
            }
        }

        public virtual void Delete(MeetingViewModel meeting, ModelStateDictionary modelState)
        {
            if (meeting.Attendees == null)
            {
                meeting.Attendees = new int[0];
            }

            var entity = meeting.ToEntity();

            db.Meetings.Attach(entity);

            var attendees = meeting.Attendees.Select(attendee => new MeetingAttendee
            {
                AttendeeID = attendee,
                MeetingID = entity.MeetingID
            });

            foreach (var attendee in attendees)
            {
                db.MeetingAttendees.Attach(attendee);
                db.Entry(attendee).State = EntityState.Deleted;
            }

            var recurrenceExceptions = db.Meetings.Where(m => m.RecurrenceID == entity.MeetingID);

            foreach (var recurrenceException in recurrenceExceptions)
            {
                db.Meetings.Remove(recurrenceException);
            }

            db.Entry(entity).State = EntityState.Deleted;
            db.Meetings.Remove(entity);
            db.SaveChanges();
        }

        private bool ValidateModel(MeetingViewModel appointment, ModelStateDictionary modelState)
        {
            if (appointment.Start > appointment.End)
            {
                modelState.AddModelError("errors", "End date must be greater or equal to Start date.");
                return false;
            }

            return true;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}