import { memo, useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorCell from "./ColorCell";
import ColorPicker from "./ColorPicker";
import { DeleteColorParams } from "../../Project";

type ColorsControlsProps = {
  colorsList: string[];
  setColorsList: React.Dispatch<React.SetStateAction<string[]>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  deleteColor: (params: DeleteColorParams) => void;
  baseColor: string;
  setBaseColor: React.Dispatch<React.SetStateAction<string>>;
};

const ColorsControls = ({
  colorsList,
  selectedColor,
  setSelectedColor,
  setColorsList,
  deleteColor,
  baseColor,
  setBaseColor,
}: ColorsControlsProps) => {
  const [isColorPickerOpen, setIsColorPickerOpen] =
    useState(false);

  const handleAddNewColor = useCallback(
    (newColor: string) => {
      // Check if already existing color;
      if (colorsList.includes(newColor)) {
        setSelectedColor(newColor);
        return setIsColorPickerOpen(false);
      }

      setColorsList((prev) => [...prev, newColor]);
      setSelectedColor(newColor);
      setIsColorPickerOpen(false);
    },
    [colorsList]
  );

  return (
    <div>
      <div className="flex">
        {colorsList.map((color) => (
          <ColorCell
            key={color}
            {...{
              color,
              selectedColor,
              setSelectedColor,
              setColorsList,
              deleteColor,
              baseColor,
            }}
          />
        ))}
        <Popover
          open={isColorPickerOpen}
          onOpenChange={setIsColorPickerOpen}
        >
          <PopoverTrigger className="border border-slate-900 cursor-pointer size-8 ml-1 flex items-center justify-center font-bold text-lg hover:shadow-lg transition-shadow">
            <span>+</span>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <ColorPicker {...{ handleAddNewColor, baseColor, setIsColorPickerOpen }} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default memo(ColorsControls);
