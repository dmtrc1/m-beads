import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { beadsConfig } from "../../beadsConfig";
import { XMarkIcon } from "@heroicons/react/16/solid";

type ColorPickerProps = {
  handleAddNewColor: (color: string) => void;
  baseColor: string;
  setIsColorPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialColorpickerColor?: string;
};

const ColorPicker = ({
  handleAddNewColor,
  baseColor,
  setIsColorPickerOpen,
  initialColorpickerColor,
}: ColorPickerProps) => {
  const [color, setColor] = useState<string>(
    initialColorpickerColor || beadsConfig.initialColorpickerColor
  ); // Initial color state

  const invalidSelection =
    color === baseColor ||
    Boolean(initialColorpickerColor && color === initialColorpickerColor);

  // Function to handle color change
  const handleChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  const pickerStyles = {
    default: {
      picker: {
        boxShadow: "none",
        marginTop: 0,
      },
    },
  };

  return (
    <div className="space-y-3">
      <XMarkIcon
        className="h-6 w-6 absolute top-1 right-1 text-slate-900 cursor-pointer"
        onClick={() => setIsColorPickerOpen(false)}
      />
      <SketchPicker
        styles={pickerStyles}
        color={color}
        onChange={handleChange}
      />
      <Button
        disabled={invalidSelection}
        size="sm"
        className="block w-full"
        onClick={() => handleAddNewColor(color)}
      >
        Select color
      </Button>
    </div>
  );
};

export default memo(ColorPicker);
