import { useState } from "react";

export function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	//Very confusing after adding the second arg
	function transition(newMode, replace = false) {
		if (!replace) {
			//add the new mode to our history
			setHistory([...history, newMode]);
			console.log("history", history); //FIRST
			//and set the new mode
			setMode(newMode);
			console.log("newMode", newMode); //SECOND
		} else {
			const temp = history;
			console.log("temp", temp); //[ 'FIRST', 'SECOND' ]

			temp.pop();
			setHistory([...temp, newMode]);
			console.log("tempafterset", temp); //[ 'FIRST' ]
			setMode(newMode);
			console.log("newMode", newMode); //[ 'FIRST' ]
		}
	}

	function back() {
		// If there's only one mode in the history, there's nowhere to go back
		if (history.length <= 1) {
			return;
		}
		//? need to set the mode to the previous item in our history array
		const newHistory = history.slice(0, -1); //remove the current mode from the history
		const prevMode = newHistory[newHistory.length - 1]; //get the previous mode

		//update the mode and mode history
		setMode(prevMode);
		setHistory(newHistory);
	}
	return { mode, transition, back }; //{mode: mode}
}

/////////////////////////
//correct
/////////////////////////

// import { useState } from "react";

// export function useVisualMode(initial) {
// 	const [modeHistory, setModeHistory] = useState([initial]);

// 	function transition(newMode) {
// 		setModeHistory((prevModeHistory) => [...prevModeHistory, newMode]);
// 	}

// 	function back() {
// 		if (modeHistory.length <= 1) {
// 			return;
// 		}

// 		setModeHistory((prevModeHistory) => prevModeHistory.slice(0, -1));
// 	}

// 	const mode = modeHistory[modeHistory.length - 1];

// 	return { mode, transition, back };
// }
