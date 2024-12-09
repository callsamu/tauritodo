import { Task, TaskRepository } from "./types";

export class InMemoryTaskRepository implements TaskRepository {
	private static counter = 0;
	private store = new Map<string, Task>();

	async search(filters: Partial<Task>): Promise<Task[]> {
		const tasks: Task[] = [];

		for (const [_, task] of this.store) {
			const { title, done } = filters;

			if (title && !task.title.includes(task.title))
				continue;

			if (done !== undefined && task.done !== done)
				continue;

			tasks.push(task);
		}

		return Promise.resolve(tasks);
	}

	async create(title: string): Promise<Task> {
		const id = InMemoryTaskRepository.counter.toString();
		InMemoryTaskRepository.counter++;

		const newTask: Task = {
			id: id.toString(),
			title,
			done: false
		};

		this.store.set(id, newTask);
		return Promise.resolve(newTask);
	}

	async edit(task: Task): Promise<Task> {
		this.store.set(task.id, task);
		return Promise.resolve(task);
	}

	remove(id: string): Promise<void> {
		this.store.delete(id);
		return Promise.resolve();
	}
}
	

