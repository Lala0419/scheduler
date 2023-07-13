import React from "react";

export default function DayListItem(props) {
	const handleClick = () => {
		props.setDay(props.name);
	};
	return (
		<li onClick={handleClick}>
			<h2 className="text--regular">{props.name}</h2>
			<h3 className="text--light">{props.spots} spots remaining</h3>
		</li>
	);
}
