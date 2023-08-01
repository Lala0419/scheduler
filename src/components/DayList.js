import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
	const listItems = props.days.map((day) => {
		//compass suggested to use lifting but evaluator and a mentor said it's better not to in this case
		// const handleClick = () => {
		// 	props.onChange(day.name);
		// };
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === props.value}
				onChange={props.onChange}
			/>
		);
	});

	return <ul>{listItems}</ul>;
}
