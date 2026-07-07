// app/components/Agenda.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { pb } from "../lib/pocketbase";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";

type AvailabilityEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  status: "busy" | "free" | "tentative";
};

const START_HOUR = 8;
const END_HOUR = 20;
const HOUR_HEIGHT = 64; // corresponds to h-16 in CSS (64px)
const HOURS = Array.from(
  { length: END_HOUR - START_HOUR },
  (_, i) => START_HOUR + i,
);

// Helper to get the 7 days of the week starting on Monday
function getWeekDays(anchorDate: Date): Date[] {
  const date = new Date(anchorDate);
  const day = date.getDay(); // 0: Sunday, 1: Monday, ...
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  const monday = new Date(date.setDate(diff));

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function Agenda() {
  const [anchorDate, setAnchorDate] = useState<Date>(() => new Date());
  const [events, setEvents] = useState<AvailabilityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<AvailabilityEvent | null>(
    null,
  );
  const [activeDayIdx, setActiveDayIdx] = useState<number>(() => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1; // 0-based index: Monday is 0, Sunday is 6
  });

  // Calculate days for the currently selected week
  const days = useMemo(() => getWeekDays(anchorDate), [anchorDate]);

  const startOfWeek = useMemo(() => {
    const d = new Date(days[0]);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [days]);

  const endOfWeek = useMemo(() => {
    const d = new Date(days[6]);
    d.setHours(23, 59, 59, 999);
    return d;
  }, [days]);

  // Fetch events for the current week range
  useEffect(() => {
    let active = true;
    async function fetchWeekEvents() {
      setLoading(true);
      try {
        const startISO = startOfWeek.toISOString();
        const endISO = endOfWeek.toISOString();

        // Filter events that overlap with the current week range
        const records = await pb
          .collection("availability")
          .getFullList<AvailabilityEvent>({
            filter: `start <= "${endISO}" && end >= "${startISO}"`,
            sort: "start",
          });

        if (active) {
          setEvents(records);
        }
      } catch (err) {
        console.error("Error loading availability events:", err);
        if (active) setEvents([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchWeekEvents();
    return () => {
      active = false;
    };
  }, [startOfWeek, endOfWeek]);

  // Fetch current live status
  useEffect(() => {
    async function fetchLiveStatus() {
      try {
        const now = new Date().toISOString();
        const record = await pb
          .collection("availability")
          .getFirstListItem<AvailabilityEvent>(
            `start <= "${now}" && end >= "${now}"`,
          );
        setCurrentStatus(record);
      } catch {
        setCurrentStatus(null);
      }
    }
    fetchLiveStatus();
  }, []);

  const handlePrevWeek = () => {
    setAnchorDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const handleNextWeek = () => {
    setAnchorDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const handleToday = () => {
    setAnchorDate(new Date());
    const today = new Date().getDay();
    setActiveDayIdx(today === 0 ? 6 : today - 1);
  };

  // Helper to format date range header (e.g., "6 juil. - 12 juil. 2026")
  const formatDateRange = (start: Date, end: Date) => {
    const optShort: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    const optFull: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    const startStr = start.toLocaleDateString("fr-FR", optShort);
    if (start.getFullYear() === end.getFullYear()) {
      const endStr = end.toLocaleDateString("fr-FR", optFull);
      return `${startStr} - ${endStr}`;
    } else {
      const startStrFull = start.toLocaleDateString("fr-FR", optFull);
      const endStrFull = end.toLocaleDateString("fr-FR", optFull);
      return `${startStrFull} - ${endStrFull}`;
    }
  };

  // Filter events belonging to a specific day (handles multi-day events)
  const getEventsForDay = (day: Date) => {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);

    return events.filter((event) => {
      const eStart = new Date(event.start);
      const eEnd = new Date(event.end);
      return eStart <= dayEnd && eEnd >= dayStart;
    });
  };

  // Calculate pixel top and height for rendering events on the hourly grid
  const getEventPosition = (event: AvailabilityEvent, day: Date) => {
    const eStart = new Date(event.start);
    const eEnd = new Date(event.end);

    const dayStart = new Date(day);
    dayStart.setHours(START_HOUR, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(END_HOUR, 0, 0, 0);

    const startLimit = eStart < dayStart ? dayStart : eStart;
    const endLimit = eEnd > dayEnd ? dayEnd : eEnd;

    if (startLimit >= endLimit) {
      return { top: 0, height: 0, visible: false };
    }

    const startHour = startLimit.getHours() + startLimit.getMinutes() / 60;
    const endHour = endLimit.getHours() + endLimit.getMinutes() / 60;

    const top = (startHour - START_HOUR) * HOUR_HEIGHT;
    const height = (endHour - startHour) * HOUR_HEIGHT;

    return { top, height, visible: true };
  };

  // Click handler on free slots to pre-fill and scroll to the contact form
  const handleSlotClick = (event: AvailabilityEvent, day: Date) => {
    if (event.status !== "free") return;

    const formattedDate = day.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    const startTime = new Date(event.start).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const endTime = new Date(event.end).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const eventDetails = {
      date: formattedDate,
      time: `${startTime} à ${endTime}`,
      startISO: event.start,
      endISO: event.end,
    };

    // Dispatch the custom event for pre-filling contact.tsx
    const customEvent = new CustomEvent("agenda-select-slot", {
      detail: eventDetails,
    });
    window.dispatchEvent(customEvent);

    // Smooth scroll to the contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Live status configurations
  const liveStatusConfig = useMemo(() => {
    if (!currentStatus) {
      return {
        label: "Disponible",
        color: "bg-green-500",
      };
    }

    const { status, end } = currentStatus;
    if (status === "busy") {
      const endDate = new Date(end);
      const today = new Date();
      const isSameDay =
        endDate.getDate() === today.getDate() &&
        endDate.getMonth() === today.getMonth() &&
        endDate.getFullYear() === today.getFullYear();

      const formattedTime = endDate.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (isSameDay) {
        return {
          label: `Occupé jusqu'à ${formattedTime}`,
          color: "bg-red-500",
        };
      } else {
        const formattedDate = endDate.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
        });
        return {
          label: `Occupé jusqu'au ${formattedDate} à ${formattedTime}`,
          color: "bg-red-500",
        };
      }
    } else if (status === "tentative") {
      return {
        label: "Peut-être disponible",
        color: "bg-yellow-500",
      };
    }

    return {
      label: "Disponible",
      color: "bg-green-500",
    };
  }, [currentStatus]);

  const activeDay = days[activeDayIdx];
  const activeDayEvents = getEventsForDay(activeDay);

  return (
    <section
      id="agenda"
      className="relative py-20 md:py-32 px-6 sm:px-8 bg-[var(--color-surface)] border-y border-[var(--color-border)]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-600 mb-3"
            >
              Mon Agenda
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--color-strong)] font-georgia"
            >
              Disponibilités et planning.
            </motion.h2>
          </div>

          {/* Live Status indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="self-start sm:self-center flex items-center gap-2.5 border border-[var(--color-border)] bg-[var(--color-card)] rounded-xl px-4 py-2.5 shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${liveStatusConfig.color} opacity-45`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${liveStatusConfig.color}`}
              />
            </span>
            <span className="text-xs font-mono font-medium text-[var(--color-strong)]">
              {liveStatusConfig.label}
            </span>
          </motion.div>
        </div>

        {/* Calendar Navigation & Legend */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 w-full">
          <div className="flex items-center gap-2.5 font-mono text-xs select-none">
            <button
              onClick={handlePrevWeek}
              className="p-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] hover:bg-[var(--color-border-light)] transition-colors text-[var(--color-strong)] cursor-pointer"
              aria-label="Semaine précédente"
            >
              <Icon icon="lucide:chevron-left" className="w-4 h-4" />
            </button>

            <button
              onClick={handleToday}
              className="px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] hover:bg-[var(--color-border-light)] transition-colors font-medium text-[var(--color-strong)] cursor-pointer"
            >
              Aujourd'hui
            </button>

            <button
              onClick={handleNextWeek}
              className="p-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-card)] hover:bg-[var(--color-border-light)] transition-colors text-[var(--color-strong)] cursor-pointer"
              aria-label="Semaine suivante"
            >
              <Icon icon="lucide:chevron-right" className="w-4 h-4" />
            </button>

            <span className="text-[var(--color-strong)] font-semibold ml-2 text-sm">
              {formatDateRange(days[0], days[6])}
            </span>
          </div>

          {/* Legends */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] sm:text-xs font-mono text-[var(--color-muted)]">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500/10 border border-emerald-500/30 block" />
              <span>Disponible (Free)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-rose-500/10 border border-rose-500/30 block" />
              <span>Occupé (Busy)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-500/10 border border-amber-500/30 block" />
              <span>À confirmer (Tentative)</span>
            </div>
          </div>
        </div>

        {/* SKELETON LOADING STATE */}
        {loading ? (
          <div className="border border-[var(--color-border)] bg-[var(--color-card)] rounded-2xl p-4 md:p-6 shadow-sm min-h-[500px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 font-mono text-sm text-[var(--color-muted)]">
              <Icon
                icon="line-md:loading-twotone-loop"
                className="w-7 h-7 animate-spin text-[var(--color-strong)]"
              />
              <span>Chargement du calendrier...</span>
            </div>
          </div>
        ) : (
          <>
            {/* MOBILE VIEW (Tab navigation + Single column hourly grid) */}
            <div className="block md:hidden">
              {/* Day Selection Tabs */}
              <div className="flex justify-between mb-4 border border-[var(--color-border)] rounded-xl p-1.5 bg-[var(--color-card)]">
                {days.map((day, idx) => {
                  const isSelected = activeDayIdx === idx;
                  const isToday =
                    day.toDateString() === new Date().toDateString();
                  const dayEvents = getEventsForDay(day);
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveDayIdx(idx)}
                      className={`flex-1 flex flex-col items-center py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[var(--color-strong)] text-[var(--background)] font-semibold shadow-sm"
                          : "text-[var(--color-muted)] hover:bg-[var(--color-border-light)]"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wide">
                        {day
                          .toLocaleDateString("fr-FR", { weekday: "short" })
                          .slice(0, 3)}
                      </span>
                      <span className="text-sm mt-0.5 relative">
                        {day.getDate()}
                        {/* Status dots */}
                        {isToday && !isSelected && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                        )}
                        {!isToday && hasEvents && !isSelected && (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-[var(--color-subtle)]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Single Day Time Grid */}
              <div className="border border-[var(--color-border)] bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[var(--color-surface)] py-3 px-4 border-b border-[var(--color-border)] font-mono text-xs text-[var(--color-muted)] flex justify-between items-center">
                  <span>Horaires</span>
                  <span className="font-semibold text-[var(--color-strong)]">
                    {activeDay.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>

                <div
                  className="grid grid-cols-[60px_1fr] relative"
                  style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
                >
                  {/* Left Hours column */}
                  <div className="flex flex-col select-none font-mono">
                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        className="border-b border-[var(--color-border)] border-r flex items-start justify-end pr-3 pt-2 text-[10px] text-neutral-400"
                        style={{ height: `${HOUR_HEIGHT}px` }}
                      >
                        {hour.toString().padStart(2, "0")}:00
                      </div>
                    ))}
                  </div>

                  {/* Day Content Area */}
                  <div className="relative h-full bg-[var(--color-card)]">
                    {/* Horizontal hour lines */}
                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        className="border-b border-[var(--color-border)] w-full"
                        style={{ height: `${HOUR_HEIGHT}px` }}
                      />
                    ))}

                    {/* Absolute Day Events */}
                    {activeDayEvents.map((event) => {
                      const pos = getEventPosition(event, activeDay);
                      if (!pos.visible) return null;

                      const isFree = event.status === "free";

                      return (
                        <motion.div
                          key={event.id}
                          style={{
                            top: `${pos.top}px`,
                            height: `${pos.height}px`,
                          }}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileTap={isFree ? { scale: 0.98 } : {}}
                          onClick={() => handleSlotClick(event, activeDay)}
                          className={`absolute left-2 right-2 rounded-xl border p-2.5 overflow-hidden flex flex-col justify-between select-none font-mono transition-shadow duration-200 ${
                            event.status === "busy"
                              ? "bg-rose-500/5 text-rose-700 dark:text-rose-300 border-rose-500/20 cursor-not-allowed"
                              : event.status === "tentative"
                                ? "bg-amber-500/5 text-amber-700 dark:text-amber-300 border-amber-500/20"
                                : "bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 hover:shadow-md cursor-pointer"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[11px] font-semibold leading-tight truncate">
                              {event.title}
                            </span>
                            <Icon
                              icon={
                                event.status === "busy"
                                  ? "lucide:lock"
                                  : event.status === "tentative"
                                    ? "lucide:help-circle"
                                    : "lucide:check-circle"
                              }
                              className="w-3.5 h-3.5 shrink-0"
                            />
                          </div>

                          <div className="flex items-end justify-between mt-auto">
                            <span className="text-[9px] text-[var(--color-muted)]">
                              {new Date(event.start).toLocaleTimeString(
                                "fr-FR",
                                { hour: "2-digit", minute: "2-digit" },
                              )}{" "}
                              -{" "}
                              {new Date(event.end).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {isFree && (
                              <span className="text-[8px] uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold animate-pulse">
                                Réserver
                              </span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP VIEW (7 Columns grid style Excel/Developer) */}
            <div className="hidden md:block border border-[var(--color-border)] bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-[60px_repeat(7,1fr)] bg-[var(--color-surface)] border-b border-[var(--color-border)] select-none">
                {/* Time header */}
                <div className="py-3 text-center text-xs font-mono text-[var(--color-muted)] flex items-center justify-center border-r border-[var(--color-border)]">
                  Heure
                </div>
                {/* 7 Day headers */}
                {days.map((day, idx) => {
                  const isToday =
                    day.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={idx}
                      className={`py-3 text-center border-r border-[var(--color-border)] last:border-r-0 font-mono text-xs flex flex-col items-center justify-center relative ${
                        isToday ? "bg-[var(--color-strong)]/5" : ""
                      }`}
                    >
                      <span
                        className={`text-[10px] uppercase tracking-wider font-semibold ${isToday ? "text-[var(--color-strong)]" : "text-[var(--color-muted)]"}`}
                      >
                        {day.toLocaleDateString("fr-FR", { weekday: "short" })}
                      </span>
                      <span
                        className={`text-sm mt-0.5 font-bold ${isToday ? "text-[var(--color-strong)]" : "text-neutral-500 dark:text-neutral-400"}`}
                      >
                        {day.getDate()}
                      </span>
                      {isToday && (
                        <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Main Grid content */}
              <div
                className="grid grid-cols-[60px_repeat(7,1fr)] relative"
                style={{ height: `${HOURS.length * HOUR_HEIGHT}px` }}
              >
                {/* Left Hours column */}
                <div className="flex flex-col select-none font-mono border-r border-[var(--color-border)]">
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="border-b border-[var(--color-border)] flex items-start justify-end pr-3 pt-2 text-[10px] text-neutral-400"
                      style={{ height: `${HOUR_HEIGHT}px` }}
                    >
                      {hour.toString().padStart(2, "0")}:00
                    </div>
                  ))}
                </div>

                {/* 7 Columns for Days */}
                {days.map((day, dayIdx) => {
                  const dayEvents = getEventsForDay(day);
                  const isToday =
                    day.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={dayIdx}
                      className={`relative border-r border-[var(--color-border)] last:border-r-0 h-full ${
                        isToday ? "bg-[var(--color-strong)]/[0.015]" : ""
                      }`}
                    >
                      {/* Grid background hour lines */}
                      {HOURS.map((hour) => (
                        <div
                          key={hour}
                          className="border-b border-[var(--color-border)] w-full"
                          style={{ height: `${HOUR_HEIGHT}px` }}
                        />
                      ))}

                      {/* Absolute Day Events */}
                      {dayEvents.map((event) => {
                        const pos = getEventPosition(event, day);
                        if (!pos.visible) return null;

                        const isFree = event.status === "free";

                        return (
                          <motion.div
                            key={event.id}
                            style={{
                              top: `${pos.top}px`,
                              height: `${pos.height}px`,
                            }}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={
                              isFree
                                ? { scale: 1.01, zIndex: 10 }
                                : { scale: 1.002 }
                            }
                            whileTap={isFree ? { scale: 0.99 } : {}}
                            onClick={() => handleSlotClick(event, day)}
                            className={`absolute left-1 right-1 rounded-xl border p-2 overflow-hidden flex flex-col justify-between select-none font-mono transition-shadow duration-200 ${
                              event.status === "busy"
                                ? "bg-rose-500/5 text-rose-700 dark:text-rose-300 border-rose-500/20 cursor-not-allowed"
                                : event.status === "tentative"
                                  ? "bg-amber-500/5 text-amber-700 dark:text-amber-300 border-amber-500/20 cursor-not-allowed"
                                  : "bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 cursor-pointer"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-[10px] font-semibold leading-tight truncate">
                                {event.title}
                              </span>
                              <Icon
                                icon={
                                  event.status === "busy"
                                    ? "lucide:lock"
                                    : event.status === "tentative"
                                      ? "lucide:help-circle"
                                      : "lucide:check-circle"
                                }
                                className="w-3 h-3 shrink-0"
                              />
                            </div>

                            <div className="flex items-end justify-between mt-auto">
                              <span className="text-[8px] text-[var(--color-muted)]">
                                {new Date(event.start).toLocaleTimeString(
                                  "fr-FR",
                                  { hour: "2-digit", minute: "2-digit" },
                                )}{" "}
                                -{" "}
                                {new Date(event.end).toLocaleTimeString(
                                  "fr-FR",
                                  { hour: "2-digit", minute: "2-digit" },
                                )}
                              </span>
                              {isFree && (
                                <span className="text-[8px] uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
                                  Réserver
                                </span>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call to action or empty status */}
            {events.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center text-xs text-[var(--color-muted)] font-mono border border-dashed border-[var(--color-border)] rounded-xl py-8 px-4"
              >
                Aucun événement enregistré pour cette semaine. Je suis
                disponible sur demande.
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
