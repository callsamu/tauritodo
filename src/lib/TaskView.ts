import { Task, TaskRepository } from "./types";
import { Map as ImmutableMap } from 'immutable';

export class TaskView {
	constructor(
		private repository: TaskRepository,
		private tasks: ImmutableMap<string, Task>,
	) {}

	static empty(repository: TaskRepository): TaskView {
		return new TaskView(repository, ImmutableMap());
	}

	static async fromSearch(
		repository: TaskRepository,
		filters?: Partial<Task>
	): Promise<TaskView> {
		const tasks = await repository.search(filters || {});
		const map = new Map(tasks.map(task => [task.id, task]));
		return new TaskView(repository, ImmutableMap(map));
	}

	iter(): IterableIterator<Task> {
		return this.tasks.values();
	}

	async search(filters?: Partial<Task>): Promise<TaskView> {
		return TaskView.fromSearch(this.repository, filters);
	}

	async add(title: string): Promise<TaskView> {
		const newTask = await this.repository.create(title);
		const tasks = this.tasks.set(newTask.id, newTask);
		return new TaskView(this.repository, tasks);
	}

	async edit(task: Task): Promise<TaskView> {
		const editedTask = await this.repository.edit(task);
		const tasks = this.tasks.set(editedTask.id, editedTask);
		return new TaskView(this.repository, tasks);
	}

	async delete(id: string): Promise<TaskView> {
		await this.repository.remove(id);
		const tasks = this.tasks.delete(id);
		return new TaskView(this.repository, tasks);
	}
}
