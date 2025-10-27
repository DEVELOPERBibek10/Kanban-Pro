import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Layout } from "lucide-react";
import { Button } from "./ui/button";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/Store/Store";

const ProjectAction = () => {
  const Projects = useSelector((state: RootState) => state.kanban);
  return (
    <Dialog>
      <DialogTrigger>
        <Layout
          width={26}
          className="text-muted-foreground mt-1 cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="w-full border-b-2 border-gray-300 dark:border-zinc-600">
          <DialogTitle className="text-xl font-bold leading-4">
            All Projects
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            List of all available projects
          </p>
          <div className="w-full flex justify-between gap-3 items-center mt-2 mb-4">
            <Input placeholder="Search a Project..." />
            <Button className="bg-secondary hover:bg-secondary text-zinc-800 dark:text-gray-200 cursor-pointer">
              Create Project
            </Button>
          </div>
        </DialogHeader>
        <ul className="flex flex-col gap-4 justify-center">
          {Projects.map((project) => (
            <li className="w-full border-2 border-foreground-muted p-2 rounded-lg flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <span className="font-semibold text-[15px] dark:text-gray-200">
                  {project.name}
                </span>
                <span className="text-xs text-zinc-500">
                  <span className="mr-0.5">
                    {project.columns.todo.tasks.length +
                      project.columns.inProgress.tasks.length +
                      project.columns.done.tasks.length}
                  </span>
                  Tasks
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  className="bg-green-500/20 hover:bg-green-500/30 rounded-full cursor-pointer transition-all duration-300"
                  size={"icon"}
                >
                  <MdEdit className="size-5" color="green" />
                </Button>
                <Button
                  className="bg-red-500/20 hover:bg-red-500/30 rounded-full cursor-pointer transition-all duration-300"
                  size={"icon"}
                >
                  <MdDelete className="size-5" color="red" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectAction;
