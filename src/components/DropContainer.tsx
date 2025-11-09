import type { RootState } from "@/lib/Store/Store";
import { selectProjectById } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { ClipboardX } from "lucide-react";
import type { TaskPriorityType, TaskStatusType } from "@/types";
import { updateTask } from "@/lib/Slice/kanbanSlice";
import { columnToStatusMap, statusToColumnMap } from "@/constants";


const DropContainer = ({columnId}:{columnId:string}) => {
const activeId = useSelector((state: RootState) => state.active.id);
  const project = useSelector(selectProjectById(activeId!));
  const dispatch = useDispatch();
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // 1. Get the container where the task is dropped.
    const dropContainer = e.currentTarget;
    //2. Get all the tasks that are in the dropContainer.
    const taskCards = Array.from(dropContainer.querySelectorAll("[data-task-id]"));
    try {
      // 3. Get the draggedTask.
      const draggedTask = JSON.parse(e.dataTransfer.getData("Task"));
      // 4.Default targetIndex to the end of the list
      let targetIndex = taskCards.length;

      for (let i = 0; i < taskCards.length; i++) {
        const card = taskCards[i] as HTMLElement;

        // 5. Don't compare the dragged card against itself.
        if (card.dataset.id === draggedTask.id) {
          continue;
        }

        // 6. Get the card's position and midpoint
        const rect = card.getBoundingClientRect();
        const cardMidY = rect.top + rect.height / 2;

        // 7. Is the mouse *above* or *equal to* this card's middle?
        if (e.clientY < cardMidY || e.clientY === cardMidY) {
          // 8. YES. This is our insertion point.
          targetIndex = i;
          break; // Found it, no need to check the rest
        }
      }

      dispatch(
        updateTask({
          projectId: activeId!,
          columnId: statusToColumnMap[draggedTask.status as TaskStatusType],
          title: draggedTask.title,
          description: draggedTask.description,
          priority: draggedTask.priority as TaskPriorityType,
          status: columnToStatusMap[columnId],
          id: draggedTask.id,
          targetIndex: targetIndex,
        })
      );
    } catch (error) {
         console.error("Error processing drop:", error);
       }
  };
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        if (project) {
          handleOnDrop(e);
        }
      }}
      className="border-2 rounded-lg dark:border-zinc-700 border-zinc-200 min-h-[550px] flex flex-col items-center px-3"
    >
      <div className="w-full bg-zinc-200 dark:bg-zinc-700 p-2 mt-2.5 rounded-md flex justify-between items-center">
        {project!.columns[columnId].name}
        <div className="w-8 h-8 rounded-full bg-primary text-gray-200 flex items-center justify-center">
          {project!.columns[columnId].tasks.length}
        </div>
      </div>
      {project?.columns[columnId].tasks.length !== 0 ? (
        <div className="flex flex-col justify-center items-center w-full pt-4 pb-4 gap-4">
          {
          project?.columns[columnId].tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
          ))
          }
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 h-1/2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full dark:bg-zinc-400 bg-zinc-300">
            <ClipboardX className="size-5" />
          </div>
          <span className="text-center text-[15px] text-slate-500">
            No Tasks currently. Board is empty!
          </span>
        </div>
      )}
    </div>
  );
};

export default DropContainer;
