import React, { useState } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {
  const { id, time, interview } = props
  const [interviewer, setInterviewer] = useState(props.value || null);
    return (
      <article className="Appointment"><Header time={props.time} />{interview ? <Show key={id} time={time} student={interview.student} interviewer={interview.interviewer} /> : <Empty />}</article>
    )
  }


