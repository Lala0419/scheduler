import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
	// const handleClick = () => {
	// 	// console.log("onclickcall", props.id);
	// 	props.setInterviewer(props.setInterviewer);
	// };

	const interviewerClass = classNames("interviewers__item", {
		"interviewers__item--selected": props.selected,
	});

	return (
		<li className={interviewerClass} onClick={props.onChange}>
			<img
				className="interviewers__item-image"
				src={props.avatar}
				alt={props.name}
			/>
			{props.selected && props.name}
		</li>
	);
}
