import { useEffect, useState } from "react";
import axios from "axios";

function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});
	const baseUrl = "/api";

	useEffect(() => {
		const daysPromise = axios.get(`${baseUrl}/days`);
		const appointmentsPromise = axios.get(`${baseUrl}/appointments`);
		const interviewersPromise = axios.get(`${baseUrl}/interviewers`);

		const promises = [daysPromise, appointmentsPromise, interviewersPromise];

		// make multiple requests at the same time for our dependent data by using Promise.all
		Promise.all(promises).then((all) => {
			//	console.log(all);
			const daysData = all[0].data;
			const appointmentsData = all[1].data;
			const interviewersData = all[2].data;
			//update the state
			setState((prev) => ({
				...prev,
				days: daysData,
				appointments: appointmentsData,
				interviewers: interviewersData,
			}));
		});
	}, []);

	const setDay = (day) => setState((prev) => ({ ...prev, day }));

	function bookInterview(id, interview) {
		//console.log("bookInterview", id, interview);
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios
			.put(`${baseUrl}/appointments/${id}`, { interview })
			.then(() => {
				setState({
					...state,
					appointments,
				});
			});
	}

	function cancelInterview(id) {
		//console.log("cancelInterview", id);
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios.delete(`${baseUrl}/appointments/${id}`).then(() => {
			setState({
				...state,
				appointments,
			});
		});
	}

	return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
