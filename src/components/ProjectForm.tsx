import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FolderCheck } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormSchema } from "@/lib/Zod/Schema";
import { Select, SelectItem, SelectValue } from "./ui/select";
import { SelectTrigger } from "./ui/select";
import { SelectContent } from "./ui/select";
import { projectType } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { createProject, updateProject } from "@/lib/Slice/kanbanSlice";
import { Textarea } from "./ui/textarea";
import type { ProjectType } from "@/types";
import { useEffect } from "react";
import type { RootState } from "@/lib/Store/Store";
import { toast } from "sonner";



interface ProjectFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  status: "Create" | "Update";
  detail: {
    id: string;
    type: ProjectType;
    name: string;
    description: string;
  } | null;
}



const ProjectForm = ({ open, setOpen, status, detail }: ProjectFormProps) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.kanban);
  const form = useForm<z.infer<typeof ProjectFormSchema>>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "Software Development",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset()
    }
  },[open,form])

  useEffect(() => {
    if (detail && status === "Update") {
      form.reset({
        name:detail.name,
        description: detail.description,
        type: detail.type ,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        type: "Software Development",
      });
    }

    return ()=> form.reset()

  },[status,form,detail])

  const onSubmit = (values: z.infer<typeof ProjectFormSchema>) => {
    const isDuplicate = projects.some(project => (project.id === detail?.id && status === "Update") ? false : project.name.toLowerCase().trim() === values.name.toLowerCase().trim())
    if (!isDuplicate) {
      if (status === "Create") {
        dispatch(
          createProject({
            name: values.name,
            description: values.description,
            type: values.type,
          })
        );
      } else if (status === "Update") {
        dispatch(
          updateProject({
            id: detail!.id,
            name: values.name,
            description: values.description,
            type: values.type,
          })
        );
      }
      form.reset();
      setOpen(!open);
    } else {
      return toast.error("Project already exists!!")
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-full">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col justify-center gap-3">
              <div className="w-10 h-10 bg-gray-300 dark:bg-white dark:text-black rounded-full flex items-center justify-center">
                <FolderCheck />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold leading-2 mt-2">
                  New Project
                </h3>
                <p className="text-gray-500 text-sm font-light mb-4">
                  Fill in the form below to create or modify a project
                </p>
              </div>
            </div>
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center gap-4 flex-wrap">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Eg. Build an app..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {projectType.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
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
              <Button type="submit" className="cursor-pointer">
                {status}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
