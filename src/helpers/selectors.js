export function getAppointmentsForDay(state, day) {
	if (state.days.length === 0) {
		return [];
	}
	const selectedDay = state?.days?.filter((d) => d.name === day);
	console.log("state.days", state.days);
	if (selectedDay === undefined) {
		return [];
	}

	const appointmentsForDay = selectedDay.appointments.map(
		(appointmentID) => state.appointments[appointmentID]
	);

	return appointmentsForDay;
}

export function getInterview(state, interview) {
	if (interview === null) {
		return null;
	}

	const interviewerId = interview.interviewer;
	const selectedInterviewData = state.interviewers[interviewerId];

	return {
		student: interview.student,
		interviewer: {
			id: selectedInterviewData.id,
			name: selectedInterviewData.name,
			avatar: selectedInterviewData.avatar,
		},
	};
}

export function getInterviewersForDay(state, day) {
	if (state.days.length === 0) {
		return [];
	}
	const selectedDay = state?.days?.filter((d) => d.name === day);

	if (selectedDay === undefined) {
		return [];
	}

	const interviewersForDay = selectedDay.interviewers.map(
		(interviewerID) => state.interviewers[interviewerID]
	);

	return interviewersForDay;
}
