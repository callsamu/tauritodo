export interface Task {
	id: string;
	title: string;
	done: boolean;
}

export interface TaskRepository {
	search: (filters: Partial<Task>) => Promise<Task[]>;
	create: (title: string) => Promise<Task>;
	edit: (task: Task) => Promise<Task>;
	remove: (id: string) => Promise<void>;
}
