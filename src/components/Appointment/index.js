import React from "react";

// imported styling
import "components/Appointment/styles.scss";

// imported functions
import {useVisualMode} from "hooks/useVisualMode";

// imported components
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
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
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // saves both the student name and interviewer selected
  function save(name, interviewer) {
    const check_isCreate = (mode === CREATE);

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview, check_isCreate)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE));
  }

  // deletes an appointment interview slot
  function destroy() {
    transition(DELETING, true);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(()=> transition(ERROR_DELETE, true));
  }


  return (
    <>
      <article className="appointment" data-testid="appointment" >
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CONFIRM && <Confirm message="Are you sure you would like to delete appointment?" onCancel={() => back()} onConfirm={destroy} />}
        {mode === SHOW &&
          (
            <Show
              student={props.getinterview.student}
              interviewer={props.getinterview.interviewer}
              onDelete={() => transition(CONFIRM)}
              onEdit={() => transition(EDIT)}
            />
          )
        }
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
        {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={() => back()} />}
        {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={() => back()} />}
        {mode === EDIT && <Form name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
      </article>
    </>
  );
}

