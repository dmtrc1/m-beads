import { ChangeEvent } from 'react';
import { CanvasDimentions } from './components/DimentionsControls';
import { Layout } from './components/Project';

export function getEven(index: number) {
    return index % 2 === 0;
}

export function formatDimentionInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (Number(value) > 100) return 100;

    return parseInt(value);
}

export function createInitailLayout(
    canvasDimentions: CanvasDimentions,
    value: string
): Layout {
    return Array.from({ length: canvasDimentions.height }, () =>
        Array.from({ length: canvasDimentions.width }, () => value)
    );
}

export function buildView2Data(layout: Layout) {
    const layoutWidth = layout[0]?.length;
    const flattenedReversed = layout.flat().reverse();
    const processedArray = [];

    let index = 0;
    while (index < flattenedReversed.length) {
        const chunkSize: number = getEven(processedArray.length)
            ? layoutWidth
            : layoutWidth + 1;
        const chunk = flattenedReversed.slice(index, index + chunkSize);
        processedArray.push(chunk);
        index += chunkSize;
    }

    return processedArray.reverse();
}

export function layoutIsNotEmpty(layout: Layout, baseColor: string) {
    return layout.some((innerArray) =>
        innerArray.some((item) => item !== baseColor)
    );
}

type DeleteColorFromLayoutParams = {
    layout: Layout;
    colorToSet: string;
    colorToRemove?: string;
    clearAll?: boolean;
};

export function replaceColorInLayout({
    layout,
    colorToRemove,
    colorToSet,
    clearAll,
}: DeleteColorFromLayoutParams &
    ({ colorToRemove: string } | { clearAll: boolean })): Layout {
    const layoutCopy = [...layout];

    if (clearAll) {
        return layoutCopy.map((row) => {
            return row.map(() => colorToSet);
        });
    }

    return layoutCopy.map((row) => {
        return row.map((color) =>
            color === colorToRemove ? colorToSet : color
        );
    });
}
