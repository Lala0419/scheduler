import React from "react";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
	const interviewerListItems = props.interviewers.map((interviewer) => {
		const handleClick = () => {
			props.onChange(interviewer.id);
		};
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={interviewer.id === props.value}
				onChange={handleClick}
			/>
		);
	});

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{interviewerListItems}</ul>
		</section>
	);
}

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};
