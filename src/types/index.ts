export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type TaskPriorityType = "High" | "Medium" | "Low";
export type TaskStatusType = "To Do" | "In Progress" | "Done";

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  priority: TaskPriorityType;
  status: TaskStatusType;
  createdAt: string;
  updatedAt?: string;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  type?: ProjectType;
  columns: Record<string, { name: string; tasks: Task[] }>;
  createdAt: string;
  updatedAt?: string;
};

export type ProjectType =
  | "IT Support"
  | "Marketing"
  | "Product Management"
  | "Software Development"
  | "Design"
  | "Human Resource"
  | "Customer Service"
  | "Finance"
  | "Sales"
  | "Legal"
  | "Data Science"
  | "Other";