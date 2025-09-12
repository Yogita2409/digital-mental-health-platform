import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { MoodTracker } from './components/MoodTracker';
import { HabitTracker } from './components/HabitTracker';
import { Community } from './components/Community';
import { MindMaze } from './components/MindMaze';
import { AISection } from './components/AISection';
import { Profile } from './components/Profile';
import { EmergencyResources } from './components/EmergencyResources';
import { Dialog } from './components/ui/dialog';
import { MoodTrackerModal } from './components/MoodTrackerModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [aiInitialTab, setAiInitialTab] = useState('chatbot');

  useEffect(() => {
    // Show mood tracker popup immediately on app load
    const timer = setTimeout(() => {
      const today = new Date().toDateString();
      const hasTrackedToday = localStorage.getItem(`mood_${today}`);
      
      if (!hasTrackedToday) {
        setShowMoodTracker(true);
      }
    }, 1000); // Small delay to let the app load smoothly

    return () => clearTimeout(timer);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage setActiveSection={setActiveSection} setAiInitialTab={setAiInitialTab} />;
      case 'mood':
        return <MoodTracker setActiveSection={setActiveSection} />;
      case 'habits':
        return <HabitTracker />;
      case 'community':
        return <Community />;
      case 'mindmaze':
        return <MindMaze />;
      case 'ai':
        return <AISection initialTab={aiInitialTab} />;
      case 'profile':
        return <Profile />;
      case 'emergency':
        return <EmergencyResources setActiveSection={setActiveSection} />;
      default:
        return <HomePage setActiveSection={setActiveSection} setAiInitialTab={setAiInitialTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/50 relative">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-20 relative z-10">
        {renderActiveSection()}
      </main>
      
      {/* Mood Tracker Popup */}
      <Dialog open={showMoodTracker} onOpenChange={setShowMoodTracker}>
        <MoodTrackerModal />
      </Dialog>
    </div>
  );
}