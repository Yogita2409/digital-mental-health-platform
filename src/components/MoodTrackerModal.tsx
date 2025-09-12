import React, { useState } from 'react';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Volume2, VolumeX, RefreshCw } from 'lucide-react';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-yellow-100 hover:bg-yellow-200', ring: 'ring-yellow-300' },
  { emoji: '😌', label: 'Calm', color: 'bg-blue-100 hover:bg-blue-200', ring: 'ring-blue-300' },
  { emoji: '😔', label: 'Sad', color: 'bg-gray-100 hover:bg-gray-200', ring: 'ring-gray-300' },
  { emoji: '😰', label: 'Anxious', color: 'bg-orange-100 hover:bg-orange-200', ring: 'ring-orange-300' },
  { emoji: '😤', label: 'Stressed', color: 'bg-red-100 hover:bg-red-200', ring: 'ring-red-300' },
  { emoji: '😴', label: 'Tired', color: 'bg-purple-100 hover:bg-purple-200', ring: 'ring-purple-300' },
  { emoji: '🤗', label: 'Grateful', color: 'bg-green-100 hover:bg-green-200', ring: 'ring-green-300' },
  { emoji: '😕', label: 'Confused', color: 'bg-indigo-100 hover:bg-indigo-200', ring: 'ring-indigo-300' },
];

const jokes = [
  "Why don't scientists trust atoms? Because they make up everything! 😄",
  "What do you call a fake noodle? An impasta! 🍝",
  "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
  "What's the best thing about Switzerland? The flag is a big plus! 🇨🇭",
];

const encouragingMessages = [
  "You're stronger than you think! 💪",
  "This too shall pass. You've got this! 🌈",
  "Every small step counts. Be proud of yourself! ✨",
  "You're not alone in this journey. 🤝",
  "Your mental health matters. Take care of yourself! 💚",
];

export function MoodTrackerModal() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);
  const [currentMessage, setCurrentMessage] = useState(encouragingMessages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const getNewJoke = () => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    setCurrentJoke(randomJoke);
  };

  const getNewMessage = () => {
    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    setCurrentMessage(randomMessage);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? 'Pausing calming music...' : 'Playing calming music...');
  };

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.label);
    getNewMessage();
    setShowThankYou(true);
    
    // Save mood to localStorage for persistence
    const today = new Date().toDateString();
    const moodData = {
      mood: mood.label,
      emoji: mood.emoji,
      date: today,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`mood_${today}`, JSON.stringify(moodData));
  };

  if (showThankYou && selectedMood) {
    return (
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-green-50 to-blue-50 border-none">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl text-green-700">Thank You! 🌟</DialogTitle>
          <DialogDescription className="text-green-600">
            Your mood has been recorded
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl">{moods.find(m => m.label === selectedMood)?.emoji}</span>
          </div>
          
          <p className="text-lg">
            You're feeling <strong className="text-green-700">{selectedMood.toLowerCase()}</strong> today
          </p>
          
          <Card className="border-none bg-white/50">
            <CardContent className="p-4">
              <p className="text-green-600 italic">"{currentMessage}"</p>
            </CardContent>
          </Card>
          
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">Self-awareness ✨</Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">Growth 🌱</Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">Mindfulness 🧘</Badge>
          </div>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="max-w-2xl mx-auto bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 border-none">
      <DialogHeader className="text-center">
        <DialogTitle className="text-3xl bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
          How are you feeling today? 💚
        </DialogTitle>
        <DialogDescription className="text-lg text-gray-600">
          Take a moment to check in with yourself
        </DialogDescription>
      </DialogHeader>

      {/* Calming Music Toggle */}
      <div className="flex justify-center mb-6">
        <Button
          onClick={toggleMusic}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isPlaying ? 'Pause Music' : 'Play Calming Music'}</span>
        </Button>
        {isPlaying && (
          <Badge variant="secondary" className="ml-2 animate-pulse bg-purple-100 text-purple-800">
            🎵 Peaceful sounds playing
          </Badge>
        )}
      </div>

      {/* Mood Selection Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {moods.map((mood) => (
          <Button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            variant="outline"
            className={`h-20 flex flex-col items-center justify-center space-y-1 border-2 transition-all hover:scale-105 ${
              selectedMood === mood.label 
                ? `${mood.ring} ring-2 bg-opacity-80` 
                : 'border-gray-200 hover:border-gray-300'
            } ${mood.color}`}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs font-medium">{mood.label}</span>
          </Button>
        ))}
      </div>

      {/* Daily Joke Section */}
      <Card className="border-none bg-gradient-to-r from-yellow-50 to-orange-50 mb-4">
        <CardContent className="p-4 text-center">
          <h4 className="font-semibold text-orange-700 mb-2 flex items-center justify-center">
            <span className="mr-2">😄</span>
            Daily Smile Break
          </h4>
          <p className="text-sm text-gray-700 italic mb-3">"{currentJoke}"</p>
          <Button
            onClick={getNewJoke}
            variant="outline"
            size="sm"
            className="border-orange-300 text-orange-700 hover:bg-orange-50"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Another Joke
          </Button>
        </CardContent>
      </Card>

      {/* Encouragement */}
      <div className="text-center text-sm text-gray-600">
        <p>Remember: All feelings are valid. You're taking a great step by checking in with yourself! 🤗</p>
      </div>
    </DialogContent>
  );
}