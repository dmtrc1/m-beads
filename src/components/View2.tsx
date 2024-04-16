import { Layout } from "../Project";
import { beadsConfig } from "../beadsConfig";
import { getEven } from "../helpers";
import Cell from "./Cell";

type View2Props = {
  view2Data: Layout;
  isNarrow?: boolean;
};

const View2 = ({ view2Data, isNarrow }: View2Props) => {
  let narrowVersionProps;

  if (isNarrow) {
    const view2DataWidth =
      beadsConfig.cellSize * view2Data[view2Data.length - 1]?.length;
    const narrowView2Width = view2DataWidth / 2 || 0;

    narrowVersionProps = {
      style: { width: narrowView2Width },
      className: "overflow-hidden border border-x-2 border-slate-900",
    };
  }

  return (
    <div {...(isNarrow ? narrowVersionProps : "")}>
      {view2Data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            marginLeft: getEven(rowIndex) ? -(beadsConfig.cellSize / 2) : "",
          }}
          className="row flex"
        >
          {row.map((color, cellIndex) => (
            <Cell key={cellIndex} {...{ color, rowIndex, cellIndex }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default View2;
