import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
	// const handleClick = () => {
	// 	props.setDay(props.name);
	// };

	const dayClass = classNames("day-list__item", {
		" day-list__item--selected": props.selected,
		" day-list__item--full": props.spots === 0,
	});

	return (
		<li className={dayClass} onClick={props.setDay}>
			<h2 className="text--regular">{props.name}</h2>
			{/* <h3 className="text--light">{props.spots === 0}no spots remaining</h3>
			<h3 className="text--light">{props.spots === 1} 1 spot remaining</h3>
			<h3 className="text--light">{props.spots} spots remaining</h3> */}
			{/* another solution wchi you can specify when spots are more than 1 (props.spots > 1) */}
			{props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
			{props.spots === 1 && <h3 className="text--light"> 1 spot remaining</h3>}
			{props.spots > 1 && (
				<h3 className="text--light">{props.spots} spots remaining</h3>
			)}
		</li>
	);
}
