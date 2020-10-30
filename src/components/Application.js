import React, { useState, useEffect } from "react";

import "components/Application.scss";
import Appointment from "components/Appointment/index"
import DayList from "components/DayList";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersBooking = getInterviewersForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);
  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments});
    console.log(id, interview);
  }
  
  /* 
    axios.put('http://localhost:8001/api/appointments/:id')
    .then(result => {
      setState(result.data)
      setState({...state, appointments});
    })

  */
  const appointmentBooking = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return ( 
      <Appointment
      key={appointment.id}
      id={appointment.id}
      getinterview={interview}
      interviewers = {interviewersBooking}
      bookInterview = {bookInterview}
       {...appointment}
     />
     )
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
