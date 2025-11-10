import ActiveProject from "@/components/ActiveProject";
import DropContainer from "@/components/DropContainer";
import ProjectAction from "@/components/ProjectAction";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/lib/Store/Store";
import { selectProjectById } from "@/lib/utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import TaskForm from "@/components/TaskForm";
import { BiSolidError } from "react-icons/bi";

const Home = () => {
  const activeId = useSelector((state: RootState) => state.active.id);
  const project = useSelector(selectProjectById(activeId!));
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <main className="w-full flex flex-col gap-2 mx-4 lg:flex-row">
        <div className="bg-white dark:bg-zinc-800 w-full lg:w-[80%] min-h-[580px] rounded-xl pb-4">
          <div className="w-full flex justify-between">
            <div className="w-full flex justify-between items-center m-3">
              <div className="flex  gap-2">
                <h2 className="text-xl font-bold">Projects</h2>
                <ProjectAction />
              </div>
              <Button
                disabled={!project}
                onClick={() => setOpen(!open)}
                className="bg-secondary text-xs dark:bg-zinc-600 hover:bg-secondary text-zinc-700 dark:text-gray-200 rounded-full cursor-pointer"
              >
                Add New Task
              </Button>
            </div>
          </div>
          <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] auto-rows-auto px-2 mx-2">
          
            {project ? (
              Object.keys(project.columns).map((column) => (
                <DropContainer key={column} columnId={column} />
              ))
            ) : (
              <div className="h-full w-full flex flex-col justify-center items-center">
                <BiSolidError size={55} color="gray" />
                <span className="text-zinc-700 dark:text-gray-200 text-sm">
                  No projects to show!!
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 w-full lg:w-[25%] h-[580px] rounded-xl shrink-0">
          <ActiveProject />
        </div>
      </main>
      {<TaskForm open={open} setOpen={setOpen} state="Create" />}
    </>
  );
};

export default Home;
