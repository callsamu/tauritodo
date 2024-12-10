import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Task } from "./lib/types";
import { InMemoryTaskRepository } from "./lib/InMemoryTaskRepository";
import { TaskView } from "./lib/TaskView";

function App() {
	const repository = new InMemoryTaskRepository();
	const [tasks, setTasks] = useState<TaskView>(
		TaskView.empty(repository)
	);

	useEffect(() => {
		tasks.search({}).then(setTasks);
		return () => {};
	}, [])

	const child = [];

	for (const task of tasks.iter()) {
		child.push(<li key={task.id}>{task.title}</li>);
	}

	return (
		<ThemeProvider defaultTheme="dark">
			<main>
				<h1>Tauri Todo</h1>
				<ul>
					{child}
				</ul>
			</main>
		</ThemeProvider>
	);
}

export default App;
