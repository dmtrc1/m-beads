import { ChangeEvent } from "react";
import { formatDimentionInput } from "../helpers";

export type CanvasDimentions = {
  width: number;
  height: number;
};

type DimentionsControlsProps = {
  canvasDimentions: CanvasDimentions;
  setCanvasDimentions: React.Dispatch<React.SetStateAction<CanvasDimentions>>;
  isDisabled: boolean;
};

const DimentionsControls = ({
  canvasDimentions,
  setCanvasDimentions,
  isDisabled,
}: DimentionsControlsProps) => {
  function handleDimentionsChange(e: ChangeEvent<HTMLInputElement>) {
    setCanvasDimentions((prev) => ({
      ...prev,
      [e.target.name]: formatDimentionInput(e),
    }));
  }

  const inputDefaultProps = {
    disabled: isDisabled,
    min: 2,
    type: "number",
    className: "w-14 border border-slate-800 rounded-sm font-bold",
    onChange: handleDimentionsChange,
  };

  return (
    <div className="group">
      <div
        className={`relative pb-7 ${isDisabled ? "cursor-not-allowed hover:visible" : ""}`}
      >
        <input
          name="width"
          max={30}
          value={canvasDimentions.width || ''}
          {...inputDefaultProps}
        />
        <span className="font-bold mx-2">&times;</span>
        <input
          name="height"
          max={70}
          value={canvasDimentions.height || ''}
          {...inputDefaultProps}
        />
        {isDisabled && (
          <div className="flex absolute left-0 right-0 bottom-0 top-0 bg-white/50 text-xs z-10">
            <span className="mt-auto mb-2 opacity-0 group-hover:opacity-100">Please remove all colors from the scheme before resizing.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DimentionsControls;
