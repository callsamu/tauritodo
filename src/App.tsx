import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { InMemoryTaskRepository } from "./lib/InMemoryTaskRepository";
import { TaskView } from "./lib/TaskView";
import { TaskForm } from "./components/task-form";
import TaskItem from "./components/TaskItem.tsx";


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
			<li key={task.id}>
				<TaskItem 
					task={task}
					onDone={() => tasks.edit({ ...task, done: true }).then(setTasks)}
					onEdit={task => tasks.edit(task).then(setTasks)}
					onDelete={task => tasks.delete(task.id).then(setTasks)}
				/>
			</li>
		);
	}

	return (
		<ThemeProvider defaultTheme="dark">
			<main className="mx-auto mt-10 py-6 md:w-1/3 sm:w-full">
				<h1 className="font-bold text-2xl my-4">Tauri Todo</h1>
				<TaskForm onSubmit={task => tasks.add(task.title).then(setTasks)} />
				<ul className="flex flex-col gap-5 text-lg mt-10 mx-auto">
					{child}
				</ul>
			</main>
		</ThemeProvider>
	);
}

export default App;
