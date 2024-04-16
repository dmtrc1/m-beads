import { memo, useState } from "react";
import useKeyDown from "@/hooks/useKeyDown";
import usePreventArrowDownScroll from "@/hooks/usePreventArrowDownScroll";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import Cell from "./Cell";
import { Layout } from "../Project";

const alphabet: string = "abcdefghijklmnopqrstuvwxyz";

type ListOfBeadsProps = {
  layout: Layout;
};

function countConsecutive(arr: string[]) {
  if (arr.length === 0) return [];

  const result = [];
  let currentCount = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      currentCount++;
    } else {
      result.push({ [arr[i - 1]]: currentCount });
      currentCount = 1;
    }
  }

  result.push({ [arr[arr.length - 1]]: currentCount });

  return result;
}

function createListOfBeads(layout: Layout) {
  const layoutCopy = [...layout.map((item) => [...item])];
  const reversedMergedBeadsArr = layoutCopy
    .map((row) => row.reverse())
    .flat();

  const resultArr = countConsecutive(reversedMergedBeadsArr);

  return resultArr || [];
}

const ListOfBeads = ({ layout }: ListOfBeadsProps) => {
  const [selectedRow, setSelectedRow] = useState(0);
  const listOfBeads = createListOfBeads(layout);

  const handleArrowUp = () => {
    if (selectedRow === 0) return;
    setSelectedRow((prev) => prev - 1);
  };
  const handleArrowDown = () => {
    if (selectedRow === listOfBeads.length - 1) return;
    setSelectedRow((prev) => prev + 1);
  };

  // Enable scroll preventing only when there is a bead on the canvas
  const enableScrollPreventing = listOfBeads.length > 1;
  usePreventArrowDownScroll(enableScrollPreventing);

  useKeyDown("ArrowUp", handleArrowUp);
  useKeyDown("ArrowDown", handleArrowDown);

  return (
    <ul className="max-h-[60vh] inline-flex flex-col flex-wrap gap-x-5">
      {listOfBeads.map((item, index) => {
        const [color, quantity] = Object.entries(item)[0];

        return (
          <li
            key={index}
            className="pl-5 -ml-5 flex relative"
            onClick={() => setSelectedRow(index)}
          >
            {selectedRow === index && (
              <ArrowRightIcon className="absolute left-0 h-5 w-5 top-[50%] -translate-y-[50%] text-slate-900" />
            )}
            <Cell {...{ color, quantity }} />{" "}
            <span className="ml-1">&times; {quantity}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(ListOfBeads);
