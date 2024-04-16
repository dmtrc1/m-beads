import { Button } from "@/components/ui/button";
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
import { Layout } from "../Project";
import Cell from "./Cell";
import { useState } from "react";

type View1Props = {
  layout: Layout;
  handleCellClick: (rowIndex: number, cellIndex: number) => void;
  handleClearLayout: () => void;
  isLayoutEmpty: boolean;
};

const View1 = ({
  layout,
  handleCellClick,
  handleClearLayout,
  isLayoutEmpty,
}: View1Props) => {
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  return (
    <div>
      <div>
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="row flex">
            {row.map((color, cellIndex) => (
              <Cell
                key={cellIndex}
                {...{ color, rowIndex, cellIndex, handleCellClick }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Button
          size="xs"
          disabled={isLayoutEmpty}
          variant="outline"
          onClick={() => setAlertDialogOpen(true)}
        >
          Clear the scheme
        </Button>
        <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to clear the scheme?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 active:bg-red-700"
                onClick={handleClearLayout}
              >
                Clear
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default View1;
