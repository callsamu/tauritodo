import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

const formSchema = z.object({
	title: z.string().nonempty({
		message: "Title is required",
	}).max(32, {
		message: "Title must not be greater than 32 characters",
	}),
});

export type TaskSchema = z.infer<typeof formSchema>;

interface TaskFormProps {
	onSubmit: (values: TaskSchema) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
	const form = useForm<TaskSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	return (
		<Form {... form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Title" {...field} />
							</FormControl>
							<FormDescription>
							 Hello
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}




