import React from "react";

// imported CSS styling
import "components/Application.scss";

// imported components
import Appointment from "components/Appointment/index";
import DayList from "components/DayList";

// imported functions
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";
import { useApplicationData } from "hooks/useApplicationData";

export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersBooking = getInterviewersForDay(state, state.day);

  // maps the appointment properties for each slot
  const appointmentBooking = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        getinterview={interview}
        interviewers={interviewersBooking}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        {...appointment}
      />
    );
  });


  return (
    <main className="layout">
      <section className="sidebar">
        {<img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        }
        {
          <hr className="sidebar__separator sidebar--centered" />
        }
        {
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
        }
        {
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        }
      </section>
      <section className="schedule">
        {appointmentBooking}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
