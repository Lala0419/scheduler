import { useEffect, useReducer } from "react";
import axios from "axios";
import { INITIAL_STATE, ACTION_TYPES, setReducer } from "../setReducer";

function updateSpots(state, dayName) {
	const day = state.days.find((day) => day.name === dayName);
	const avaiableSpot = day.appointments.filter(
		(appointmentId) => state.appointments[appointmentId].interview === null
	).length;
	const newDay = { ...day, spots: avaiableSpot };
	const newDays = state.days.map((d) => (d.name === dayName ? newDay : d));

	return newDays;
}

// /////////////////////
// // useReduce
// /////////////////////

// const SET_DAY = "SET_DAY";
// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// const SET_INTERVIEW = "SET_INTERVIEW";
// function reducer(state, action) {
// 	switch (action.type) {
// 		case SET_DAY:
// 			return {
// 				...state,
// 				day: action.payload,
// 			};
// 		case SET_APPLICATION_DATA:
// 			return {
// 				...state,
// 				...action.payload,
// 			};
// 		case SET_INTERVIEW:
// 			return {
// 				...state,
// 				appointments: action.payload.appointments,
// 				days: action.payload.days,
// 			};
// 		default:
// 			throw new Error(
// 				`Tried to reduce with unsupported action type: ${action.type}`
// 			);
// 	}
// }

// const INITIAL_STATE = {
// 	day: "Monday",
// 	days: [],
// 	appointments: {},
// 	interviewers: {},
// };

const baseUrl = `${process.env.REACT_APP_BASE_URL}/api`;
console.log("baseURL", baseUrl);
function useApplicationData() {
	const [state, dispatch] = useReducer(setReducer, INITIAL_STATE);

	useEffect(() => {
		const daysPromise = axios.get(`${baseUrl}/days`);
		const appointmentsPromise = axios.get(`${baseUrl}/appointments`);
		const interviewersPromise = axios.get(`${baseUrl}/interviewers`);

		const promises = [daysPromise, appointmentsPromise, interviewersPromise];

		Promise.all(promises).then((all) => {
			const daysData = all[0].data;
			console.log("all", all);
			const appointmentsData = all[1].data;
			const interviewersData = all[2].data;

			dispatch({
				type: ACTION_TYPES.SET_APPLICATION_DATA,
				payload: {
					days: daysData,
					appointments: appointmentsData,
					interviewers: interviewersData,
				},
			});
		});
	}, []);

	const setDay = (day) =>
		dispatch({ type: ACTION_TYPES.SET_DAY, payload: day });

	function bookInterview(id, interview) {
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
				const copyOfState = { ...state, appointments: appointments };

				const days = updateSpots(copyOfState, state.day);

				dispatch({
					type: ACTION_TYPES.SET_INTERVIEW,
					payload: { appointments, days },
				});
			});
	}

	function cancelInterview(id) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		return axios.delete(`${baseUrl}/appointments/${id}`).then(() => {
			const copyOfState = { ...state, appointments: appointments };
			const days = updateSpots(copyOfState, state.day);
			dispatch({
				type: ACTION_TYPES.SET_INTERVIEW,
				payload: { appointments, days },
			});
		});
	}

	return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;
