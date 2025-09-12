import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Gamepad2, Play, Pause, RotateCcw, Trophy, Star, Brain } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  description: string;
  category: 'breathing' | 'memory' | 'focus' | 'relaxation';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  icon: string;
}

const games: Game[] = [
  {
    id: 'breathing-box',
    name: 'Box Breathing',
    description: 'Follow the animated square to practice calming box breathing technique',
    category: 'breathing',
    difficulty: 'Easy',
    duration: '2-5 min',
    icon: '🫁',
  },
  {
    id: 'memory-cards',
    name: 'Memory Match',
    description: 'Match pairs of calming nature images to improve focus and memory',
    category: 'memory',
    difficulty: 'Medium',
    duration: '5-10 min',
    icon: '🃏',
  },
  {
    id: 'color-focus',
    name: 'Color Focus',
    description: 'Focus on specific colors to practice mindful attention',
    category: 'focus',
    difficulty: 'Easy',
    duration: '3-7 min',
    icon: '🎨',
  },
  {
    id: 'zen-garden',
    name: 'Digital Zen Garden',
    description: 'Draw patterns in sand for a meditative, stress-relief experience',
    category: 'relaxation',
    difficulty: 'Easy',
    duration: '5-15 min',
    icon: '🏯',
  },
  {
    id: 'word-calm',
    name: 'Calming Words',
    description: 'Find positive words hidden in a peaceful word search',
    category: 'focus',
    difficulty: 'Medium',
    duration: '7-12 min',
    icon: '📝',
  },
  {
    id: 'pattern-draw',
    name: 'Mindful Patterns',
    description: 'Draw repetitive patterns to enter a meditative flow state',
    category: 'relaxation',
    difficulty: 'Easy',
    duration: '5-20 min',
    icon: '🌀',
  },
];

