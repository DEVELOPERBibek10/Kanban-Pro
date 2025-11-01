import { returnIcons } from "@/lib/utils";
import type { Project, ProjectType } from "@/types";
import { Button } from "./ui/button";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import DeleteProjectAlert from "./DeleteProjectAlert";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/Store/Store";

type ProjectActionItemProps = {
  project: Project;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectDetail: React.Dispatch<
    React.SetStateAction<{
      id: string;
      type: ProjectType;
      name: string;
      description: string;
    } | null>
  >;
};

const ProjectItem = ({
  project,
  open,
  setOpen,
  setProjectUpdate,
  setProjectDetail,
}: ProjectActionItemProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const active = useSelector((state:RootState)=>state.active)
  const handleUpdateProject = (
    id: string,
    type: ProjectType,
    name: string,
    description: string
  ) => {
    setProjectUpdate(true);
    setOpen(!open);
    setProjectDetail({
      id: id,
      type: type,
      name: name,
      description: description,
    });
  };
  return (
    <>
      <li
        key={project.id}
        className="w-full border-2 border-foreground-muted p-1.5 rounded-lg flex items-center justify-between"
      >
        <div className="w-full rounded-lg flex gap-2 items-center">
          <div className="bg-primary size-9 flex justify-center items-center rounded-lg">
            <img
              loading="lazy"
              src={returnIcons(project.type!).icon}
              alt={returnIcons(project.type!).name}
              className="size-7"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-3 items-center">
              <span className="font-semibold text-[15px] dark:text-gray-200 line-clamp-1">
                {project.name}
              </span>
              {project.id === active.id && (
                <span className="bg-gray-200 dark:bg-zinc-700 text-xs p-1 rounded-md font-semibold">
                  Active
                </span>
              )}
            </div>
            <span className="text-xs text-zinc-500">
              <span className="mr-0.5">
                {project.columns.todo.tasks.length +
                  project.columns.inProgress.tasks.length +
                  project.columns.done.tasks.length}
              </span>
              Tasks
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="bg-green-500/20 hover:bg-green-500/30 rounded-full cursor-pointer transition-all duration-300"
            size={"icon"}
            onClick={() =>
              handleUpdateProject(
                project.id,
                project.type!,
                project.name,
                project.description!
              )
            }
          >
            <MdEdit className="size-5" color="green" />
          </Button>
          <Button
            className="bg-red-500/20 hover:bg-red-500/30 rounded-full cursor-pointer transition-all duration-300"
            size={"icon"}
            onClick={() => setAlertOpen(!alertOpen)}
          >
            <MdDelete className="size-5" color="red" />
          </Button>
        </div>
      </li>
      {
        <DeleteProjectAlert
          projectId={project.id}
          open={alertOpen}
          setOpen={setAlertOpen}
        />
      }
    </>
  );
};

export default ProjectItem;
