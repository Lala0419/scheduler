import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
	const handleClick = () => {
		props.setInterviewer(props.id);
	};

	const interviewerClass = classNames("interviewers__item", {
		"interviewers__item--selected": props.selected,
	});

	return (
		<li className={interviewerClass} onClick={handleClick}>
			<img
				className="interviewers__item-image"
				src={props.avatar}
				alt="Sylvia Palmer"
			/>
			{props.name}
		</li>
	);
}
