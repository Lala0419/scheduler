import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import { useVisualMode } from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
	const SHOW = "SHOW";
	const EMPTY = "EMPTY";
	const CREATE = "CREATE";
	const SAVING = "SAVING";
	const DELETING = "DELETING";
	const CONFIRM = "CONFIRM";
	const EDIT = "EDIT";
	const ERROR_SAVE = "ERROR_SAVE";
	const ERROR_DELETE = "ERROR_DELETE";
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch(() => {
				transition(ERROR_SAVE, true);
			});
	}

	function destroy() {
		transition(DELETING, true);
		props
			.cancelInterview(props.id)
			.then(() => {
				transition(EMPTY);
			})
			.catch(() => {
				transition(ERROR_DELETE, true);
			});
	}

	return (
		<article className="appointment" data-testid="appointment">
			<Header time={props.time} />{" "}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer.name}
					onDelete={() => {
						transition(CONFIRM);
					}}
					onEdit={() => {
						transition(EDIT);
					}}
				/>
			)}
			{mode === CREATE && (
				<Form interviewers={props.interviewers} onCancel={back} onSave={save} />
			)}
			{mode === SAVING && <Status message="SAVING" />}
			{mode === CONFIRM && (
				<Confirm
					onConfirm={destroy}
					onCancel={back}
					message="Are you sure you would like to delete?"
				/>
			)}
			{mode === EDIT && (
				<Form
					interviewers={props.interviewers}
					onCancel={back}
					onSave={save}
					student={props.interview.student}
					interviewer={props.interview.interviewer.id}
				/>
			)}
			{mode === DELETING && <Status message="DELETING" />}
			{mode === ERROR_DELETE && (
				<Error onClose={back} message="could not delete appointment" />
			)}
			{mode === ERROR_SAVE && (
				<Error onClose={back} message="could not save appointment" />
			)}
		</article>
	);
}
