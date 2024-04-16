import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { Layout } from "@/features/beads/Project";
import { CanvasDimentions } from "@/features/beads/components/DimentionsControls";

export type Project = {
  id: number;
  name: string;
  colorsList: string[];
  baseColor: string;
  canvasDimentions: CanvasDimentions;
  layout: Layout;
};

export default function useProjects() {
  const [activeProjectId, setActiveProjectId] = useState<number>(0);
  const [projects, setProjects]: [
    Project[],
    React.Dispatch<React.SetStateAction<Project[]>>
  ] = useLocalStorage<Project[]>("projects", []);

  useEffect(() => {}, []);

  function saveProject(project: Project) {
    if (projects.find(item => item.id === project.id)) {

    }
    setProjects((prevProjects) => [...prevProjects, project]);
  }

  function deteleProject(id: number) {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  }

  return {
    projects,
    activeProjectId,
    setActiveProjectId,
    saveProject,
    deteleProject,
  };
}
