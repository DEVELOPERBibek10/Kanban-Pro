import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import type { Task, TaskStatusType } from "@/types";
import TaskForm from "./TaskForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/lib/Slice/kanbanSlice";
import { statusToColumnMap } from "@/constants";
import { toast } from "sonner";

interface taskActionProps {
  task: Task;
}

const TaskAction = ({ task }: taskActionProps) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-0 cursor-pointer">
          <CiMenuKebab />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 w-full cursor-pointer"
          >
            <FaRegEdit className="size-4" />
            <span className="dark:text-gray-200 text-xs">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              dispatch(
                deleteTask({
                  projectId: task.projectId,
                  id: task.id,
                  columnId: statusToColumnMap[task.status as TaskStatusType],
                })
              )
              toast.success("Task Deleted Sucessfully!")
            }
            }
            className="flex items-center gap-2 w-full cursor-pointer"
          >
            <AiOutlineDelete color="red" className="size-4 " />
            <span className="text-red-500 text-xs">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {<TaskForm open={open} setOpen={setOpen} state="Update" task={task} />}
    </>
  );
};

export default TaskAction;
