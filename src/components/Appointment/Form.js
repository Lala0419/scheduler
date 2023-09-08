import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from "react";

export default function Form(props) {
	const [student, setStudent] = useState(props.student || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [errorMsg, setErrorMsg] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setStudent(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	// const handleClick = () => {
	// 	if (student && interviewer) {
	// 		props.onSave(student, interviewer);
	// 	} else {
	// 		setErrorMsg("Please fill your name and choose a interviewer");
	// 		setTimeout(() => {
	// 			setErrorMsg("");
	// 		}, 2000);
	// 	}
	// };

	const reset = () => {
		setStudent("");
		setInterviewer(null);
	};

	const cancel = () => {
		props.onCancel();
		reset();
	};

	function validate() {
		if (student === "") {
			setError("Student name cannot be blank");
			return;
		}

		// if (interviewer === null) {
		// 	setError("Please select an interviewer");
		// 	return;
		// }

		props.onSave(student, interviewer);
	}
	return (
		<main className="appointment__card appointment__card--create">
			<section className="appointment__card-left">
				<form autoComplete="off" onSubmit={handleSubmit}>
					<input
						className="appointment__create-input text--semi-bold"
						name="name"
						type="text"
						placeholder="Enter Student Name"
						onChange={handleChange}
						value={student}
						data-testid="student-name-input"
					/>
				</form>
				<section className="appointment__validation">{error}</section>
				<InterviewerList
					interviewers={props.interviewers}
					value={interviewer}
					onChange={setInterviewer}
				/>
				{errorMsg && <p className="errorMsg">{errorMsg}</p>}
			</section>
			<section className="appointment__card-right">
				<section className="appointment__actions">
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
