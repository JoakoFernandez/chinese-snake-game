import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

const ChineseSnakeGame = () => {
  const GRID_SIZE = 20;
  const CELL_SIZE = 25;
  const INITIAL_SPEED = 120;
  
  const vocabulary = [
    { char: '近', translation: 'near' },
    { char: '方便', translation: 'convenient' },
    { char: '這裡', translation: 'here' },
    { char: '學生', translation: 'student' },
    { char: '在', translation: 'at' },
    { char: '東西', translation: 'things, stuff' },
    { char: '外面', translation: 'outside' },
    { char: '裡面', translation: 'inside' },
    { char: '商店', translation: 'store, shop' },
    { char: '吃飯', translation: 'to have a meal' },
    { char: '宿舍', translation: 'dormitory' },
    { char: '樓', translation: 'floor' },
    { char: '棟', translation: 'measure word for buildings' },
    { char: '大樓', translation: 'multi-storey building' },
    { char: '圖書館', translation: 'library' },
    { char: '旁邊', translation: 'next to' },
    { char: '教室', translation: 'classroom' },
    { char: '游泳池', translation: 'swimming pool' },
    { char: '午餐', translation: 'lunch' },
    { char: '剛', translation: 'just now' },
    { char: '下課', translation: 'to finish class' },
    { char: '下午', translation: 'afternoon' },
    { char: '半', translation: 'half' },
    { char: '比賽', translation: 'game, competition' },
    { char: '結束', translation: 'to finish' },
    { char: '最近', translation: 'recently, lately' },
    { char: '忙', translation: 'busy' },
    { char: '每', translation: 'every, each' },
    { char: '天', translation: 'day' },
    { char: '書法', translation: 'calligraphy' },
    { char: '課', translation: 'class' },
    { char: '開始', translation: 'to begin, to start' },
    { char: '字', translation: 'character' },
    { char: '寫', translation: 'to write' },
    { char: '可以', translation: 'may' },
    { char: '問', translation: 'to ask' },
    { char: '等一下', translation: 'later' },
    { char: '有事', translation: 'to be busy' },
    { char: '有意思', translation: 'to be interesting' },
    { char: '點', translation: "o'clock" },
    { char: 'KTV', translation: 'Karaoke' },
    { char: '唱歌', translation: 'to sing' },
    { char: '分', translation: 'minute' },
    { char: '見面', translation: 'to meet' },
    { char: '從', translation: 'from' },
    { char: '中午', translation: 'noon' },
    { char: '得', translation: 'to have to, must' },
    { char: '銀行', translation: 'bank' },
    { char: '時候', translation: 'when' },
    { char: '後天', translation: 'the day after tomorrow' },
    { char: '大安', translation: 'Da-an' },
    { char: '下次', translation: 'next time' },
    { char: '沒問題', translation: 'No problem.' },
    { char: '對了', translation: 'by the way' },
    { char: '有空', translation: 'to have free time' },
    { char: '再見', translation: 'Goodbye.' },
    { char: '坐', translation: 'to take by, to travel by' },
    { char: '火車', translation: 'train' },
    { char: '跟', translation: 'with' },
    { char: '玩', translation: 'to have fun' },
    { char: '怎麼', translation: 'how' },
    { char: '慢', translation: 'slow' },
    { char: '鐘頭', translation: 'hour' },
    { char: '比較', translation: 'more' },
    { char: '快', translation: 'fast' },
    { char: '車票', translation: 'ticket' },
    { char: '非常', translation: 'very' },
    { char: '但是', translation: 'but, however' },
    { char: '又', translation: 'both...and...' },
    { char: '舒服', translation: 'comfortable' },
    { char: '站', translation: 'station' },
    { char: '或是', translation: 'or' },
    { char: '臺南', translation: 'Tainan' },
    { char: '高鐵', translation: 'High Speed Rail' },
    { char: '網路上', translation: 'on the Internet' },
    { char: '便利商店', translation: 'convenience store' },
    { char: '他們', translation: 'they' },
    { char: '學校', translation: 'school' },
    { char: '山上', translation: 'on a mountain, in the mountains' },
    { char: '哪裡', translation: 'where' },
    { char: '遠', translation: 'far' },
    { char: '那裡', translation: 'that place, there' },
    { char: '風景', translation: 'scenery, landscape' },
    { char: '美', translation: 'beautiful' },
    { char: '前面', translation: 'front' },
    { char: '海', translation: 'ocean' },
    { char: '後面', translation: 'back' },
    { char: '山', translation: 'mountain' },
    { char: '真的', translation: 'really, truly' },
    { char: '地方', translation: 'place' },
    { char: '現在', translation: 'now' },
    { char: '附近', translation: 'vicinity, near' },
    { char: '樓下', translation: 'downstairs' },
    { char: '找', translation: 'to meet, to see' },
    { char: '朋友', translation: 'friend' },
    { char: '上課', translation: 'to go to class' },
    { char: '花蓮', translation: 'Hualien' },
    { char: '聽說', translation: 'hear that' }
  ];

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [currentChar, setCurrentChar] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const [failedWord, setFailedWord] = useState(null);

  const generateNewRound = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    const target = vocabulary[randomIndex];
    
    const incorrectOptions = vocabulary
      .filter(v => v.translation !== target.translation)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [target, ...incorrectOptions].sort(() => Math.random() - 0.5);
    
    const placedWords = [];
    
    const isPositionValid = (x, y, width, snakePos) => {
      // Check collision with snake (including a safety margin of 3 cells)
      for (let i = 0; i < width; i++) {
        for (const segment of snakePos) {
          const distance = Math.abs((x + i) - segment.x) + Math.abs(y - segment.y);
          if (distance < 3) return false;
        }
      }
      
      // Check collision with other words
      for (const word of placedWords) {
        const horizontalOverlap = x < word.x + word.width && x + width > word.x;
        const verticalOverlap = y === word.y;
        if (horizontalOverlap && verticalOverlap) return false;
      }
      
      return true;
    };
    
    const placeWord = (option, snakePos) => {
      const textLength = option.translation.length;
      const wordWidth = Math.max(3, Math.ceil(textLength / 4));
      
      // Try to find a valid position
      for (let attempts = 0; attempts < 100; attempts++) {
        const x = Math.floor(Math.random() * (GRID_SIZE - wordWidth - 1)) + 1;
        const y = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
        
        if (isPositionValid(x, y, wordWidth, snakePos)) {
          const word = {
            text: option.translation,
            x: x,
            y: y,
            width: wordWidth,
            isCorrect: option.translation === target.translation
          };
          placedWords.push(word);
          return word;
        }
      }
      
      // Fallback: place in a corner if no valid position found
      return {
        text: option.translation,
        x: 1,
        y: GRID_SIZE - 2,
        width: wordWidth,
        isCorrect: option.translation === target.translation
      };
    };
    
    const words = allOptions.map(option => placeWord(option, snake));
    
    setCurrentChar(target);
    setTranslations(words);
  }, [snake]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    setFailedWord(null);
    generateNewRound();
  };

