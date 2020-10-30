import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import {useVisualMode} from "hooks/useVisualMode";
// import Confirm from "components/Appointment/Confirm";
// import Status from "components/Appointment/Status";
// import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log(interview);
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  // pass save in Form component
  // FORM captures name and interviewer  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log(props)
  return (
    <>
      <Header time={props.time} />
      <article className="appointment"></article>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.getinterview.student}
          interviewer={props.getinterview.interviewer}
        />
      )}
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
    </>
  );
}
