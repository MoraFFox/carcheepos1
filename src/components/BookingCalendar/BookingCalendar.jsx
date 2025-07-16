/** @format */

import React, { useState, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./BookingCalendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventStyleGetter = (event) => {
  const style = {
    backgroundColor:
      event.status === "confirmed"
        ? "#4CAF50"
        : event.status === "pending"
        ? "#ffd700"
        : event.status === "completed"
        ? "#2196F3"
        : event.status === "cancelled"
        ? "#f44336"
        : "#ff9800",
    color: event.status === "pending" ? "#000" : "#fff",
    border: "none",
    borderRadius: "4px",
  };
  return { style };
};

const BookingCalendar = ({ bookings = [], onBookingClick }) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");
  const events = bookings.map((booking) => ({
    id: booking.id,
    title: `${booking.car.manifacture} ${booking.car.model}`,
    start: new Date(booking.dates.start),
    end: new Date(booking.dates.end),
    status: booking.status,
    resource: booking,
  }));

  const handleSelectEvent = (event) => {
    if (onBookingClick) {
      onBookingClick(event.resource);
    }
  };

  return (
    <div className='booking-calendar'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: "calc(100vh - 250px)" }}
        date={date}
        onNavigate={(date) => setDate(date)}
        view={view}
        onView={(view) => setView(view)}
        views={["month", "week", "day"]}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        popup
        selectable
        tooltipAccessor={(event) =>
          `${event.title}\nStatus: ${event.status}\nFrom: ${format(
            event.start,
            "MMM dd, yyyy"
          )}\nTo: ${format(event.end, "MMM dd, yyyy")}`
        }
      />
    </div>
  );
};

export default BookingCalendar;
