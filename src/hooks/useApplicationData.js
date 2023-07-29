import { useEffect, useReducer } from "react";
import axios from "axios";

const updateSpots = function (dayName, days, appointments) {
	const day = days.find((d) => d.name === dayName);

	const spots = day.appointments.filter(
		(id) => appointments[id].interview === null
	).length;

	const newDay = { ...day, spots };
	const newDays = days.map((d) => (d.name === dayName ? newDay : d));

	return newDays;
};

// //////////////////
// //My code
// ///////////////////

// function updateSpots(state, dayName) {
// 	const day = state.days.find((day) => day.name === dayName);
// 	const avaiableSpot = day.appointments.filter(
// 		(appointmentId) => state.appointments[appointmentId].interview === null
// 	).length;
// 	const newDay = { ...day, spots: avaiableSpot }; //this is creating a brandnew obj with updated spots property with value, avaialbleSpot
// 	const newDays = state.days.map((d) => (d.name === dayName ? newDay : d));

// 	//day.spots = avaiableSpot;
// 	console.log("state", state);
// 	return newDays;
// }

/////////////////
// useReduce
//////////////////

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const baseUrl = "/api";
function reducer(state, action) {
	switch (action.type) {
		case SET_DAY:
			return {
				/* insert logic */
				...state,
				day: action.payload,
			};
		case SET_APPLICATION_DATA:
			return {
				/* insert logic */
				...state,
				...action.payload,
			};
		case SET_INTERVIEW:
			return {
				/* insert logic */
				...state,
				appointments: action.payload.appointments,
				days: action.payload.days,
			};
		default:
			throw new Error(
				`Tried to reduce with unsupported action type: ${action.type}`
			);
	}
}

const INITIAL_STATE = {
	day: "Monday",
	days: [],
	appointments: {},
	interviewers: {},
};

function useApplicationData() {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

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
			dispatch({
				type: SET_APPLICATION_DATA,
				payload: {
					days: daysData,
					appointments: appointmentsData,
					interviewers: interviewersData,
				},
			});
			// setState((prev) => ({
			// 	...prev,
			// 	days: daysData,
			// 	appointments: appointmentsData,
			// 	interviewers: interviewersData,
			// }));
		});
	}, []);

	const setDay = (day) => dispatch({ type: SET_DAY, payload: day });

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
				const days = updateSpots(state.day, state.days, appointments);
				//const days = updateSpots(state, state.day);
				dispatch({ type: SET_INTERVIEW, payload: { appointments, days } });
				// setState((prevState) => ({
				// 	...prevState,
				// 	appointments,
				// 	days,
				// }));
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
			const days = updateSpots(state.day, state.days, appointments);
			//const days = updateSpots(state, state.day);

			dispatch({ type: SET_INTERVIEW, payload: { appointments, days } });
			// setState((prevState) => ({
			// 	...prevState,
			// 	appointments,
			// 	days,
			// }));
		});
	}

	return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