useEffect(() => {
  const handleKeyPress = (e) => {
    if (!gameStarted || gameOver) return;
    
    // Prevent default behavior for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    
    // Resume game on any arrow key press when paused
    if (isPaused) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setIsPaused(false);
      }
    }
    
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [direction, gameStarted, gameOver, isPaused]);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const eatenTranslation = translations.find(
          t => {
            for (let i = 0; i < t.width; i++) {
              if (t.x + i === newHead.x && t.y === newHead.y) {
                return true;
              }
            }
            return false;
          }
        );

        if (eatenTranslation) {
          if (eatenTranslation.isCorrect) {
            setScore(s => s + 1);
            setSpeed(s => Math.max(50, s - 5));
            setIsPaused(true);
            
            // Auto-resume after 3 seconds
            setTimeout(() => {
              setIsPaused(false);
            }, 3000);
            
            generateNewRound();
            return [newHead, ...prevSnake];
          } else {
            setFailedWord({ char: currentChar.char, translation: currentChar.translation });
            setGameOver(true);
            return prevSnake;
          }
        }

        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [direction, gameStarted, gameOver, translations, generateNewRound, speed, isPaused]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-red-600">
          中文蛇 Chinese Snake
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Eat the correct translation!
        </p>
        
        {!gameStarted ? (
          <div className="text-center">
            <button
              onClick={resetGame}
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition"
            >
              Start Game
            </button>
            <div className="mt-6 text-left text-sm text-gray-700 max-w-md">
              <p className="font-bold mb-2">How to play:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use arrow keys to move</li>
                <li>A Chinese character will appear at the top</li>
                <li>Eat only the correct English translation</li>
                <li>Eating wrong translations = Game Over</li>
                <li>Don't hit yourself!</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {currentChar && (
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-red-600 mb-2">
                  {currentChar.char}
                </div>
              </div>
            )}
            
            <div className="mb-4 text-center text-xl font-bold text-gray-700">
              Score: {score}
              {isPaused && (
                <div className="text-sm text-green-600 mt-1">
                  ¡Correcto! Continuando en 3 segundos...
                </div>
              )}
            </div>

            <div
              className="relative bg-gray-100 border-4 border-gray-300"
              style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE
              }}
            >
              {snake.map((segment, i) => (
                <div
                  key={i}
                  className="absolute transition-all duration-100"
                  style={{
                    left: segment.x * CELL_SIZE + 1,
                    top: segment.y * CELL_SIZE + 1,
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    backgroundColor: i === 0 ? '#4ade80' : '#22c55e',
                    borderRadius: '4px'
                  }}
                />
              ))}

              {translations.map((trans, i) => (
                <div
                  key={i}
                  className="absolute bg-gradient-to-br from-red-500 to-red-600 text-white font-semibold rounded-md shadow-md border border-red-700 flex items-center justify-center"
                  style={{
                    left: trans.x * CELL_SIZE + 1,
                    top: trans.y * CELL_SIZE + 1,
                    width: trans.width * CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    fontSize: trans.width > 4 ? '10px' : '11px',
                    padding: '2px 4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {trans.text}
                </div>
              ))}

              {gameOver && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center">
                  <div className="text-white text-3xl font-bold mb-4">
                    Game Over!
                  </div>
                  {failedWord && (
                    <div className="bg-white rounded-lg p-6 mb-4 text-center">
                      <div className="text-gray-600 text-sm mb-2">La respuesta correcta era:</div>
                      <div className="text-5xl font-bold text-red-600 mb-2">
                        {failedWord.char}
                      </div>
                      <div className="text-2xl text-gray-800 font-semibold">
                        {failedWord.translation}
                      </div>
                    </div>
                  )}
                  <div className="text-white text-xl mb-6">
                    Final Score: {score}
                  </div>
                  <button
                    onClick={resetGame}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChineseSnakeGame;