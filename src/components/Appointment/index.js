import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import {useVisualMode} from "hooks/useVisualMode";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE"; 

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function destroy (event) {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  // function edit(name, interviewer) {
   
  //     save()
  //     transition(EDIT);
  // }

  // function showthings() {
  //   transition(SHOW);
  // }
 // {mode === EDIT && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
 //onEdit={edit}

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <>
      <Header time={props.time} />
      <article className="appointment"></article>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete appointment?" onConfirm={destroy}/> }
      {mode === SHOW && 
      (
        <Show
        student={props.getinterview.student}
        interviewer={props.getinterview.interviewer}
        onDelete={confirmDelete}
        />
        )
      }
      {mode === SAVING && <Status message="Saving"/> }
      {mode === DELETING && <Status message="Deleting"/> }
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={() => back()} />}
    </>
  );
}
