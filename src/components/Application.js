import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "components/Appointment/index"
import DayList from "components/DayList";
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors.js";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      //axios.get('http://localhost:8001/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data }));
    })
  }, []);
  

  const appointmentBooking = dailyAppointments.map(appointment => {
    return ( 
     <Appointment
       key={appointment.id}
       {...appointment}
     />
     )
   })



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
