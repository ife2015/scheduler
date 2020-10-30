import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import {useVisualMode} from "hooks/useVisualMode";
// import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
// import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    
    setTimeout(function() {
      props.bookInterview(props.id, interview);
      transition(SHOW)
    }, 1000);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <>
      <Header time={props.time} />
      <article className="appointment"></article>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
      (
        <Show
        student={props.getinterview.student}
        interviewer={props.getinterview.interviewer}
        />
        )
      }
      {mode === SAVING && <Status message="Saving"/> }
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
    </>
  );
}
