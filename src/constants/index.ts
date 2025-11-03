import type { TaskStatusType } from "@/types";

export const projectType = [
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
];

export const taskPriority = [
  "High",
  "Medium",
  "Low",
];

  export const columnToStatusMap: Record<string, TaskStatusType> = {
    todo: "To Do",
    inProgress: "In Progress",
    done: "Done",
  };

  export const statusToColumnMap: Record<TaskStatusType, string> = {
    "To Do": "todo",
    "In Progress": "inProgress",
    Done: "done",
  };