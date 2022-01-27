import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from "prop-types";

function InterviewerList(props) {
  
  const interviewers = props.interviewers.map((interviewer) => {
return (
      <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name} 
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={(event) => props.onChange(interviewer.id)}
  />
)
    //props.setInterviewer(interviewer.id)

  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers Available</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  interviewers: PropTypes.array.isRequired,
  onchange: PropTypes.func.isRequired
};

export default InterviewerList;

