import React from 'react';
import { Button } from './ui/button';
import { Home, Calendar, Users, Gamepad2, Brain, User, Shield } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'habits', label: 'Habit Tracker', icon: Calendar },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'mindmaze', label: 'MindMaze', icon: Gamepad2 },
    { id: 'ai', label: 'AI', icon: Brain },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              CalmCircle
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  onClick={() => setActiveSection(item.id)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
            
            {/* Emergency Resources Button */}
            <Button
              variant={activeSection === 'emergency' ? "secondary" : "ghost"}
              onClick={() => setActiveSection('emergency')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:scale-105 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Shield className="w-4 h-4" />
              <span>Emergency</span>
            </Button>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  className="flex flex-col items-center p-2 min-w-fit"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
            
            {/* Emergency Button for Mobile */}
            <Button
              variant={activeSection === 'emergency' ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveSection('emergency')}
              className="flex flex-col items-center p-2 min-w-fit text-red-600"
            >
              <Shield className="w-4 h-4" />
              <span className="text-xs">SOS</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}