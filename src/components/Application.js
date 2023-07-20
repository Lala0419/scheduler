import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "./helpers/selectors";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		// you may put the line below, but will have to remove/comment hardcoded appointments variable
		appointments: {},
	});
	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const setDay = (day) => setState((prev) => ({ ...prev, day }));

	//const setDays = (days) => setState((prev) => ({ ...prev, days }));

	useEffect(() => {
		const baseUrl = "http://localhost:8001/api";
		const daysPromise = axios.get(`${baseUrl}/days`);
		const appointmentsPromise = axios.get(`${baseUrl}/appointments`);

		const promises = [daysPromise, appointmentsPromise];

		// make multiple requests at the same time for our dependent data by using Promise.all
		Promise.all(promises).then((all) => {
			console.log(all);
			const daysData = all[0].data;
			const appointmentsData = all[1].data;

			//update the state
			setState((prev) => ({
				...prev,
				days: daysData,
				appointments: appointmentsData,
			}));
		});
	}, []);

	const appArray = dailyAppointments.map((appointment) => {
		return <Appointment key={appointment.id} {...appointment} />;
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
