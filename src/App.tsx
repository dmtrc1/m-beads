import useProjects from "@/hooks/useProjects";

import Project from "./components/Project";

const App = () => {
  const {
    projects,
    activeProjectId,
    setActiveProjectId,
    saveProject,
    deteleProject,
  } = useProjects();

  const activeProject = projects.find((item) => item.id === activeProjectId)!;

  return (
    <div>
      <div className="container mx-auto my-20 pb-20 border-b">
        {projects.map((proj) => (
          <li key={proj.id} className="cursor-pointer flex gap-2">
            <div onClick={() => setActiveProjectId(proj.id)}>{proj.id}</div>{" "}
            <button
              className="bg-red-500 text-white"
              onClick={() => deteleProject(proj.id)}
            >
              delete
            </button>
          </li>
        ))}
        <Project {...{ activeProject, saveProject }} />
      </div>
    </div>
  );
};

export default App;
