import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { useVisualMode } from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {
	const SHOW = "SHOW";
	const EMPTY = "EMPTY";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);
	console.log("props.interviewers", props.interviewers);
	console.log("propsAppo", props);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props.bookInterview(props.id, interview).then(() => {
			transition(SHOW);
		});
	}
	console.log("propsINDEX", props);
	return (
		<div className="appointment">
			<Header time={props.time} />{" "}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer.name}
				/>
			)}
			{mode === CREATE && (
				<Form interviewers={props.interviewers} onCancel={back} onSave={save} />
			)}
			{mode === SAVING && <Status />}
		</div>
	);
}
