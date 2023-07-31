/////////////////////
// useReduce
/////////////////////

export const INITIAL_STATE = {
	day: "Monday",
	days: [],
	appointments: {},
	interviewers: {},
};

export const ACTION_TYPES = {
	SET_DAY: "SET_DAY",
	SET_APPLICATION_DATA: "SET_APPLICATION_DATA",
	SET_INTERVIEW: "SET_INTERVIEW",
};

export function setReducer(state, action) {
	switch (action.type) {
		case ACTION_TYPES.SET_DAY:
			return {
				...state,
				day: action.payload,
			};
		case ACTION_TYPES.SET_APPLICATION_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPES.SET_INTERVIEW:
			return {
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
