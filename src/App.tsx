import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import { InMemoryTaskRepository } from "./lib/InMemoryTaskRepository";
import { TaskView } from "./lib/TaskView";
import { TaskForm } from "./components/task-form";
import TaskItem from "./components/TaskItem.tsx";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs.tsx";

enum States {
	TODO = "TODO",
	DONE = "DONE",
};

function App() {
	const repository = InMemoryTaskRepository.initialize([
		"Walk the Dog",
		"Buy groceries",
		"Clean the house",
		"Perform an iron cross on the rings",
	]);

	const [tasks, setTasks] = useState<TaskView>(
		TaskView.empty(repository)
	);

	const [tab, setTab] = useState(States.TODO);

	useEffect(() => {
		console.log(tab);
		tasks.search({ done: tab === States.DONE }).then(setTasks);
		return () => {};
	}, [tab])


	const child = [];

	for (const task of tasks.iter()) {
		child.push(
			<li key={task.id}>
				<TaskItem 
					task={task}
					onDone={
						() => tasks.edit({ ...task, done: true }).
							then(tasks => tasks.search({ done: tab === States.DONE })).
							then(setTasks)
					}
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
				<Tabs defaultValue={tab} onValueChange={tab => setTab(tab as States)} className="mt-4">
					<TabsList>
						<TabsTrigger value={States.TODO}>TODO</TabsTrigger>
						<TabsTrigger value={States.DONE}>DONE</TabsTrigger>
					</TabsList>
					<ul className="flex flex-col-reverse gap-5 text-md my-4 mx-auto">
						{child}
					</ul>
				</Tabs>
			</main>
		</ThemeProvider>
	);
}

export default App;
