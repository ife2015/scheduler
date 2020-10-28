import React, { useState } from "react";

import "components/Application.scss";
import Appointment from "components/Appointment/index"
import DayList from "components/DayList";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Ife Olaifa",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "John Jones",
      interviewer: {
        id: 1,
        name:  "Mildred Nazir",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];


  const appointmentBooking = appointments.map(appointment => {
    return ( 
     <Appointment
       key={appointment.id}
       {...appointment}
     />
     )
   })


  const [dayState, setDay] = useState("Monday");

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
              days={days}
              day={dayState}
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
