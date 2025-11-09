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
import { statusToColumnMap, taskPriority } from "@/constants";
import { Textarea } from "./ui/textarea";
import {
  ChevronsDown,
  ChevronsRight,
  ChevronsUp,
  ClipboardCheck,
} from "lucide-react";
import { useEffect } from "react";
import ProjectSelector from "./ProjectSelector";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/Store/Store";
import { addTask, deleteTask, updateTask } from "@/lib/Slice/kanbanSlice";
import type { Task, TaskPriorityType, TaskStatusType } from "@/types";
import { selectProjectById } from "@/lib/utils";
import { toast } from "sonner";

interface TaskFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: "Create" | "Update"
  task?:Task
}

function TaskForm({ open, setOpen, state,task }: TaskFormProps) {
  const activeId = useSelector((state: RootState) => state.active.id);
  const project = useSelector(selectProjectById(activeId!));
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      projectId: activeId ? activeId : "",
      title: "",
      description: "",
      priority: "Low",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  useEffect(() => {
    if (task && state === "Update") {
      form.reset({
        projectId: activeId ? activeId : "",
        title: task.title,
        description: task.description,
        priority : task.priority as TaskPriorityType
      });
    } else {
      form.reset({
        projectId: activeId ? activeId : "",
        title: "",
        description: "",
        priority: "Low",
      });
    }
  },[form,task,state,activeId])

  const onSubmit = (values: z.infer<typeof TaskFormSchema>) => {
    if (project) {
      const columns = ["todo", "inProgress", "done"];
      const isDuplicate = columns.some((col) =>
        project.columns[col].tasks.some((t) =>
          state === "Update" && t.id === task?.id
            ? false
            : t.title.toLowerCase().trim() === values.title.toLowerCase().trim()
        )
      );
      if (isDuplicate) {
        return toast.error("Task already exists!!");
      } else {
        if (!task && state === "Create") {
          dispatch(addTask({ projectId: values.projectId, title: values.title, priority: values.priority, description: values.description, columnId: "todo" }))
        }
        else if (task && state === "Update" && values.projectId !== activeId) {
          dispatch(
            addTask({
              id:task.id,
              projectId: values.projectId,
              title: values.title,
              priority: values.priority,
              description: values.description,
              columnId:statusToColumnMap[task.status as TaskStatusType] ,
            })
          );
          dispatch(
            deleteTask({
              projectId: activeId!,
              columnId: statusToColumnMap[task.status as TaskStatusType],
              id:task.id
            })
          );
        } else if (task && state === "Update" && values.projectId === activeId) {
          dispatch(
            updateTask({
              id: task.id,
              projectId: values.projectId,
              title: values.title,
              description: values.description,
              status: task.status as TaskStatusType,
              columnId: statusToColumnMap[task.status as TaskStatusType],
              priority: values.priority,
              targetIndex:null
            })
          );
        }
      }
      setOpen(!open);
      form.reset();
    } else {
     return toast.error("Create a project before adding a task!!")
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col justify-center gap-3">
                <div className="w-10 h-10 bg-gray-300 dark:bg-white dark:text-black rounded-full flex items-center justify-center">
                  <ClipboardCheck />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold leading-2 mt-2">
                    {state === "Create" ? "Add Task" : "Update Task"}
                  </h3>
                  <p className="text-gray-500 text-sm font-light mb-4">
                    {state === "Create"
                      ? "Fill in the form below to create a task."
                      : "Fill in the form below to modify a task."
                    }
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
                          <Input
                            className="min-w-[300px]"
                            placeholder="Enter Task Title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <ProjectSelector
                    name="projectId"
                    control={form.control}
                    label="Project"
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea className="w-[300px]" {...field} />
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
                            <SelectTrigger className="w-[300px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {taskPriority.map((priority) => (
                                <SelectItem key={priority} value={priority}>
                                  <div className="w-full flex items-center gap-3">
                                    {priority === "High" && (
                                      <div className="bg-red-500/15 rounded-md p-1">
                                        <ChevronsUp color="red" />
                                      </div>
                                    )}
                                    {priority === "Low" && (
                                      <div className="bg-green-500/15 p-1 rounded-md">
                                        <ChevronsDown color="green" />
                                      </div>
                                    )}
                                    {priority == "Medium" && (
                                      <div className="bg-yellow-500/15 p-1 rounded-md">
                                        <ChevronsRight className="text-yellow-500" />
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
                </div>
                <div className="w-full flex items-center justify-end gap-3">
                  <Button
                    onClick={() => setOpen(false)}
                    variant={"secondary"}
                    className="cursor-pointer"
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button className="cursor-pointer" type="submit">
                    {state === "Create" ? "Add" : "Update"}
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

export default TaskForm;
