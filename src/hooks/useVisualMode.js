import { useState } from "react";

export function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
	const [history, setHistory] = useState([initial]);

	function transition(newMode, replace = false) {
		if (!replace) {
			//add the new mode to our history
			setHistory((prevHistory) => [...prevHistory, newMode]);

			//and set the new mode
			setMode(newMode);
		} else {
			const temp = [...history];
			temp.pop();
			setHistory([...temp, newMode]);
			setMode(newMode);
		}
	}

	function back() {
		if (history.length <= 1) {
			return;
		}
		//remove the current mode from the history
		const newHistory = history.slice(0, -1);
		//get the previous mode
		const prevMode = newHistory[newHistory.length - 1];

		//update the mode and mode history
		setMode(prevMode);
		setHistory(newHistory);
	}
	return { mode, transition, back, history };
}
