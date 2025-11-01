import type { ProjectType, TaskPriorityType } from "@/types";
import z from "zod";

 export const ProjectFormSchema = z.object({
   name: z.string().min(5, {
     message: "Project's name must be at least 5 characters.",
   }),
   description: z.string().optional(),
   type: z.enum([
     "IT Support",
     "Marketing",
     "Product Management",
     "Software Development",
     "Design",
     "Human Resource",
     "Customer Service",
     "Finance",
     "Sales",
     "Legal",
     "Data Science",
     "Other",
   ] as ProjectType[]),
 });

export const TaskFormSchema = z.object({
  title: z.string().min(5, {
    message: "Task title must be at least 5 characters.",
  }),
  description: z.string().min(5, {
    message: "Task description must be at least 5 characters.",
  }),
  project: z.enum([]),
  priority: z.enum(["High", "Medium", "Low"] as TaskPriorityType[]),
});


