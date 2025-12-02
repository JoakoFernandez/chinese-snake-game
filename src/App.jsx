import React, { useState, useEffect, useCallback } from 'react';

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
  const [currentTarget, setCurrentTarget] = useState(null);
  const [options, setOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const [failedWord, setFailedWord] = useState(null);
  const [gameMode, setGameMode] = useState(null); // 'char-to-eng', 'eng-to-char', 'mixed'
  const [currentQuestionType, setCurrentQuestionType] = useState(null); // 'char' or 'eng'
  const [directionQueue, setDirectionQueue] = useState([]);

  const generateNewRound = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    const target = vocabulary[randomIndex];
    
    // Determine question type based on game mode
    let questionType;
    if (gameMode === 'char-to-eng') {
      questionType = 'char';
    } else if (gameMode === 'eng-to-char') {
      questionType = 'eng';
    } else { // mixed
      questionType = Math.random() < 0.5 ? 'char' : 'eng';
    }
    setCurrentQuestionType(questionType);
    
    const incorrectOptions = vocabulary
      .filter(v => v.translation !== target.translation && v.char !== target.char)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [target, ...incorrectOptions].sort(() => Math.random() - 0.5);
    
    const placedWords = [];
    
    const isPositionValid = (x, y, width, snakePos) => {
      // Check collision with snake (including a safety margin of 5 cells from start position)
      for (let i = 0; i < width; i++) {
        for (const segment of snakePos) {
          const distance = Math.abs((x + i) - segment.x) + Math.abs(y - segment.y);
          if (distance < 3) return false;
        }
        // Extra check: don't spawn in front of starting position (10, 10)
        const distanceFromStart = Math.abs((x + i) - 10) + Math.abs(y - 10);
        if (distanceFromStart < 5) return false;
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
      const displayText = questionType === 'char' ? option.translation : option.char;
      const textLength = displayText.length;
      const wordWidth = Math.max(3, Math.ceil(textLength / 4));
      
      for (let attempts = 0; attempts < 100; attempts++) {
        const x = Math.floor(Math.random() * (GRID_SIZE - wordWidth - 1)) + 1;
        const y = Math.floor(Math.random() * (GRID_SIZE - 2)) + 1;
        
        if (isPositionValid(x, y, wordWidth, snakePos)) {
          const word = {
            text: displayText,
            x: x,
            y: y,
            width: wordWidth,
            isCorrect: option.char === target.char && option.translation === target.translation
          };
          placedWords.push(word);
          return word;
        }
      }
      
      return {
        text: displayText,
        x: 1,
        y: GRID_SIZE - 2,
        width: wordWidth,
        isCorrect: option.char === target.char && option.translation === target.translation
      };
    };
    
    const words = allOptions.map(option => placeWord(option, snake));
    
    setCurrentTarget(target);
    setOptions(words);
  }, [snake, gameMode]);

  const resetGame = (mode) => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setDirectionQueue([]);
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    setFailedWord(null);
    setGameMode(mode);
    setTimeout(() => generateNewRound(), 0);
  };

  const backToMenu = () => {
    setGameStarted(false);
    setGameMode(null);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return;
      
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      
      if (isPaused) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          setIsPaused(false);
        }
      }
      
      setDirectionQueue(prevQueue => {
        const currentDir = prevQueue.length > 0 ? prevQueue[prevQueue.length - 1] : direction;
        let newDir = null;
        
        switch (e.key) {
          case 'ArrowUp':
            if (currentDir.y === 0 && !(snake.length > 1 && snake[1].y < snake[0].y)) {
              newDir = { x: 0, y: -1 };
            }
            break;
          case 'ArrowDown':
            if (currentDir.y === 0 && !(snake.length > 1 && snake[1].y > snake[0].y)) {
              newDir = { x: 0, y: 1 };
            }
            break;
          case 'ArrowLeft':
            if (currentDir.x === 0 && !(snake.length > 1 && snake[1].x < snake[0].x)) {
              newDir = { x: -1, y: 0 };
            }
            break;
          case 'ArrowRight':
            if (currentDir.x === 0 && !(snake.length > 1 && snake[1].x > snake[0].x)) {
              newDir = { x: 1, y: 0 };
            }
            break;
        }
        
        if (newDir && (prevQueue.length === 0 || 
            prevQueue[prevQueue.length - 1].x !== newDir.x || 
            prevQueue[prevQueue.length - 1].y !== newDir.y)) {
          // Only keep last 2 directions in queue to prevent overflow
          return [...prevQueue.slice(-1), newDir];
        }
        return prevQueue;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver, isPaused, snake]);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      // Process direction queue before moving
      setDirectionQueue(prevQueue => {
        if (prevQueue.length > 0) {
          setDirection(prevQueue[0]);
          return prevQueue.slice(1);
        }
        return prevQueue;
      });

      setSnake(prevSnake => {
        const newHead = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y
        };

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const eatenOption = options.find(
          t => {
            for (let i = 0; i < t.width; i++) {
              if (t.x + i === newHead.x && t.y === newHead.y) {
                return true;
              }
            }
            return false;
          }
        );

        if (eatenOption) {
          if (eatenOption.isCorrect) {
            setScore(s => s + 1);
            setSpeed(s => Math.max(50, s - 5));
            setIsPaused(true);
            
            setTimeout(() => {
              setIsPaused(false);
            }, 3000);
            
            generateNewRound();
            return [newHead, ...prevSnake];
          } else {
            setFailedWord({ 
              char: currentTarget.char, 
              translation: currentTarget.translation,
              questionType: currentQuestionType
            });
            setGameOver(true);
            return prevSnake;
          }
        }

        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [direction, gameStarted, gameOver, options, generateNewRound, speed, isPaused, currentTarget, currentQuestionType]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 p-4">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg shadow-2xl p-8 border-4 border-emerald-300">
        <h1 className="text-4xl font-bold text-center mb-2 text-red-600">
          中文蛇 Chinese Snake
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Learn Chinese characters while playing!
        </p>
        
        {!gameStarted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Game Mode</h2>
            
            <div className="space-y-4 mb-6">
              <button
                onClick={() => resetGame('char-to-eng')}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
              >
                Mode 1: Character → English
                <div className="text-sm font-normal mt-1">See Chinese, eat English translation</div>
              </button>
              
              <button
                onClick={() => resetGame('eng-to-char')}
                className="w-full bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition"
              >
                Mode 2: English → Character
                <div className="text-sm font-normal mt-1">See English, eat Chinese character</div>
              </button>
              
              <button
                onClick={() => resetGame('mixed')}
                className="w-full bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-purple-700 transition"
              >
                Mode 3: Mixed Challenge
                <div className="text-sm font-normal mt-1">Random questions both ways!</div>
              </button>
            </div>
            
            <div className="mt-6 text-left text-sm text-gray-700 max-w-md">
              <p className="font-bold mb-2">How to play:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use arrow keys to move</li>
                <li>Eat the correct answer</li>
                <li>Wrong answer = Game Over</li>
                <li>Don't hit walls or yourself!</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {currentTarget && (
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-red-600 mb-2">
                  {currentQuestionType === 'char' ? currentTarget.char : currentTarget.translation}
                </div>
                <div className="text-xs text-gray-400">
                  Mode: {gameMode === 'char-to-eng' ? 'Char → Eng' : gameMode === 'eng-to-char' ? 'Eng → Char' : 'Mixed'}
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
              className="relative border-4 border-slate-700 shadow-inner"
              style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
                backgroundImage: 'url(/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {snake.map((segment, i) => {
                const isHead = i === 0;
                const isTail = i === snake.length - 1;
                
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: segment.x * CELL_SIZE + 1,
                      top: segment.y * CELL_SIZE + 1,
                      width: CELL_SIZE - 2,
                      height: CELL_SIZE - 2,
                      backgroundColor: '#4285f4',
                      borderRadius: isHead ? '8px' : isTail ? '6px' : '3px',
                      boxShadow: 'inset 0 0 0 2px #5a9eff, 0 2px 4px rgba(0,0,0,0.2)',
                      transition: 'all 0.1s ease'
                    }}
                  >
                    {isHead && (
                      <>
                        {/* Eyes */}
                        <div
                          className="absolute bg-white rounded-full"
                          style={{
                            width: '6px',
                            height: '6px',
                            top: direction.y === 1 ? '13px' : '5px',
                            left: direction.x === 1 ? '13px' : direction.x === -1 ? '4px' : '5px',
                            boxShadow: 'inset 1px 1px 0 rgba(0,0,0,0.3)'
                          }}
                        >
                          <div
                            className="absolute bg-black rounded-full"
                            style={{
                              width: '3px',
                              height: '3px',
                              top: '2px',
                              left: '2px'
                            }}
                          />
                        </div>
                        <div
                          className="absolute bg-white rounded-full"
                          style={{
                            width: '6px',
                            height: '6px',
                            top: direction.y === 1 ? '13px' : '5px',
                            left: direction.x === 1 ? '13px' : direction.x === -1 ? '4px' : '13px',
                            boxShadow: 'inset 1px 1px 0 rgba(0,0,0,0.3)'
                          }}
                        >
                          <div
                            className="absolute bg-black rounded-full"
                            style={{
                              width: '3px',
                              height: '3px',
                              top: '2px',
                              left: '2px'
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}

              {options.map((option, i) => (
                <div
                  key={i}
                  className="absolute text-white font-bold rounded-lg shadow-lg border-2 flex items-center justify-center"
                  style={{
                    left: option.x * CELL_SIZE + 1,
                    top: option.y * CELL_SIZE + 1,
                    width: option.width * CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    background: 'radial-gradient(circle at 30% 30%, #ef4444, #dc2626)',
                    borderColor: '#991b1b',
                    fontSize: option.width > 4 ? '10px' : '11px',
                    padding: '2px 4px',
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    textOverflow: 'ellipsis',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)'
                  }}
                >
                  {/* Stick */}
                  <div
                    className="absolute bg-amber-800"
                    style={{
                      width: '2px',
                      height: '6px',
                      top: '-5px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      borderRadius: '1px'
                    }}
                  />
                  {/* Leaf */}
                  <div
                    className="absolute bg-green-600"
                    style={{
                      width: '8px',
                      height: '5px',
                      top: '-7px',
                      left: '50%',
                      transform: 'translateX(-50%) rotate(-20deg)',
                      borderRadius: '50% 0 50% 0',
                      boxShadow: 'inset -1px -1px 0 rgba(0,0,0,0.2)'
                    }}
                  />
                  {/* Highlight spot */}
                  <div
                    className="absolute rounded-full bg-white opacity-40"
                    style={{
                      width: '8px',
                      height: '8px',
                      top: '3px',
                      left: '6px',
                      filter: 'blur(2px)'
                    }}
                  />
                  {option.text}
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
                  <div className="flex gap-4">
                    <button
                      onClick={() => resetGame(gameMode)}
                      className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={backToMenu}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition"
                    >
                      Main Menu
                    </button>
                  </div>
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