// Box Breathing Game Component
function BoxBreathingGame({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next phase
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case 'inhale': return 'hold1';
              case 'hold1': return 'exhale';
              case 'exhale': return 'hold2';
              case 'hold2': 
                setCycle(c => c + 1);
                return 'inhale';
              default: return 'inhale';
            }
          });
          return 0;
        }
        return prev + 2.5; // 4 seconds per phase
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const phaseInstructions = {
    inhale: 'Breathe In',
    hold1: 'Hold',
    exhale: 'Breathe Out',
    hold2: 'Hold',
  };

  const boxSize = 80 + (progress * 0.4); // Animated size

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-center">Box Breathing 🫁</CardTitle>
          <CardDescription className="text-center">
            Follow the square and breathe calmly
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Animated Box */}
          <div className="flex justify-center items-center h-48">
            <div
              className="border-4 border-blue-500 transition-all duration-[4000ms] ease-in-out rounded-lg bg-blue-50"
              style={{
                width: `${boxSize}px`,
                height: `${boxSize}px`,
              }}
            />
          </div>
          
          {/* Instructions */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">
              {phaseInstructions[phase]}
            </h3>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              Cycle {cycle + 1} • {phase}
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" onClick={() => { setProgress(0); setPhase('inhale'); setCycle(0); }}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Color Focus Game Component
function ColorFocusGame({ onClose }: { onClose: () => void }) {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
  const [targetColor, setTargetColor] = useState('');
  const [currentColors, setCurrentColors] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    generateNewRound();
  }, []);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [timeLeft, gameActive]);

  const generateNewRound = () => {
    const target = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(target);
    
    const numColors = Math.min(4 + Math.floor(level / 3), 12);
    const targetCount = Math.floor(numColors * 0.3) + 1;
    const otherColors = colors.filter(c => c !== target);
    
    const roundColors = [
      ...Array(targetCount).fill(target),
      ...Array(numColors - targetCount).fill().map(() => 
        otherColors[Math.floor(Math.random() * otherColors.length)]
      )
    ].sort(() => Math.random() - 0.5);
    
    setCurrentColors(roundColors);
  };

  const handleColorClick = (color: string, index: number) => {
    if (!gameActive) return;
    
    if (color === targetColor) {
      setScore(score + 10);
      const newColors = currentColors.filter((_, i) => i !== index);
      setCurrentColors(newColors);
      
      if (newColors.filter(c => c === targetColor).length === 0) {
        setLevel(level + 1);
        setTimeout(generateNewRound, 500);
      }
    } else {
      setScore(Math.max(0, score - 5));
    }
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(30);
    generateNewRound();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">Color Focus 🎨</CardTitle>
          <CardDescription className="text-center">
            Click only the {targetColor && <span className={`font-bold text-${targetColor}-600`}>{targetColor}</span>} colors!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!gameActive && timeLeft === 30 ? (
            <div className="text-center space-y-4">
              <p>Focus on the target color and click only those circles. Avoid other colors!</p>
              <Button onClick={startGame} className="bg-gradient-to-r from-green-500 to-blue-500">
                Start Game
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-center">
                <div>Score: <span className="font-bold text-green-600">{score}</span></div>
                <div>Level: <span className="font-bold text-blue-600">{level}</span></div>
                <div>Time: <span className="font-bold text-red-600">{timeLeft}s</span></div>
              </div>
              
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-lg min-h-[200px]">
                {currentColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorClick(color, index)}
                    className={`w-12 h-12 rounded-full border-2 border-gray-300 hover:scale-110 transition-all ${
                      color === 'red' ? 'bg-red-500' :
                      color === 'blue' ? 'bg-blue-500' :
                      color === 'green' ? 'bg-green-500' :
                      color === 'yellow' ? 'bg-yellow-500' :
                      color === 'purple' ? 'bg-purple-500' :
                      color === 'orange' ? 'bg-orange-500' :
                      'bg-pink-500'
                    }`}
                  />
                ))}
              </div>
              
              {timeLeft === 0 && (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-700">Game Over!</h3>
                  <p className="text-blue-600">Final Score: {score} points</p>
                  <Button onClick={startGame} className="mt-2">Play Again</Button>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-center space-x-2 mt-4">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Digital Zen Garden Game Component
function ZenGardenGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(20);
  const [pattern, setPattern] = useState<'rake' | 'circles' | 'waves'>('rake');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up canvas
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    
    // Fill with sand color
    ctx.fillStyle = '#f4e4bc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some texture
    ctx.fillStyle = '#e8d5a3';
    for (let i = 0; i < 1000; i++) {
      ctx.fillRect(
        Math.random() * canvas.width / 2,
        Math.random() * canvas.height / 2,
        1, 1
      );
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#d4b896';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    
    if (pattern === 'rake') {
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (pattern === 'circles') {
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.stroke();
    } else if (pattern === 'waves') {
      ctx.beginPath();
      for (let i = -brushSize; i <= brushSize; i += 2) {
        ctx.lineTo(x + i, y + Math.sin(i * 0.1) * 5);
      }
      ctx.stroke();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#f4e4bc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">Digital Zen Garden 🏯</CardTitle>
          <CardDescription className="text-center">
            Draw peaceful patterns in the sand to relax your mind
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={pattern === 'rake' ? 'secondary' : 'outline'}
              onClick={() => setPattern('rake')}
              size="sm"
            >
              🌾 Rake
            </Button>
            <Button
              variant={pattern === 'circles' ? 'secondary' : 'outline'}
              onClick={() => setPattern('circles')}
              size="sm"
            >
              ⭕ Circles
            </Button>
            <Button
              variant={pattern === 'waves' ? 'secondary' : 'outline'}
              onClick={() => setPattern('waves')}
              size="sm"
            >
              〰️ Waves
            </Button>
            <Button variant="outline" onClick={clearCanvas} size="sm">
              🗑️ Clear
            </Button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Brush Size: {brushSize}px</label>
            <input
              type="range"
              min="5"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <canvas
            ref={canvasRef}
            className="w-full h-64 border-2 border-amber-200 rounded-lg cursor-crosshair bg-yellow-50"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
          />
          
          <div className="text-center text-sm text-gray-600">
            <p>🧘‍♀️ Let your mind wander as you create beautiful patterns in the sand</p>
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Calming Words Game Component  
function CalmingWordsGame({ onClose }: { onClose: () => void }) {
  const words = ['PEACE', 'CALM', 'LOVE', 'HOPE', 'JOY', 'SMILE', 'DREAM', 'SHINE'];
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const size = 10;
    const newGrid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
    
    // Place words randomly
    words.forEach(word => {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 50) {
        const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
        const startRow = Math.floor(Math.random() * size);
        const startCol = Math.floor(Math.random() * size);
        
        if (canPlaceWord(newGrid, word, startRow, startCol, direction, size)) {
          placeWord(newGrid, word, startRow, startCol, direction);
          placed = true;
        }
        attempts++;
      }
    });
    
    // Fill empty cells with random letters
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (newGrid[i][j] === '') {
          newGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
      }
    }
    
    setGrid(newGrid);
  };

  const canPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number, size: number): boolean => {
    const directions = [[0, 1], [1, 0], [1, 1]];
    const [dRow, dCol] = directions[direction];
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      
      if (newRow >= size || newCol >= size || (grid[newRow][newCol] !== '' && grid[newRow][newCol] !== word[i])) {
        return false;
      }
    }
    return true;
  };

  const placeWord = (grid: string[][], word: string, row: number, col: number, direction: number) => {
    const directions = [[0, 1], [1, 0], [1, 1]];
    const [dRow, dCol] = directions[direction];
    
    for (let i = 0; i < word.length; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      grid[newRow][newCol] = word[i];
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (isSelecting) {
      const newSelection = [...selectedCells, [row, col]];
      setSelectedCells(newSelection);
      
      // Check if selection forms a word
      const selectedWord = newSelection.map(([r, c]) => grid[r][c]).join('');
      if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
        setFoundWords([...foundWords, selectedWord]);
        setSelectedCells([]);
        setIsSelecting(false);
      }
    } else {
      setSelectedCells([[row, col]]);
      setIsSelecting(true);
    }
  };

  const resetSelection = () => {
    setSelectedCells([]);
    setIsSelecting(false);
  };

  const isCellSelected = (row: number, col: number) => {
    return selectedCells.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center">Calming Words 📝</CardTitle>
          <CardDescription className="text-center">
            Find hidden positive words in the grid • Found: {foundWords.length}/{words.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-10 gap-1 p-4 bg-blue-50 rounded-lg max-w-lg mx-auto">
            {grid.map((row, i) =>
              row.map((cell, j) => (
                <button
                  key={`${i}-${j}`}
                  onClick={() => handleCellClick(i, j)}
                  className={`w-8 h-8 text-xs font-bold rounded border transition-all hover:scale-110 ${
                    isCellSelected(i, j)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white hover:bg-blue-100'
                  }`}
                >
                  {cell}
                </button>
              ))
            )}
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-center">Words to Find:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {words.map(word => (
                <Badge
                  key={word}
                  variant={foundWords.includes(word) ? 'secondary' : 'outline'}
                  className={foundWords.includes(word) ? 'bg-green-100 text-green-800' : ''}
                >
                  {foundWords.includes(word) ? '✓ ' : ''}{word}
                </Badge>
              ))}
            </div>
          </div>
          
          {foundWords.length === words.length && (
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">Congratulations! 🎉</h3>
              <p className="text-green-600">You found all the calming words!</p>
            </div>
          )}
          
          <div className="flex justify-center space-x-2">
            <Button variant="outline" onClick={resetSelection} size="sm">
              Reset Selection
            </Button>
            <Button variant="outline" onClick={generateGrid} size="sm">
              New Puzzle
            </Button>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Mindful Patterns Game Component
function MindfulPatternsGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [patternType, setPatternType] = useState<'mandala' | 'spiral' | 'geometric' | 'free'>('mandala');
  const [color, setColor] = useState('#6366f1');
  const [lineWidth, setLineWidth] = useState(2);
  const [symmetryMode, setSymmetryMode] = useState<number>(8);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    
    // Set up canvas with white background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw center guides for mandala
    if (patternType === 'mandala') {
      drawMandalaGuides(ctx, canvas.width / 4, canvas.height / 4);
    }
  }, [patternType]);

  const drawMandalaGuides = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    
    // Draw center circles
    for (let r = 20; r <= 100; r += 20) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Draw symmetry lines
    for (let i = 0; i < symmetryMode; i++) {
      const angle = (i * Math.PI * 2) / symmetryMode;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle) * 120, centerY + Math.sin(angle) * 120);
      ctx.stroke();
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (patternType === 'mandala') {
      const centerX = canvas.width / 4;
      const centerY = canvas.height / 4;
      
      // Draw symmetrical points
      for (let i = 0; i < symmetryMode; i++) {
        const angle = (i * Math.PI * 2) / symmetryMode;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        // Transform point around center
        const dx = x - centerX;
        const dy = y - centerY;
        const newX = centerX + (dx * cos - dy * sin);
        const newY = centerY + (dx * sin + dy * cos);
        
        ctx.beginPath();
        ctx.arc(newX, newY, lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (patternType === 'spiral') {
      const centerX = canvas.width / 4;
      const centerY = canvas.height / 4;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const angle = Math.atan2(y - centerY, x - centerX);
      
      ctx.beginPath();
      ctx.arc(centerX + Math.cos(angle + distance * 0.01) * distance, 
              centerY + Math.sin(angle + distance * 0.01) * distance, 
              lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Free drawing
      ctx.beginPath();
      ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (patternType === 'mandala') {
      drawMandalaGuides(ctx, canvas.width / 4, canvas.height / 4);
    }
  };

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center">Mindful Patterns 🌀</CardTitle>
          <CardDescription className="text-center">
            Create beautiful, repetitive patterns to enter a meditative flow state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={patternType === 'mandala' ? 'secondary' : 'outline'}
              onClick={() => setPatternType('mandala')}
              size="sm"
            >
              🕸️ Mandala
            </Button>
            <Button
              variant={patternType === 'spiral' ? 'secondary' : 'outline'}
              onClick={() => setPatternType('spiral')}
              size="sm"
            >
              🌀 Spiral
            </Button>
            <Button
              variant={patternType === 'free' ? 'secondary' : 'outline'}
              onClick={() => setPatternType('free')}
              size="sm"
            >
              ✏️ Free Draw
            </Button>
            <Button variant="outline" onClick={clearCanvas} size="sm">
              🗑️ Clear
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm block mb-1">Colors:</label>
              <div className="flex gap-1">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded border-2 ${color === c ? 'border-gray-800' : 'border-gray-300'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm block mb-1">Line Width: {lineWidth}px</label>
              <input
                type="range"
                min="1"
                max="10"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            {patternType === 'mandala' && (
              <div>
                <label className="text-sm block mb-1">Symmetry: {symmetryMode}x</label>
                <input
                  type="range"
                  min="4"
                  max="16"
                  value={symmetryMode}
                  onChange={(e) => setSymmetryMode(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>
          
          <canvas
            ref={canvasRef}
            className="w-full h-80 border-2 border-purple-200 rounded-lg cursor-crosshair bg-white"
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
          />
          
          <div className="text-center text-sm text-gray-600">
            <p>🧘‍♂️ Let your creativity flow and find peace through repetitive, beautiful patterns</p>
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Memory Match Game Component
function MemoryMatchGame({ onClose }: { onClose: () => void }) {
  const icons = ['🌸', '🌿', '🦋', '🌊', '🌙', '⭐', '🍃', '🌺'];
  const [cards, setCards] = useState<{ id: string; icon: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  useEffect(() => {
    // Initialize cards
    const gameCards = [...icons, ...icons].map((icon, index) => ({
      id: `card-${index}`,
      icon,
      flipped: false,
      matched: false,
    }));
    setCards(gameCards.sort(() => Math.random() - 0.5));
  }, []);

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    setCards(cards.map(c => 
      c.id === cardId ? { ...c, flipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedCards;
      const firstCard = cards.find(c => c.id === first);
      const secondCard = cards.find(c => c.id === second);

      if (firstCard?.icon === secondCard?.icon) {
        // Match found
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === first || c.id === second ? { ...c, matched: true } : c
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === first || c.id === second ? { ...c, flipped: false } : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Memory Match 🃏</CardTitle>
          <CardDescription className="text-center">
            Find matching pairs • Moves: {moves} • Matches: {matches}/8
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square text-2xl rounded-lg border-2 transition-all hover:scale-105 ${
                  card.flipped || card.matched
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-gray-200 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {card.flipped || card.matched ? card.icon : '?'}
              </button>
            ))}
          </div>
          
          {matches === 8 && (
            <div className="text-center mb-4 p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">Congratulations! 🎉</h3>
              <p className="text-green-600">You completed the game in {moves} moves!</p>
            </div>
          )}
          
          <div className="flex justify-center space-x-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              New Game
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const categoryColors = {
  breathing: 'bg-blue-100 text-blue-800 border-blue-200',
  memory: 'bg-purple-100 text-purple-800 border-purple-200',
  focus: 'bg-green-100 text-green-800 border-green-200',
  relaxation: 'bg-orange-100 text-orange-800 border-orange-200',
};

export function MindMaze() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [gamesCompleted, setGamesCompleted] = useState<string[]>([]);

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const openGame = (gameId: string) => {
    setActiveGame(gameId);
  };

  const closeGame = () => {
    setActiveGame(null);
    // Mark game as completed (in a real app, this would be saved to backend)
    if (activeGame && !gamesCompleted.includes(activeGame)) {
      setGamesCompleted([...gamesCompleted, activeGame]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
          MindMaze 🎮
        </h1>
        <p className="text-xl text-gray-600">
          Stress-relieving games designed to calm your mind and boost wellbeing
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-teal-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Trophy className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700">{gamesCompleted.length}</h3>
            <p className="text-sm text-gray-600">Games Completed</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-purple-700">
              {Math.round((gamesCompleted.length / games.length) * 100)}%
            </h3>
            <p className="text-sm text-gray-600">Collection Complete</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-700">Daily</h3>
            <p className="text-sm text-gray-600">Mindfulness Practice</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Choose Your Wellness Activity</CardTitle>
          <CardDescription>Select a category or browse all games</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === 'all' ? 'secondary' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              All Games
            </Button>
            <Button
              variant={selectedCategory === 'breathing' ? 'secondary' : 'outline'}
              onClick={() => setSelectedCategory('breathing')}
            >
              🫁 Breathing
            </Button>
            <Button
              variant={selectedCategory === 'memory' ? 'secondary' : 'outline'}
              onClick={() => setSelectedCategory('memory')}
            >
              🧠 Memory
            </Button>
            <Button
              variant={selectedCategory === 'focus' ? 'secondary' : 'outline'}
              onClick={() => setSelectedCategory('focus')}
            >
              🎯 Focus
            </Button>
            <Button
              variant={selectedCategory === 'relaxation' ? 'secondary' : 'outline'}
              onClick={() => setSelectedCategory('relaxation')}
            >
              🧘 Relaxation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <Card 
            key={game.id} 
            className="border-none shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
            onClick={() => openGame(game.id)}
          >
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{game.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{game.description}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={categoryColors[game.category]}>
                    {game.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{game.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="outline"
                    className={
                      game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }
                  >
                    {game.difficulty}
                  </Badge>
                  {gamesCompleted.includes(game.id) && (
                    <Badge className="bg-green-500 text-white">
                      ✓ Completed
                    </Badge>
                  )}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Play Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Motivational Message */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-orange-700 mb-2">
            🌟 Take a mindful break!
          </h3>
          <p className="text-gray-600">
            Even 5 minutes of mindful gaming can help reduce stress and improve focus. 
            Your mental health journey matters! 💚
          </p>
        </CardContent>
      </Card>

      {/* Game Modals */}
      {activeGame === 'breathing-box' && <BoxBreathingGame onClose={closeGame} />}
      {activeGame === 'memory-cards' && <MemoryMatchGame onClose={closeGame} />}
      {activeGame === 'color-focus' && <ColorFocusGame onClose={closeGame} />}
      {activeGame === 'zen-garden' && <ZenGardenGame onClose={closeGame} />}
      {activeGame === 'word-calm' && <CalmingWordsGame onClose={closeGame} />}
      {activeGame === 'pattern-draw' && <MindfulPatternsGame onClose={closeGame} />}
    </div>
  );
}