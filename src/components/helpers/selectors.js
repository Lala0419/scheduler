export function getAppointmentsForDay(state, day) {
	//... returns an array of appointments for that day
	if (state.days.length === 0) {
		return [];
	}
	const selectedDay = state.days.find((d) => d.name === day);
	//const selectedDay = state.days.filter((d) => d.name === day)[0];
	//console.log("selectedDay", selectedDay);
	if (selectedDay === undefined) {
		return [];
	}

	const appointmentsForDay = selectedDay.appointments.map(
		(appointmentID) => state.appointments[appointmentID]
	);

	return appointmentsForDay;
}

// THIS DID NOT WORK BECAUSE INTERVIEWERS IS OBJECTS IN A **OBJECT**
// export function getInterview(state, interview) {
// 	if (interview === null) {
// 		return null;
// 	}

// 	// const selectedInterviewer = state.interviewers.filter(
// 	// 	(i) => i.id === interview.interview.interviewer
// 	// )[0];
/**
  selectApp is already done?
	console.log("selectedInterviewer", selectedInterviewer);
	Error: .filter not a function
 */

// }

//pos something code
/**
 * インタビューデータが欲しい。。
	どのデータ？
	appointんめんtsの中のinterviewえr 番号のやつ
	then you need to know the ID that matches
	how do you get the id?
	answer = interview.interviewer
	then now you know the interviewer data you want using the id

 */

export function getInterview(state, interview) {
	// console.log("state", state);
	// console.log("interview", interview);
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

// selectedDay is an object like below
//  {
//   "id": 1,
//   "name": "Monday",
//   "appointments": [
//       1,
//       2,
//       3,
//       4,
//       5
//   ],
//   "interviewers": [
//       1,
//       2,
//       3,
//       6,
//       8
//   ],
//   "spots": 3
// },

/** 
if selectedDay.name = "Monday", appointments array is [1,2,3,4,5]
state.appointments[appointmentID] 
and this [appointmentID] = 1 or 2 or 3 or 4 or 5
**/

// so appointmentsForDay =
// [
//"1": {
//   "id": 1,
//   "time": "12pm",
//   "interview": {
//                 "student": "Archie Cohen",
//                 "interviewer": 8
//               }
// },
// "2": {
//   "id": 2,
//   "time": "1pm",
//   "interview": {
//               "student": "Chad Takahashi",
//               "interviewer": 8
//               }
// },
// "3": {
//   "id": 3,
//   "time": "2pm",
//   "interview": null
// },
// "4": {
//   "id": 4,
//   "time": "3pm",
//   "interview": null
// },
// "5": {
//   "id": 5,
//   "time": "4pm",
//   "interview": null
// },
// ]

export function getInterviewersForDay(state, day) {
	//... returns an array of appointments for that day
	if (state.days.length === 0) {
		return [];
	}
	const selectedDay = state.days.find((d) => d.name === day);
	//const selectedDay = state.days.filter((d) => d.name === day)[0];
	//console.log("selectedDayI", selectedDay);
	if (selectedDay === undefined) {
		return [];
	}

	const interviewersForDay = selectedDay.interviewers.map(
		(interviewerID) => state.interviewers[interviewerID]
	);

	//console.log("interviewersForDay", interviewersForDay);

	return interviewersForDay;
}
