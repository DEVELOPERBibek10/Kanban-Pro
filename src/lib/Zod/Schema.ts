import type { ProjectType, TaskPriorityType } from "@/types";
import z from "zod";

 export const ProjectFormSchema = z.object({
   name: z.string().min(5, {
     message: "Name must be at least 5 characters.",
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
  projectId: z.string().min(1, {
    message:"Project is required"
  }),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  priority: z.enum(["High", "Medium", "Low"] as TaskPriorityType[]),
});


