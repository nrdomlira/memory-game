import { useState } from "react";

interface TCell {
  row: number;
  column: number;
}

export function App() {
  const [firstItem, setFirstItem] = useState<TCell>();
  //const [isClickedLastNumber, setIsClickedLastNumber] = useState(false);

  // array inicial
  const [grid] = useState([
    [2, 1, 0, 3],
    [1, 2, 0, 4],
    [4, 3, 5, 5],
  ]);

  const [isReveled, setIsReveled] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  function handleSelectedCard(row: number, column: number) {
    if (isReveled[row][column]) return;
    const clickedNumber = grid[row][column];
    //setIsClickedLastNumber(true);
    const newIsReveled = [...isReveled];
    newIsReveled[row][column] = true;
    setIsReveled(newIsReveled);

    if (firstItem) {
      const firstNumberSelected = grid[firstItem.row][firstItem.column];
      if (firstNumberSelected !== clickedNumber) {
        setTimeout(() => {
          newIsReveled[firstItem.row][firstItem.column] = false;
          newIsReveled[row][column] = false;
          setIsReveled([...newIsReveled]);
        }, 1000);
      } else {
        const youWon = isReveled.flat().every((state) => state);
        if (youWon) {
          setTimeout(() => {
            alert("você ganhou!");
          });
        }
      }
      setFirstItem(undefined);
    } else {
      setFirstItem({
        row,
        column,
      });
    }
  }

  return (
    <div className="h-screen w-auto flex items-center justify-center bg-zinc-900 overflow-auto">
      <div className="flex flex-col gap-3">
        {grid.map((row, rowIndex) => (
          <div className="grid grid-cols-4 gap-3" key={rowIndex}>
            {row.map((number, columnIndex) => (
              <div
                className={
                  `bg-white w-40 h-40 flex items-center justify-center rounded-md ` +
                  (isReveled[rowIndex][columnIndex]
                    ? `cursor-not-allowed`
                    : `hover:opacity-85 cursor-pointer`)
                }
                key={columnIndex}
                onClick={() => handleSelectedCard(rowIndex, columnIndex)}
              >
                {isReveled[rowIndex][columnIndex] ? number : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
