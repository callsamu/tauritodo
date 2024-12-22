import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { Task } from "./lib/types";
import { InMemoryTaskRepository } from "./lib/InMemoryTaskRepository";
import { TaskView } from "./lib/TaskView";
import { TaskForm } from "./components/task-form";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox.tsx";


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
		child.push(
			<li 
			className="
				border border-border p-2 rounded-xl
				pl-8 flex justify-between
			"
			key={task.id}>
				<div className="flex items-center gap-2">
					<Checkbox className="" disabled={false} />
				<span>{task.title}</span>
				</div>
				<div className="float-right">
					<Button variant="link" size="sm" onClick={() => tasks.edit(task).then(setTasks)}>Edit</Button>
					<Button variant="link" size="sm" onClick={() => tasks.delete(task.id).then(setTasks)}>Delete</Button>
				</div>
			</li>
		);
	}

	return (
		<ThemeProvider defaultTheme="dark">
			<main className="mx-auto py-6 md:w-1/2 sm:w-full">
				<h1 className="font-bold text-2xl my-4">Tauri Todo</h1>
				<TaskForm onSubmit={task => tasks.add(task.title).then(setTasks)} />
				<ul className="flex flex-col gap-3 text-lg mt-10">
					{child}
				</ul>
			</main>
		</ThemeProvider>
	);
}

export default App;
