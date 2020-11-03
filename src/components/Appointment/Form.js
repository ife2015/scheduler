import React, { useState } from "react";

// imported components
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // resets inputs
  function reset() {
    setName("");
    setInterviewer(null);
  }

  // discards interview input form
  function cancel() {
    reset();
    props.onCancel();
  }

  // saves name and interviewer input in form
  function save() {
    props.onSave(name, interviewer);
  }

  // tracks error state when input is invalid
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
           <section className="appointment__validation">
             {error}
           </section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}

