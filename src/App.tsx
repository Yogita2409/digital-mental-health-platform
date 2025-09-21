import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { MoodTracker } from './components/MoodTracker';
import { HabitTracker } from './components/HabitTracker';
import { Community } from './components/Community';
import { MindMaze } from './components/MindMaze';
import { AISection, globalEmergencyStopAudio } from './components/AISection';
import { Profile } from './components/Profile';
import { EmergencyResources } from './components/EmergencyResources';
import { Dialog } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { MoodTrackerModal } from './components/MoodTrackerModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [aiInitialTab, setAiInitialTab] = useState('chatbot');

  // IMMEDIATE AUDIO KILLER - runs on app load
  useEffect(() => {
    const immediateAudioKiller = () => {
      console.log('🛑 Running immediate audio killer...');
      
      // Kill all audio elements aggressively
      const audioElements = document.querySelectorAll('audio');
      console.log(`Found ${audioElements.length} audio elements to kill`);
      audioElements.forEach((audio, index) => {
        try {
          console.log(`Stopping audio element ${index + 1}`);
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0;
          audio.muted = true;
          audio.loop = false;
          audio.autoplay = false;
          audio.src = '';
          audio.load(); // Force reload to clear buffer
          audio.remove(); // Remove from DOM
        } catch (e) {
          console.log(`Error stopping audio element ${index + 1}:`, e);
        }
      });
      
      // Kill audio sources
      const sources = document.querySelectorAll('source[type*="audio"]');
      sources.forEach(source => source.remove());
      
      // Kill any blob URLs that might be audio
      try {
        // Clear any object URLs that might be audio
        performance.getEntriesByType('resource').forEach(resource => {
          if (resource.name.includes('blob:') && resource.initiatorType === 'audio') {
            URL.revokeObjectURL(resource.name);
          }
        });
      } catch (e) {
        console.log('Error cleaning blob URLs:', e);
      }
      
      // Try global emergency stop
      try {
        globalEmergencyStopAudio();
      } catch (e) {
        console.log('Global emergency stop error:', e);
      }
      
      console.log('🛑 IMMEDIATE AUDIO KILLER COMPLETE');
    };

    // Run immediately when component mounts
    immediateAudioKiller();
    
    // Run again after a very short delay
    setTimeout(immediateAudioKiller, 100);
    
    // Run every 2 seconds for the first 12 seconds to catch any delayed audio
    let killCount = 0;
    const killer = setInterval(() => {
      immediateAudioKiller();
      killCount++;
      if (killCount >= 6) {
        clearInterval(killer);
        console.log('🛑 Stopping aggressive audio monitoring');
      }
    }, 2000);

    return () => {
      clearInterval(killer);
      immediateAudioKiller(); // One final kill on unmount
    };
  }, []);

  // Stop audio when navigating away from AI section
  const handleSectionChange = (newSection: string) => {
    // ALWAYS stop audio when changing sections
    globalEmergencyStopAudio();
    
    // Kill all audio elements on page
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
      audio.remove();
    });
    
    setActiveSection(newSection);
  };

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
        return <HomePage setActiveSection={handleSectionChange} setAiInitialTab={setAiInitialTab} />;
      case 'mood':
        return <MoodTracker setActiveSection={handleSectionChange} />;
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
        return <EmergencyResources setActiveSection={handleSectionChange} />;
      default:
        return <HomePage setActiveSection={handleSectionChange} setAiInitialTab={setAiInitialTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/50 relative">
      <Navigation activeSection={activeSection} setActiveSection={handleSectionChange} />
      <main className="pt-20 relative z-10">
        {renderActiveSection()}
      </main>
      
      {/* FLOATING EMERGENCY STOP BUTTON - Always visible */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={() => {
            console.log('🛑 FLOATING EMERGENCY STOP CLICKED');
            globalEmergencyStopAudio();
            
            // Additional aggressive cleanup
            const audioElements = document.querySelectorAll('audio');
            audioElements.forEach(audio => {
              try {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 0;
                audio.muted = true;
                audio.remove();
              } catch (e) {
                console.log('Error in floating stop:', e);
              }
            });
          }}
          className="bg-red-600 hover:bg-red-700 text-white shadow-2xl border-2 border-white text-sm px-4 py-2 rounded-full"
          size="sm"
        >
          🛑 STOP AUDIO
        </Button>
      </div>
      
      {/* Mood Tracker Popup */}
      <Dialog open={showMoodTracker} onOpenChange={setShowMoodTracker}>
        <MoodTrackerModal />
      </Dialog>
    </div>
  );
}