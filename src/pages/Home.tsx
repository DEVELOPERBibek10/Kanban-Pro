import ProjectAction from "@/components/ProjectAction";


const Home = () => {
  return (
    <main className="w-full flex gap-4 mx-4">
      <div className="bg-white dark:bg-zinc-800 w-[70%] rounded-xl">
        <div className="w-full flex justify-between">
          <div className="border-b-2 w-full flex">
            <h2 className="text-3xl font-bold m-3">Projects</h2>
            <ProjectAction/>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-800 w-[30%] rounded-xl"></div>
    </main>
  );
}

export default Home;