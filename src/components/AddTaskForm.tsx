import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TaskFormSchema } from "@/lib/Zod/Schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { taskPriority } from "@/constants";
import { Textarea } from "./ui/textarea";
import { ChevronsDown, ChevronsRight, ChevronsUp, ClipboardCheck } from "lucide-react";
import { useEffect } from "react";

interface AddTaskFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddTaskForm({ open, setOpen }: AddTaskFormProps) {
  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Low",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form])
  
  const onSubmit = (values: z.infer<typeof TaskFormSchema>) => {
    console.log(values);
    form.reset()
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-full">
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col justify-center gap-3">
                <div className="w-10 h-10 bg-gray-300 dark:bg-white dark:text-black rounded-full flex items-center justify-center">
                  <ClipboardCheck />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold leading-2 mt-2">Add Task</h3>
                  <p className="text-gray-500 text-sm font-light mb-4">
                    Fill in the form below to create or modify a task.
                  </p>
                </div>
              </div>
            </DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 flex-wrap">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Task Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {taskPriority.map((priority) => (
                                <SelectItem key={priority} value={priority}>
                                  <div className="w-full flex items-center gap-3">
                                    {priority === "High" && (
                                      <div className="bg-red-500/40 rounded-md p-1">
                                        <ChevronsUp color="red" />
                                      </div>
                                    )}
                                    {priority === "Low" && (
                                      <div className="bg-green-500/40 p-1 rounded-md">
                                        <ChevronsDown color="green" />
                                      </div>
                                    )}
                                    {priority == "Medium" && (
                                      <div className="bg-orange-500/40 p-1 rounded-md">
                                        <ChevronsRight color={"orange"} />
                                      </div>
                                    )}
                                  </div>
                                  {priority}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea className="w-[450px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex items-center justify-end gap-3">
                  <Button className="cursor-pointer" type="submit">
                   Add Task
                  </Button>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddTaskForm;
