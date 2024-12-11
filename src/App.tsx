import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Task } from "./lib/types";
import { InMemoryTaskRepository } from "./lib/InMemoryTaskRepository";
import { TaskView } from "./lib/TaskView";
import { TaskForm } from "./components/task-form";


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
				<h1 className="font-bold text-2xl">Tauri Todo</h1>
				<TaskForm onSubmit={task => tasks.add(task.title).then(setTasks)} />
				<ul>
					{child}
				</ul>
			</main>
		</ThemeProvider>
	);
}

export default App;
