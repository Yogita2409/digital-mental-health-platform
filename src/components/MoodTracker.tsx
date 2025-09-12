import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Volume2, VolumeX, RefreshCw, Heart, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { emoji: '😌', label: 'Calm', color: 'bg-blue-100 hover:bg-blue-200' },
  { emoji: '😔', label: 'Sad', color: 'bg-gray-100 hover:bg-gray-200' },
  { emoji: '😰', label: 'Anxious', color: 'bg-orange-100 hover:bg-orange-200' },
  { emoji: '😤', label: 'Stressed', color: 'bg-red-100 hover:bg-red-200' },
  { emoji: '😴', label: 'Tired', color: 'bg-purple-100 hover:bg-purple-200' },
  { emoji: '🤗', label: 'Grateful', color: 'bg-green-100 hover:bg-green-200' },
  { emoji: '😕', label: 'Confused', color: 'bg-indigo-100 hover:bg-indigo-200' },
];

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything! 😄",
  "I told my wife she was drawing her eyebrows too high. She looked surprised! 😂",
  "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
  "What do you call a fake noodle? An impasta! 🍝",
  "Why don't eggs tell jokes? They'd crack each other up! 🥚",
  "What do you call a sleeping bull? A bulldozer! 😴",
  "Why did the math book look so sad? Because it had too many problems! 📚",
  "What's the best thing about Switzerland? The flag is a big plus! 🇨🇭",
];

const encouragingMessages = [
  "You're stronger than you think! 💪",
  "This too shall pass. You've got this! 🌈",
  "Every small step counts. Be proud of yourself! ✨",
  "You're not alone in this journey. 🤝",
  "Progress, not perfection. Keep going! 🎯",
  "Your mental health matters. Take care of yourself! 💚",
  "Tomorrow is a new day full of possibilities! 🌅",
  "You deserve peace and happiness! 🕊️",
];

