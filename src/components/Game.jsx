import { useEffect, useState } from 'react';
import blueCandy from '../images/blue-candy.png';
import greenCandy from '../images/green-candy.png';
import orangeCandy from '../images/orange-candy.png';
import purpleCandy from '../images/purple-candy.png';
import redCandy from '../images/red-candy.png';
import yellowCandy from '../images/yellow-candy.png';
import blank from '../images/blank.png';
import ScoreBoard from './ScoreBoard';

const width = 8;
const candyColors = [
  blueCandy,
  orangeCandy,
  greenCandy,
  yellowCandy,
  purpleCandy,
  redCandy,
];

const Game = () => {
  const [currentColorArr, setCurrentColorArr] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [score, setScore] = useState(0);

  /* eslint-disable */
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;
      if (
        columnOfThree.every(
          (square) => currentColorArr[square] === decidedColor && !isBlank
        )
      ) {
        setScore((score) => score + 3);
        columnOfThree.forEach((square) => (currentColorArr[square] = blank));
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;

      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every((square) => currentColorArr[square] === decidedColor && !isBlank)
      ) {
        setScore((score) => score + 3);
        rowOfThree.forEach((square) => (currentColorArr[square] = blank));
        return true;
      }
    }
  };
  
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArr[i];
      const isBlank = currentColorArr[i] === blank;

      if (
        columnOfFour.every((square) => currentColorArr[square] === decidedColor && !isBlank)
        ) {
          setScore((score) => score + 4);
          columnOfFour.forEach((square) => (currentColorArr[square] = blank));
          return true;
        }
      }
    };
    
    const checkForRowOfFour = () => {
      for (let i = 0; i < 64; i++) {
        const rowOfFour = [i, i + 1, i + 2, i + 3];
        const decidedColor = currentColorArr[i];
        const isBlank = currentColorArr[i] === blank;

        const notValid = [
          5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
          54, 55, 61, 62, 63,
        ];
        
        if (notValid.includes(i)) continue;
        
        if (
          rowOfFour.every((square) => currentColorArr[square] === decidedColor && !isBlank)
          ) {
            setScore((score) => score + 4);
            rowOfFour.forEach((square) => (currentColorArr[square] = blank));
            return true;
      }
    }
  };
  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArr[i] === blank) {
        let randomColor = Math.floor(Math.random() * candyColors.length);
        currentColorArr[i] = candyColors[randomColor];
      }

      if (currentColorArr[i + width] === blank) {
        currentColorArr[i + width] = currentColorArr[i];
        currentColorArr[i] = blank;
      }
    }
  };
  /* eslint-enable */

  const dragStart = (e) => {
    console.log('drag start');
    setSquareBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    console.log('drag drop');
    setSquareBeingReplaced(e.target);
  };
  const dragEnd = (e) => {
    console.log('drag end');
    const squareId = parseInt(squareBeingReplaced.getAttribute('data-id'));
    const squareIdDragged = parseInt(
      squareBeingDragged.getAttribute('data-id')
    );

    currentColorArr[squareId] = squareBeingDragged.getAttribute('src');
    currentColorArr[squareIdDragged] = squareBeingReplaced.getAttribute('src');
    console.log(squareId, squareIdDragged);

    const validMoves = [
      squareIdDragged - 1,
      squareIdDragged + 1,
      squareIdDragged - width,
      squareIdDragged + width,
    ];

    const validMove = validMoves.includes(squareId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();

    if (
      squareId &&
      validMove &&
      (isAColumnOfFour || isARowOfThree || isARowOfFour || isAColumnOfThree)
    ) {
      setSquareBeingReplaced(null);
      setSquareBeingDragged(null);
    } else {
      currentColorArr[squareId] = squareBeingReplaced.getAttribute('src');
      currentColorArr[squareIdDragged] = squareBeingDragged.getAttribute('src');
      setCurrentColorArr([...currentColorArr]);
    }
  };

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArr(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArr([...currentColorArr]);
    }, 200);

    return () => clearInterval(timer);
    /* eslint-disable */
  }, [
    currentColorArr,
  ]);

  return (
    <div className='game-container'>
      <div className='game'>
        {currentColorArr.map((candy, index) => (
          <img
            key={index}
            src={candy}
            alt={candy}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={score}/>
    </div>
  );
};

export default Game;
