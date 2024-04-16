import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorPicker from "./ColorPicker";
import { useEffect, useState } from "react";
import { DeleteColorParams } from "../../Project";

type ColorCellProps = {
  color: string;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  setColorsList: React.Dispatch<React.SetStateAction<string[]>>;
  deleteColor: (params: DeleteColorParams) => void;
  baseColor: string;
};

const ColorCell = ({
  color,
  selectedColor,
  setSelectedColor,
  setColorsList,
  deleteColor,
  baseColor,
}: ColorCellProps) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorCellClasses = (color: string = ""): string =>
    `border group relative cursor-pointer size-8 hover:border-slate-900 transition-all ${
      color && selectedColor === color ? "border-2 border-slate-900" : ""
    }`;

  function handleReplaceColor(colorToSet: string) {
    setColorsList((prevColorList) =>
      prevColorList.map((colorItem) =>
        colorItem === color ? colorToSet : colorItem
      )
    );

    deleteColor({ colorToRemove: color, colorToSet });

  }
  function handleDeleteColor() {
    setColorsList((prevColorList) =>
      prevColorList.filter((colorItem) => colorItem !== color)
    );
    deleteColor({ colorToRemove: color });
  }

  useEffect(() => {
    setSelectedColor(color)
  }, [color])

  return (
    <div
      style={{ backgroundColor: color }}
      className={colorCellClasses(color)}
      onClick={() => setSelectedColor(color)}
    >
      <div className="absolute flex flex-col text-left shadow-lg -left-[2px] bottom-[100%] z-10 bg-white text-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        <Popover open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
          <PopoverTrigger className="text-xs hover:bg-slate-200 transition-colors w-full px-2 py-1 text-left">
            Change color
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <ColorPicker
              {...{
                handleAddNewColor: handleReplaceColor,
                baseColor,
                initialColorpickerColor: color,
                setIsColorPickerOpen,
              }}
            />
          </PopoverContent>
        </Popover>

        <AlertDialog>
          <AlertDialogTrigger className="text-xs hover:bg-red-500 hover:text-white transition-colors w-full px-2 py-1 text-left">
            Delete color
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete the task?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 active:bg-red-700"
                onClick={handleDeleteColor}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ColorCell;
