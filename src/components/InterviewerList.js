import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
	const interviewerListItems = props.interviewers.map((interviewer) => {
		// const handleClick = () => {
		// 	// console.log("onclickcall", props.id);
		// 	props.onChange(interviewer.id);
		// };
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={interviewer.id === props.value} //3
				onChange={() => {
					props.onChange(interviewer.id);
				}}
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
