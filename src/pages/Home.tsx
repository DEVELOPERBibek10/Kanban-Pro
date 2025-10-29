import ActiveProject from "@/components/ActiveProject";
import ProjectAction from "@/components/ProjectAction";
import type { RootState } from "@/lib/Store/Store";
import { useSelector } from "react-redux";


const Home = () => {
  const projects = useSelector((state: RootState) => state.kanban);

  return (
    <main className="w-full flex gap-4 mx-4">
      <div className="bg-white dark:bg-zinc-800 w-[70%] rounded-xl">
        <div className="w-full flex justify-between">
          <div className="w-full flex">
            <h2 className="text-3xl font-bold m-3">Projects</h2>
            <ProjectAction />
          </div>
        </div>
        {Object.keys(projects[0].columns).map((column) => (
          <div className="capitalize">{column}</div>
        ))}
      </div>
      <div className="bg-white dark:bg-zinc-800 w-[30%] rounded-xl">
        <ActiveProject project={projects[0]} />
      </div>
    </main>
  );
};

export default Home;