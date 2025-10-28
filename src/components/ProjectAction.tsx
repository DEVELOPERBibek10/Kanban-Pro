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
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/lib/Store/Store";
import { returnIcons } from "@/lib/utils";
import ProjectForm from "./ProjectForm";
import { useMemo, useState } from "react";
import { deleteProject } from "@/lib/Slice/kanbanSlice";
import type { ProjectType } from "@/types";
import useDebounce from "@/Hooks/useDebounce";
import { BiSolidError } from "react-icons/bi";

const ProjectAction = () => {
  const Projects = useSelector((state: RootState) => state.kanban);
  const [open, setOpen] = useState(false);
  const [projectUpdate, setProjectUpdate] = useState(false);
  const [projectDetail, setProjectDetail] = useState<{
    id: string;
    type: ProjectType;
    name: string;
    description: string;
  } | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 600);
  const searchResult = useMemo(() => {
    if (debouncedSearch) {
      return Projects.filter(
        (project) =>
          project.name.toLowerCase().includes((debouncedSearch).toLowerCase())
      );
    }
    return Projects;
  }, [Projects, debouncedSearch]);

  const dispatch = useDispatch();

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
              <Input
                className="focus-visible:ring-0 outline-0 border-0 shadow-sm focus-visible:ring-offset-1 focus-visible:ring-offset-primary"
                placeholder="Search a Project..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                onClick={() => {
                  setProjectUpdate(false);
                  setOpen(!open);
                  setProjectDetail(null);
                }}
                className="bg-secondary hover:bg-secondary text-zinc-800 dark:text-gray-200 cursor-pointer"
              >
                Create Project
              </Button>
            </div>
          </DialogHeader>
          <ul className="flex flex-col gap-4 justify-center">
            {searchResult.length !== 0 ? (
              searchResult.map((project) => (
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
                      <span className="font-semibold text-[15px] dark:text-gray-200 line-clamp-1">
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
                      onClick={() =>
                        dispatch(deleteProject({ id: project.id }))
                      }
                    >
                      <MdDelete className="size-5" color="red" />
                    </Button>
                  </div>
                </li>
              ))
            ) : (
              <li className="h-28 w-full flex flex-col gap-3 items-center justify-center">
                  <BiSolidError size={50} color="gray" />
                  <p className="text-muted-foreground text-center w-full text-sm">Project Not found...</p>
              </li>
            )}
          </ul>
       
          <p className="text-[13px] text-muted-foreground">
            {Projects.length} Projects
          </p>
      
        </DialogContent>
      </Dialog>
      {
        <ProjectForm
          open={open}
          setOpen={setOpen}
          status={projectUpdate ? "Update" : "Create"}
          detail={projectUpdate ? projectDetail : null}
        />
      }
    </>
  );
};

export default ProjectAction;
