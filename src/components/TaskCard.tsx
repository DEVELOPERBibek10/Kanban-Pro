import type { Task, TaskPriorityType, TaskStatusType } from "@/types";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { ChevronsDown, ChevronsRight, ChevronsUp } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/Store/Store";
import TaskAction from "./TaskAction";

interface TaskCardProps {
  task: Task;
  
}

const TaskCard = ({ task }: TaskCardProps) => {
  const activeProjectId = useSelector((state:RootState)=>state.active.id)
  const draggedItem: Omit<Task, "createdAt" | "updatedAt"> = {
    projectId: activeProjectId!,
    title: task.title,
    id: task.id,
    description: task.description,
    priority: task.priority as TaskPriorityType,
    status: task.status as TaskStatusType,
  };
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("Task", JSON.stringify(draggedItem));

  };
  return (
    <Card data-task-id={task.id} draggable onDragStart={(e)=> handleDragStart(e)} className="w-[99%] h-[110px] max-h-[120px] flex flex-col justify-center shrink-0 gap-1.5 dark:bg-zinc-800">
      <CardHeader className="w-full">
        <div
          className={cn(
            `w-fit rounded-3xl px-2 pr-4 gap-0.5 font-medium
           flex items-center justify-between text-[10px]`,
            task.priority === "Low" && "bg-green-500/15 text-green-900",
            task.priority === "Medium" && "bg-yellow-500/15 text-yellow-800",
            task.priority === "High" && "bg-red-500/15 text-red-800"
          )}
        >
          {task.priority === "Low" && <ChevronsDown width={12} color="green" />}
          {task.priority === "High" && <ChevronsUp width={12} color="red" />}
          {task.priority === "Medium" && (
            <ChevronsRight width={12} className="text-yellow-500" />
          )}
          <span
            className={cn(
              "text-[10px]",
              task.priority === "Low" && "text-green-500",
              task.priority === "Medium" && "text-yellow-500",
              task.priority === "High" && "text-red-500"
            )}
          >
            {task.priority}
          </span>
        </div>
        <CardAction className="cursor-pointer flex">
          <TaskAction task={task} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <span className="font-bold text-base dark:text-gray-200 line-clamp-1">{task.title}</span>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-gray-600 line-clamp-1 tracking-tight dark:text-gray-500">{ task.description }</span>
      </CardFooter>
    </Card>
  );
}

export default TaskCard;