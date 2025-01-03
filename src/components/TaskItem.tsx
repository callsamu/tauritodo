import { Task } from "@/lib/types"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { TaskForm } from "./task-form";
import { useState } from "react";
import { Edit, Trash } from "lucide-react";

type TaskHandler = (task: Task) => void;

interface TaskItemProps {
	task: Task,
	onDone: () => {};
	onEdit: TaskHandler;
	onDelete: TaskHandler;
}

export default function TaskItem({ 
	task, 
	onDone, 
	onEdit, 
	onDelete 
}: TaskItemProps) {
	const [open, setOpen] = useState(false);

	return (
		<div 
			className="
				border-2 shadow border-border p-2 rounded-xl
				pl-8 flex justify-between 
			"
		>
			<div className="flex items-center gap-4">
				<Checkbox onCheckedChange={onDone} checked={task.done} />
			<span>{task.title}</span>
			</div>
			<div className="float-right flex gap-3 mx-3">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button variant="secondary" size="sm"> 
							<Edit />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Task</DialogTitle>
						</DialogHeader>
						<TaskForm defaults={task} onSubmit={values => {
							setOpen(false);
							onEdit({ ...task, ...values });
						}} />
					</DialogContent>
				</Dialog>
				<Button variant="destructive" size="sm" onClick={() => onDelete(task)}>
					<Trash />
				</Button>
			</div>
		</div>
	);
}
