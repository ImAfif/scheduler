import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";
import { validate } from "@babel/types";
import Button from "components/Button";


export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.value || null);
  const [error, setError] = useState("");
  function reset() {

    setStudent("");
    setInterviewer(null)
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function validate() {

    if (student === "") {
      setError("Appointments must have a student name and an interviewer")
      return;
    } 
    setError("")
    props.onSave(student, interviewer);
    }
  


  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    <InterviewerList 
          interviewers={props.interviewers} value={interviewer} interviewer={interviewer} onChange={(event) => setInterviewer(event)}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}