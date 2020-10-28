import React from "react"; 
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const interviewPeople = props.interviewers.map(interviewerDetails => {
   
    return (
      <InterviewerListItem
        key={interviewerDetails.id}
        name={interviewerDetails.name}
        avatar={interviewerDetails.avatar}
        selected={interviewerDetails.id === props.interviewer}
        setInterviewer= {event => props.setInterviewer(interviewerDetails.id)}
      />
    );
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewPeople}
      </ul>
    </section>
  );
}