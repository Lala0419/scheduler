import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "./helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
	const { state, setDay, bookInterview, cancelInterview } =
		useApplicationData();
	// console.log(
	// 	"useApplication",
	// 	"state",
	// 	state,
	// 	"setDay",
	// 	setDay,
	// 	"bookInterview",
	// 	bookInterview,
	// 	"cancelInterview",
	// 	cancelInterview
	// );
	const dailyInterviewers = getInterviewersForDay(state, state.day);
	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const appArray = dailyAppointments.map((appointment) => {
		return (
			<Appointment
				key={appointment.id}
				{...appointment}
				interviewers={dailyInterviewers}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
				interview={getInterview(state, appointment.interview)}
			/>
		);
	});

	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					{/* look these props are identical to the testing! day and setDay was coming from the useState */}
					<DayList days={state.days} value={state.day} onChange={setDay} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>
			<section className="schedule">
				{appArray}
				<Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
