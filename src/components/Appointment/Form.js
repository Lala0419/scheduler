import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import InterviewerListItem from "components/InterviewerListItem";
import React, { useState } from "react";

export default function Form(props) {
	const [student, setStudent] = useState(props.student || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);

	// const handleChange = (e) => {
	// 	setStudent(e.target.value);
	// };
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// };

	const reset = () => {
		setStudent("");
		setInterviewer(null);
	};

	const cancel = () => {
		props.onCancel();
		reset();
	};
	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form
					autoComplete="off"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						onChange={(e) => {
							setStudent(e.target.value);
						}}
						value={student}
						/*
          This must be a controlled component
          your code goes here
        */
					/>
				</form>
				<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
					onChange={setInterviewer}

					//tried handleClick, onChange, props.onChange
					/* your code goes here */
				/>
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={props.onCancel}>
						Cancel
					</Button>
					<Button confirm onClick={props.onSave}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
