import { useState, memo, useEffect } from "react";
import {
  buildView2Data,
  createInitailLayout,
  layoutIsNotEmpty,
  replaceColorInLayout,
} from "../helpers";
import ListOfBeads from "./ListOfBeads";
import ColorsControls from "./colorControls/ColorsControls";
import { beadsConfig } from "../beadsConfig";
import DimentionsControls, {
  CanvasDimentions,
} from "./DimentionsControls";
import View1 from "./View1";
import View2 from "./View2";
import { Project } from "@/hooks/useProjects";

export type Layout = string[][];
export type DeleteColorParams = { colorToRemove: string; colorToSet?: string };

type BeadsProps = {
  activeProject: Project;
  saveProject: (project: Project) => void;
};
const Beads = ({ activeProject, saveProject }: BeadsProps) => {
  const [canvasDimentions, setCanvasDimentions] = useState<CanvasDimentions>(
    activeProject?.canvasDimentions || {
      width: 8,
      height: 14,
    }
  );
  const [baseColor, setBaseColor] = useState(
    activeProject?.baseColor || beadsConfig.initialBaseColor
  );
  const [colorsList, setColorsList] = useState<string[]>(
    activeProject?.colorsList || beadsConfig.initialColorsList
  );

  const [selectedColor, setSelectedColor] = useState(colorsList[0]);
  const [layout, setLayout] = useState<Layout>([]);

  useEffect(() => {
    setColorsList(activeProject?.colorsList || beadsConfig.initialColorsList);
  }, [activeProject]);

  useEffect(() => {
    if (activeProject?.layout.length) {
      return setLayout(activeProject.layout);
    }

    const layout = createInitailLayout(canvasDimentions, baseColor);
    setLayout(layout);
  }, [canvasDimentions, baseColor, activeProject?.layout]);

  // Create View 2
  const view2Data = buildView2Data(layout);

  function handleCellClick(rowIndex: number, cellIndex: number) {
    const updatedLayout = [...layout];
    if (updatedLayout[rowIndex][cellIndex] !== baseColor) {
      updatedLayout[rowIndex][cellIndex] = baseColor;
    } else {
      updatedLayout[rowIndex][cellIndex] = selectedColor;
    }

    setLayout(updatedLayout);
  }

  function handleClearLayout() {
    const updatedLayout = replaceColorInLayout({
      layout,
      colorToSet: baseColor,
      clearAll: true,
    });
    setLayout(updatedLayout);
  }

  function deleteColor({ colorToRemove, colorToSet }: DeleteColorParams) {
    const updatedLayout = replaceColorInLayout({
      layout,
      colorToRemove,
      colorToSet: colorToSet || baseColor,
    });
    setLayout(() => {
      setSelectedColor(colorsList[0]);
      return updatedLayout;
    });
  }

  return (
    <div>
      <ul className="list-disc">
        <li>Versions</li>
      </ul>
      <hr />
      <button
        className="border"
        onClick={() =>
          saveProject({
            id: Date.now(),
            name: "",
            colorsList,
            baseColor,
            canvasDimentions,
            layout,
          })
        }
      >
        Save project
      </button>
      <br />
      <hr />
      <br />
      <div className="flex flex-wrap gap-x-16">
        <div className="mb-5">
          <div>
            <DimentionsControls
              {...{
                canvasDimentions,
                setCanvasDimentions,
                isDisabled: layoutIsNotEmpty(layout, baseColor),
              }}
            />
          </div>
          <div className="flex gap-x-14">
            <View1
              {...{
                layout,
                handleCellClick,
                handleClearLayout,
                isLayoutEmpty: !layoutIsNotEmpty(layout, baseColor),
              }}
            />
            <View2 {...{ view2Data }} />
            <View2 {...{ view2Data, isNarrow: true }} />
          </div>
        </div>
        <div className="flex-1 mb-5">
          <div className="mb-4">
            <ColorsControls
              {...{
                colorsList,
                selectedColor,
                setSelectedColor,
                setColorsList,
                deleteColor,
                baseColor,
                setBaseColor,
              }}
            />
          </div>
          <ListOfBeads {...{ layout }} />
        </div>
      </div>
    </div>
  );
};

export default memo(Beads);
