import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, Settings, Trophy, Calendar, Heart, Target, TrendingUp, Edit2 } from 'lucide-react';

interface UserStats {
  moodEntries: number;
  streakDays: number;
  gamesCompleted: number;
  journalEntries: number;
  habitsCompleted: number;
  communityPosts: number;
}

interface UserSettings {
  dailyMoodReminders: boolean;
  habitReminders: boolean;
  communityUpdates: boolean;
  anonymousMode: boolean;
  dataSharing: boolean;
}

const achievementTemplates = [
  { id: 1, name: 'First Steps', description: 'Completed your first mood check-in', icon: '🌱', requirement: 'mood', threshold: 1 },
  { id: 2, name: 'Mindful Week', description: '7 days of consistent mood tracking', icon: '🧘', requirement: 'mood', threshold: 7 },
  { id: 3, name: 'Community Helper', description: 'Made 5 supportive posts', icon: '🤝', requirement: 'posts', threshold: 5 },
  { id: 4, name: 'Game Master', description: 'Completed 10 MindMaze games', icon: '🎮', requirement: 'games', threshold: 10 },
  { id: 5, name: 'Habit Builder', description: '30 days of habit tracking', icon: '🏗️', requirement: 'habits', threshold: 30 },
  { id: 6, name: 'Journal Keeper', description: 'Written 20 journal entries', icon: '📖', requirement: 'journal', threshold: 20 },
];

