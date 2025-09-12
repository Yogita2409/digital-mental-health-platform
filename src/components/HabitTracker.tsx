import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Calendar, Plus, CheckCircle, Circle, Target } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  category: 'wellness' | 'physical' | 'mental' | 'social';
  streak: number;
  completed: boolean;
  target: number;
  current: number;
}

const defaultHabits: Habit[] = [
  { id: '1', name: 'Morning Meditation', category: 'mental', streak: 5, completed: false, target: 10, current: 7 },
  { id: '2', name: 'Drink 8 Glasses of Water', category: 'physical', streak: 3, completed: true, target: 8, current: 8 },
  { id: '3', name: 'Gratitude Journal', category: 'wellness', streak: 12, completed: false, target: 1, current: 0 },
  { id: '4', name: 'Call a Friend', category: 'social', streak: 2, completed: false, target: 1, current: 0 },
  { id: '5', name: '30 Minutes Reading', category: 'mental', streak: 8, completed: true, target: 30, current: 30 },
];

const categoryColors = {
  wellness: 'bg-green-100 text-green-800',
  physical: 'bg-blue-100 text-blue-800',
  mental: 'bg-purple-100 text-purple-800',
  social: 'bg-orange-100 text-orange-800',
};

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [newHabitName, setNewHabitName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completed: !habit.completed,
            streak: !habit.completed ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            current: !habit.completed ? habit.target : 0
          }
        : habit
    ));
  };

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName,
        category: 'wellness',
        streak: 0,
        completed: false,
        target: 1,
        current: 0,
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setShowAddForm(false);
    }
  };

  const completedToday = habits.filter(h => h.completed).length;
  const completionRate = Math.round((completedToday / habits.length) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Habit Tracker 🌱
        </h1>
        <p className="text-xl text-gray-600">
          Build healthy habits one day at a time
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-teal-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700">{completedToday}/{habits.length}</h3>
            <p className="text-sm text-gray-600">Habits Completed Today</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-700">{completionRate}%</h3>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-purple-700">
              {Math.max(...habits.map(h => h.streak), 0)}
            </h3>
            <p className="text-sm text-gray-600">Longest Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Progress */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Today's Progress</CardTitle>
          <CardDescription>Keep up the great work! Every habit counts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Daily Completion</span>
              <span className="text-sm text-gray-600">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Habits List */}
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Your Habits</CardTitle>
            <CardDescription>Click to mark as complete</CardDescription>
          </div>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Habit
          </Button>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter new habit..."
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHabit()}
                />
                <Button onClick={addHabit}>Add</Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                  habit.completed
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {habit.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                    <div>
                      <h3 className={`font-medium ${habit.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {habit.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className={categoryColors[habit.category]}>
                          {habit.category}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          🔥 {habit.streak} day streak
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {habit.current}/{habit.target} {habit.target > 1 ? 'units' : 'time'}
                    </div>
                    {habit.target > 1 && (
                      <Progress 
                        value={(habit.current / habit.target) * 100} 
                        className="w-20 h-2 mt-1"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Message */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-orange-700 mb-2">
            🌟 You're doing amazing!
          </h3>
          <p className="text-gray-600">
            {completionRate >= 80 
              ? "Fantastic! You're crushing your goals today! 🎉"
              : completionRate >= 50
              ? "Great progress! Keep building those healthy habits! 💪"
              : "Every step counts! You're on the right path! 🌱"
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
}