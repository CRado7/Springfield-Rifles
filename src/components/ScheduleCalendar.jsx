import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { Container, ButtonGroup, ToggleButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

import mensSchedule from "../data/mensSchedule";
import womensSchedule from "../data/womensSchedule";
import socialSchedule from "../data/socialSchedule";

// ---- DateFns Localizer ----
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

// ---- Build Events Helper ----
const buildEvents = (schedule, type) =>
  schedule.map((item) => {
    const date = new Date(item.date);
    const start = new Date(date.setHours(item.startHour || 13, 0));
    const end = new Date(date.setHours(item.endHour || (item.startHour || 13) + 2, 0));
    return {
      title: item.title || item.opponent || item.event || "Event",
      start,
      end,
      type,
      details: [
        item.opponent ? `Opponent: ${item.opponent}` : null,
        item.location ? `Location: ${item.location}` : null,
        item.notes ? `Notes: ${item.notes}` : null,
      ].filter(Boolean),
    };
  });

// ---- Build All Event Sets ----
const mensEvents = buildEvents(mensSchedule, "men");
const womensEvents = buildEvents(womensSchedule, "women");
const socialEvents = buildEvents(socialSchedule, "social");
const allEvents = [...mensEvents, ...womensEvents, ...socialEvents];

const ScheduleCalendar = () => {
  const [filter, setFilter] = useState("all");

  const getFilteredEvents = () => {
    switch (filter) {
      case "men":
        return mensEvents;
      case "women":
        return womensEvents;
      case "social":
        return socialEvents;
      default:
        return allEvents;
    }
  };

  // ---- Tooltip for Event Details ----
  const EventWithTooltip = ({ event }) => (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip className="shadow-lg p-2" style={{ backgroundColor: "#222", color: "#fff", fontWeight: "bold" }}>
          <ul className="mb-0 p-0" style={{ listStyle: "none" }}>
            {event.details.map((d, idx) => (
              <li key={idx}>{d}</li>
            ))}
          </ul>
        </Tooltip>
      }
    >
      <span style={{ fontWeight: "bold", cursor: "pointer" }}>{event.title}</span>
    </OverlayTrigger>
  );

  // ---- Event Colors by Type ----
  const eventStyleGetter = (event) => {
    let backgroundColor;
    switch (event.type) {
      case "men":
        backgroundColor = "#1E90FF"; // bold blue
        break;
      case "women":
        backgroundColor = "#FF1493"; // hot pink
        break;
      case "social":
        backgroundColor = "#32CD32"; // bright green
        break;
      default:
        backgroundColor = "#888";
    }
    return { style: { backgroundColor, color: "white", borderRadius: "6px", padding: "3px", fontWeight: "bold" } };
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 display-4 fw-bold" style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}>
        Club Schedule
      </h2>

      {/* ---- Filter Buttons ---- */}
      <ButtonGroup className="mb-4 d-flex justify-content-center">
        {["all", "men", "women", "social"].map((val) => (
          <ToggleButton
            key={val}
            type="radio"
            variant="outline-primary"
            checked={filter === val}
            value={val}
            onChange={(e) => setFilter(e.currentTarget.value)}
            className="mx-1 px-3 py-2 fw-bold"
            style={{
              background: filter === val ? (val === "men" ? "#1E90FF" : val === "women" ? "#FF1493" : val === "social" ? "#32CD32" : "#666") : "transparent",
              color: filter === val ? "#fff" : "#fff",
              border: "2px solid #fff",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {val.charAt(0).toUpperCase() + val.slice(1)}
          </ToggleButton>
        ))}
      </ButtonGroup>

      {/* ---- Calendar ---- */}
      <Calendar
        localizer={localizer}
        events={getFilteredEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1000, border: "3px solid #FF416C", borderRadius: "8px", boxShadow: "0 0 20px rgba(255,65,108,0.5)" }}
        components={{ event: EventWithTooltip }}
        eventPropGetter={eventStyleGetter}
      />
    </Container>
  );
};

export default ScheduleCalendar;