const moodTrends = [
  { date: '2024-01-01', mood: 'happy', score: 8 },
  { date: '2024-01-02', mood: 'calm', score: 7 },
  { date: '2024-01-03', mood: 'anxious', score: 4 },
  { date: '2024-01-04', mood: 'happy', score: 8 },
  { date: '2024-01-05', mood: 'calm', score: 7 },
  { date: '2024-01-06', mood: 'happy', score: 9 },
  { date: '2024-01-07', mood: 'calm', score: 8 },
];

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Load profile data from localStorage
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('calmcircle_user_name') || 'Alex Johnson';
  });
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('calmcircle_user_email') || 'alex.johnson@university.edu';
  });
  const [userBio, setUserBio] = useState(() => {
    return localStorage.getItem('calmcircle_user_bio') || 'Psychology major passionate about mental health awareness 🧠💚';
  });

  // Load settings from localStorage
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('calmcircle_user_settings');
    return saved ? JSON.parse(saved) : {
      dailyMoodReminders: true,
      habitReminders: true,
      communityUpdates: false,
      anonymousMode: true,
      dataSharing: false,
    };
  });

  // Calculate stats from actual app data
  const [userStats, setUserStats] = useState<UserStats>({
    moodEntries: 0,
    streakDays: 0,
    gamesCompleted: 0,
    journalEntries: 0,
    habitsCompleted: 0,
    communityPosts: 0,
  });

  // Calculate achievements based on actual stats
  const [achievements, setAchievements] = useState(() => {
    return achievementTemplates.map(template => ({
      ...template,
      unlocked: false
    }));
  });

  // Update stats from localStorage data
  useEffect(() => {
    const updateStats = () => {
      // Get journal entries
      const journalData = localStorage.getItem('calmcircle_journal_entries');
      const journalEntries = journalData ? JSON.parse(journalData).length : 0;

      // Get community posts
      const communityData = localStorage.getItem('calmcircle_community_posts');
      const communityPosts = communityData ? JSON.parse(communityData).filter((post: any) => post.author === 'You').length : 0;

      // Get mood entries (from mood tracker)
      const moodEntries = Object.keys(localStorage).filter(key => key.startsWith('mood_')).length;

      // Get habits (placeholder - would come from habit tracker)
      const habitsCompleted = parseInt(localStorage.getItem('calmcircle_habits_completed') || '0');

      // Get games completed (placeholder - would come from MindMaze)
      const gamesCompleted = parseInt(localStorage.getItem('calmcircle_games_completed') || '0');

      // Calculate streak (placeholder - would be calculated from mood entries)
      const streakDays = parseInt(localStorage.getItem('calmcircle_mood_streak') || '0');

      const newStats = {
        moodEntries,
        streakDays,
        gamesCompleted,
        journalEntries,
        habitsCompleted,
        communityPosts,
      };

      setUserStats(newStats);

      // Update achievements based on stats
      const updatedAchievements = achievementTemplates.map(template => {
        let unlocked = false;
        switch (template.requirement) {
          case 'mood':
            unlocked = newStats.moodEntries >= template.threshold;
            break;
          case 'posts':
            unlocked = newStats.communityPosts >= template.threshold;
            break;
          case 'games':
            unlocked = newStats.gamesCompleted >= template.threshold;
            break;
          case 'habits':
            unlocked = newStats.habitsCompleted >= template.threshold;
            break;
          case 'journal':
            unlocked = newStats.journalEntries >= template.threshold;
            break;
        }
        return { ...template, unlocked };
      });

      setAchievements(updatedAchievements);
    };

    updateStats();
    
    // Listen for storage changes to update stats in real-time
    const handleStorageChange = () => updateStats();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save profile data to localStorage
  useEffect(() => {
    localStorage.setItem('calmcircle_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('calmcircle_user_email', userEmail);
  }, [userEmail]);

  useEffect(() => {
    localStorage.setItem('calmcircle_user_bio', userBio);
  }, [userBio]);

  useEffect(() => {
    localStorage.setItem('calmcircle_user_settings', JSON.stringify(settings));
  }, [settings]);

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const updateSetting = (key: keyof UserSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const averageMoodScore = moodTrends.reduce((sum, trend) => sum + trend.score, 0) / moodTrends.length;
  const totalActivities = userStats.moodEntries + userStats.gamesCompleted + userStats.journalEntries + userStats.habitsCompleted;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Wellness Profile 👤
        </h1>
        <p className="text-xl text-gray-600">
          Track your mental health journey and celebrate your progress
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Data Persistence Indicator */}
          {(userStats.journalEntries > 0 || userStats.communityPosts > 0 || userStats.moodEntries > 0) && (
            <div className="text-center py-2">
              <p className="text-sm text-indigo-600 bg-indigo-50 rounded-lg py-2 px-4 inline-flex items-center gap-2">
                💾 Profile data loaded from your saved activities
              </p>
            </div>
          )}

          {/* Profile Card */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-400 text-white text-2xl">
                    AJ
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                      <Input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                      <Input value={userBio} onChange={(e) => setUserBio(e.target.value)} />
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveProfile}>Save</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        💾 Your profile changes are automatically saved
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold">{userName}</h2>
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <p className="text-gray-600 mb-2">{userEmail}</p>
                      <p className="text-gray-700">{userBio}</p>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <Badge className="bg-green-100 text-green-800">
                          🔥 {userStats.streakDays} day streak
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800">
                          Member since Jan 2024
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-700">{userStats.moodEntries}</h3>
                <p className="text-sm text-gray-600">Mood Check-ins</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-teal-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-700">{userStats.habitsCompleted}</h3>
                <p className="text-sm text-gray-600">Habits Completed</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Trophy className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-purple-700">{userStats.gamesCompleted}</h3>
                <p className="text-sm text-gray-600">Games Completed</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <User className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-700">{userStats.communityPosts}</h3>
                <p className="text-sm text-gray-600">Community Posts</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest wellness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Mood check-in completed</p>
                    <p className="text-sm text-gray-500">Feeling calm and focused • 2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Morning meditation completed</p>
                    <p className="text-sm text-gray-500">10 minutes of mindfulness • 6 hours ago</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Completed Box Breathing game</p>
                    <p className="text-sm text-gray-500">Stress relief session • Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Your Achievements</span>
              </CardTitle>
              <CardDescription>
                Celebrate your mental health milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`border transition-all ${
                      achievement.unlocked 
                        ? 'border-yellow-200 bg-yellow-50 shadow-md' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h3 className={`font-semibold ${
                            achievement.unlocked ? 'text-yellow-800' : 'text-gray-600'
                          }`}>
                            {achievement.name}
                          </h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                          {achievement.unlocked && (
                            <Badge className="mt-2 bg-yellow-100 text-yellow-800">
                              ✓ Unlocked
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress to Next Achievement */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Next Achievement</CardTitle>
              <CardDescription>You're getting closer!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">🎮 Game Master</span>
                    <span className="text-sm text-gray-600">{userStats.gamesCompleted}/10</span>
                  </div>
                  <Progress value={(userStats.gamesCompleted / 10) * 100} className="h-3" />
                  <p className="text-sm text-gray-600 mt-1">2 more games to unlock!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mood Trends */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Mood Trends</span>
                </CardTitle>
                <CardDescription>Your emotional patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-green-600">
                    {averageMoodScore.toFixed(1)}/10
                  </h3>
                  <p className="text-sm text-gray-600">Average mood score this week</p>
                </div>
                
                <div className="space-y-2">
                  {moodTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {new Date(trend.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="capitalize text-sm">{trend.mood}</span>
                        <div className="w-20">
                          <Progress value={trend.score * 10} className="h-2" />
                        </div>
                        <span className="text-sm font-medium">{trend.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Summary */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>Your wellness engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold text-blue-600">{totalActivities}</h3>
                  <p className="text-sm text-gray-600">Total wellness activities</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Journal Entries</span>
                      <span className="text-sm font-medium">{userStats.journalEntries}</span>
                    </div>
                    <Progress value={(userStats.journalEntries / 20) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Habits Completed</span>
                      <span className="text-sm font-medium">{userStats.habitsCompleted}</span>
                    </div>
                    <Progress value={(userStats.habitsCompleted / 100) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Community Engagement</span>
                      <span className="text-sm font-medium">{userStats.communityPosts}</span>
                    </div>
                    <Progress value={(userStats.communityPosts / 10) * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Goals */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
              <CardDescription>Stay on track with your wellness objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Daily mood check-ins</h4>
                    <p className="text-sm text-gray-600">Track your emotional state daily</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">5/7</div>
                    <div className="text-xs text-gray-500">days completed</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Mindfulness activities</h4>
                    <p className="text-sm text-gray-600">Practice mindfulness 3 times this week</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">2/3</div>
                    <div className="text-xs text-gray-500">sessions completed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-gray-500" />
                <span>Account Settings</span>
              </CardTitle>
              <CardDescription>Manage your account and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-2 mb-4">
                <p className="text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4 inline-flex items-center gap-2">
                  ⚙️ Settings are automatically saved when changed
                </p>
              </div>
              
              {/* Notifications */}
              <div>
                <h3 className="font-semibold mb-3">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Daily mood reminders</p>
                      <p className="text-sm text-gray-600">Get reminded to track your mood</p>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={settings.dailyMoodReminders}
                      onChange={(e) => updateSetting('dailyMoodReminders', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Habit tracking reminders</p>
                      <p className="text-sm text-gray-600">Stay on track with your habits</p>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={settings.habitReminders}
                      onChange={(e) => updateSetting('habitReminders', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Community updates</p>
                      <p className="text-sm text-gray-600">New posts and interactions</p>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={settings.communityUpdates}
                      onChange={(e) => updateSetting('communityUpdates', e.target.checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy */}
              <div>
                <h3 className="font-semibold mb-3">Privacy</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Anonymous mode</p>
                      <p className="text-sm text-gray-600">Hide your identity in community posts</p>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={settings.anonymousMode}
                      onChange={(e) => updateSetting('anonymousMode', e.target.checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data sharing</p>
                      <p className="text-sm text-gray-600">Share anonymized data for research</p>
                    </div>
                    <input 
                      type="checkbox" 
                      className="toggle" 
                      checked={settings.dataSharing}
                      onChange={(e) => updateSetting('dataSharing', e.target.checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div>
                <h3 className="font-semibold mb-3">Account</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Export my data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Change password
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Delete account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}