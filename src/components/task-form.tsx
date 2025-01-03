import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Task } from "@/lib/types";

const formSchema = z.object({
	title: z.string().nonempty({
		message: "Title is required",
	}).max(32, {
		message: "Title must not be greater than 32 characters",
	}),
});

export type TaskSchema = z.infer<typeof formSchema>;

interface TaskFormProps {
	defaults?: Task;
	onSubmit: (values: TaskSchema) => void;
}

export function TaskForm({ defaults, onSubmit }: TaskFormProps) {
	const form = useForm<TaskSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: defaults?.title ?? '',
		},
	});

	function _onSubmit(values: TaskSchema) {
		onSubmit(values);
		form.reset();
	}

	return (
		<Form {... form}>
			<form 
				className="w-full flex items-end gap-4 text-3xl"
				onSubmit={form.handleSubmit(_onSubmit)}
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="text-3xl flex-grow">
							<FormLabel>Task Title</FormLabel>
							<FormControl>
								<Input placeholder="Walk the Dog" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button variant="default" type="submit">Submit</Button>
			</form>
		</Form>
	);
}