export function MoodTracker({ setActiveSection }: { setActiveSection?: (section: string) => void }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [currentMessage, setCurrentMessage] = useState(encouragingMessages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationTimer, setMeditationTimer] = useState(300); // 5 minutes
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');

  useEffect(() => {
    // Simulate background music (in a real app, you'd use actual audio files)
    const audioElement = new Audio();
    audioElement.loop = true;
    audioElement.volume = 0.3;
    setAudio(audioElement);
    
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  const getNewJoke = () => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentJoke(randomJoke);
  };

  const getNewMessage = () => {
    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    setCurrentMessage(randomMessage);
  };

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        // In a real app, you'd load actual audio files
        // For demo purposes, we'll just toggle the state
        console.log('Playing calm background music...');
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.label);
    getNewMessage();
  };

  // Meditation functionality
  const startMeditation = () => {
    setShowMeditation(true);
    setMeditationActive(true);
    setMeditationTimer(300);
  };

  const stopMeditation = () => {
    setMeditationActive(false);
    setShowMeditation(false);
    setMeditationTimer(300);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (meditationActive && meditationTimer > 0) {
      interval = setInterval(() => {
        setMeditationTimer(prev => prev - 1);
      }, 1000);
    } else if (meditationTimer === 0) {
      setMeditationActive(false);
    }
    return () => clearInterval(interval);
  }, [meditationActive, meditationTimer]);

  // Breathing animation cycle
  useEffect(() => {
    if (!meditationActive) return;
    
    const breathingCycle = () => {
      setBreathingPhase('inhale');
      setTimeout(() => setBreathingPhase('hold'), 4000);
      setTimeout(() => setBreathingPhase('exhale'), 8000);
      setTimeout(() => setBreathingPhase('pause'), 12000);
    };

    breathingCycle();
    const interval = setInterval(breathingCycle, 16000); // Complete cycle every 16 seconds
    
    return () => clearInterval(interval);
  }, [meditationActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const saveJournalEntry = () => {
    if (journalText.trim()) {
      const today = new Date().toDateString();
      const entry = {
        date: today,
        content: journalText,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`journal_${today}`, JSON.stringify(entry));
      setJournalText('');
      setShowJournal(false);
      // Show success message
      alert('Your gratitude entry has been saved! 🌟');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to CalmCircle 🌸</h1>
          <p className="text-xl mb-6 text-rose-100">
            Your safe space for mental wellness and support
          </p>
          <div className="flex justify-center items-center space-x-4">
            <Button
              onClick={toggleMusic}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Music' : 'Play Calming Music'}</span>
            </Button>
            {isPlaying && (
              <Badge variant="secondary" className="animate-pulse">
                🎵 Peaceful sounds playing
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Daily Inspiration */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-700">Daily Inspiration 🌟</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg text-green-600">{currentMessage}</p>
          <Button
            onClick={getNewMessage}
            variant="outline"
            size="sm"
            className="border-green-300 text-green-700 hover:bg-green-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            New Message
          </Button>
        </CardContent>
      </Card>

      {/* Mood Tracker */}
      <Card className="border-none shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">How are you feeling today? 💚</CardTitle>
          <CardDescription className="text-lg">
            Select your current mood to get personalized support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {moods.map((mood) => (
              <Button
                key={mood.label}
                onClick={() => handleMoodSelect(mood)}
                variant="outline"
                className={`h-24 flex flex-col items-center justify-center space-y-2 border-2 transition-all hover:scale-105 ${
                  selectedMood === mood.label 
                    ? 'border-blue-500 bg-blue-50 scale-105' 
                    : 'border-gray-200'
                } ${mood.color}`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.label}</span>
              </Button>
            ))}
          </div>
          
          {selectedMood && (
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-lg mb-4">
                Thank you for sharing that you're feeling <strong>{selectedMood.toLowerCase()}</strong> today.
              </p>
              <p className="text-blue-600 mb-4">
                Remember, all feelings are valid. You're taking a great step by checking in with yourself! 🤗
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Self-awareness ✨</Badge>
                <Badge variant="secondary">Mindfulness 🧘</Badge>
                <Badge variant="secondary">Growth 🌱</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Joke */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-orange-700">Smile Break 😄</CardTitle>
          <CardDescription>Laughter is the best medicine!</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg text-gray-700 italic">"{currentJoke}"</p>
          <Button
            onClick={getNewJoke}
            variant="outline"
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Get Another Joke
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">🧘</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">5-Minute Meditation</h3>
            <p className="text-sm text-gray-600 mb-4">Take a moment to breathe and center yourself</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={startMeditation}
            >
              Start Now
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-teal-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Gratitude Journal</h3>
            <p className="text-sm text-gray-600 mb-4">Write down three things you're grateful for</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowJournal(true)}
            >
              Write Now
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Talk to AI</h3>
            <p className="text-sm text-gray-600 mb-4">Get support from our compassionate AI companion</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setActiveSection?.('ai')}
            >
              Chat Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 5-Minute Meditation Modal */}
      <Dialog open={showMeditation} onOpenChange={setShowMeditation}>
        <DialogContent className="max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-indigo-50">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-blue-700">
              🧘‍♀️ 5-Minute Meditation
            </DialogTitle>
            <DialogDescription className="text-center text-blue-600">
              Focus on your breath and find your inner calm
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center space-y-6 p-4">
            {/* Timer */}
            <div className="text-4xl font-bold text-blue-700">
              {formatTime(meditationTimer)}
            </div>
            
            {/* Breathing Animation */}
            <div className="flex justify-center items-center h-40">
              <div className={`w-24 h-24 rounded-full border-4 border-blue-400 transition-all duration-4000 ease-in-out ${
                breathingPhase === 'inhale' ? 'scale-150 bg-blue-100' :
                breathingPhase === 'hold' ? 'scale-150 bg-blue-200' :
                breathingPhase === 'exhale' ? 'scale-100 bg-blue-50' :
                'scale-100 bg-blue-50'
              }`} />
            </div>
            
            {/* Breathing Instructions */}
            <div className="text-lg font-medium text-blue-700">
              {breathingPhase === 'inhale' && '🌬️ Breathe In Slowly'}
              {breathingPhase === 'hold' && '⏸️ Hold Your Breath'}
              {breathingPhase === 'exhale' && '💨 Breathe Out Slowly'}
              {breathingPhase === 'pause' && '⏹️ Rest'}
            </div>
            
            {/* Controls */}
            <div className="flex justify-center space-x-4">
              {!meditationActive ? (
                <Button 
                  onClick={() => setMeditationActive(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Start Meditation
                </Button>
              ) : (
                <Button 
                  onClick={stopMeditation}
                  variant="outline"
                  className="border-blue-300 text-blue-700"
                >
                  Stop
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => setShowMeditation(false)}
              >
                Close
              </Button>
            </div>
            
            {meditationTimer === 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-green-700 font-medium">🎉 Meditation Complete!</div>
                <p className="text-green-600 text-sm mt-1">
                  You've successfully completed your 5-minute meditation. How do you feel?
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Gratitude Journal Modal */}
      <Dialog open={showJournal} onOpenChange={setShowJournal}>
        <DialogContent className="max-w-lg mx-auto bg-gradient-to-br from-green-50 to-teal-50">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-green-700">
              📝 Gratitude Journal
            </DialogTitle>
            <DialogDescription className="text-center text-green-600">
              Write down three things you're grateful for today
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                What are you grateful for today? ✨
              </label>
              <Textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="1. I'm grateful for...&#10;2. I appreciate...&#10;3. I'm thankful for..."
                className="min-h-32 border-green-200 focus:border-green-400"
                rows={6}
              />
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-700 mb-2">💡 Gratitude Tips:</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Be specific about what you're grateful for</li>
                <li>• Include both big and small things</li>
                <li>• Think about people, experiences, or moments</li>
                <li>• Notice how gratitude makes you feel</li>
              </ul>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={saveJournalEntry}
                className="bg-green-600 hover:bg-green-700"
                disabled={!journalText.trim()}
              >
                <Heart className="w-4 h-4 mr-2" />
                Save Entry
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowJournal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}