import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	const listItems = props.days.map((day) => {
		const handleClick = () => {
			props.onChange(day.name);
		};
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === props.value}
				onChange={handleClick}
			/>
		);
	});

	return <ul>{listItems}</ul>;
}
