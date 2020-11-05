import React from "react";

import PropTypes from 'prop-types';

// import styling
import "components/InterviewerList.scss";

// import components
import InterviewerListItem from "components/InterviewerListItem";

function InterviewerList(props) {

  // list of interviewers and properties
  const interviewPeople = props.interviewers.map(interviewerDetails => {

    return (
      <InterviewerListItem
        key={interviewerDetails.id}
        name={interviewerDetails.name}
        avatar={interviewerDetails.avatar}
        selected={interviewerDetails.id === props.value}
        setInterviewer={event => props.onChange(interviewerDetails.id)}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;