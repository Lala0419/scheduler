import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	const listItems = props.days.map((day) => {
		const handleClick = () => {
			props.setDay(props.name);
		};
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === props.day}
				setDay={handleClick}
			/>
		);
	});

	return <ul>{listItems}</ul>;
}
