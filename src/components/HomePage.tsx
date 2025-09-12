import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Heart, Brain, Users, Calendar, Gamepad2, Music, ArrowRight, Sparkles, Play, Shield, Award, Clock, MessageCircle } from 'lucide-react';

const quickStats = [
  { 
    icon: Heart, 
    label: "Mood Tracking", 
    description: "Track your emotional journey",
    section: "mood"
  },
  { 
    icon: Brain, 
    label: "AI Insights", 
    description: "Personalized guidance & support",
    section: "ai"
  },
  { 
    icon: Users, 
    label: "24/7 Support", 
    description: "Always here when you need us",
    section: "community"
  }
];

const features = [
  {
    icon: Brain,
    title: "AI Companion",
    description: "Get instant support from our compassionate AI trained in mental wellness",
    action: "Chat Now",
    gradient: "from-purple-400 to-pink-400"
  },
  {
    icon: Calendar,
    title: "Habit Tracker",
    description: "Build sustainable wellness habits with gentle daily guidance",
    action: "Start Tracking",
    gradient: "from-blue-400 to-teal-400"
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with others who understand your journey",
    action: "Join Community",
    gradient: "from-pink-400 to-rose-400"
  },
  {
    icon: Gamepad2,
    title: "MindMaze",
    description: "Stress-relief games and mindfulness exercises",
    action: "Play Games",
    gradient: "from-indigo-400 to-purple-400"
  },
  {
    icon: Music,
    title: "Music Therapy",
    description: "Curated playlists designed to support your emotional state",
    action: "Listen Now",
    gradient: "from-teal-400 to-cyan-400"
  }
];

export function HomePage({ setActiveSection, setAiInitialTab }: { setActiveSection: (section: string) => void; setAiInitialTab?: (tab: string) => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFeatureClick = (index: number) => {
    const sections = ['ai', 'habits', 'community', 'mindmaze', 'ai']; 
    
    if (index === 4 && setAiInitialTab) {
      // Music Therapy - set the initial tab to music before navigating to AI section
      setAiInitialTab('music');
      setActiveSection('ai');
    } else {
      // For other features, reset to default tab
      if (setAiInitialTab) setAiInitialTab('chatbot');
      setActiveSection(sections[index]);
    }
  };

  const handleQuickStatClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-sky-50 to-purple-50 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-30">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-sky-200 to-purple-200 rounded-full blur-lg"></div>
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-40 w-20 h-20 bg-gradient-to-br from-purple-200 to-sky-200 rounded-full blur-lg"></div>
        <div className="absolute top-60 left-1/3 w-16 h-16 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-md"></div>
        <div className="absolute top-80 right-1/3 w-36 h-36 bg-gradient-to-br from-sky-200 to-purple-200 rounded-full blur-2xl"></div>
        
        {/* Gentle Waves */}
        <svg className="absolute bottom-0 left-0 w-full h-64" viewBox="0 0 1200 320" fill="none">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(244, 244, 255, 0.4)"/>
          <path d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,213.3C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(253, 242, 248, 0.5)"/>
        </svg>
        
        {/* Subtle Geometric Patterns */}
        <div className="absolute top-32 right-10 w-4 h-4 bg-purple-200 rotate-45 blur-sm"></div>
        <div className="absolute top-96 left-40 w-3 h-3 bg-pink-200 rotate-45 blur-sm"></div>
        <div className="absolute bottom-60 right-20 w-5 h-5 bg-sky-200 rotate-45 blur-sm"></div>
        <div className="absolute top-1/2 left-10 w-2 h-2 bg-rose-200 rotate-45 blur-sm"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        {/* Hero Section */}
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-800">CalmCircle</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 leading-tight">
            Your Journey to <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">Mental Wellness</span> Starts Here
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            CalmCircle combines advanced mood tracking with a supportive community to help 
            you understand, manage, and enhance your emotional well-being.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button 
              size="lg" 
              onClick={() => setActiveSection('mood')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowLearnMore(true)}
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  onClick={() => handleQuickStatClick(stat.section)}
                  className={`flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 delay-${index * 100} cursor-pointer hover:shadow-xl hover:scale-105 hover:bg-gray-50`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{stat.label}</p>
                    <p className="text-sm text-gray-600">{stat.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to support your journey toward better mental health
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer bg-white overflow-hidden"
                  onClick={() => handleFeatureClick(index)}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <Button 
                      variant="ghost" 
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 h-auto font-semibold group-hover:translate-x-1 transition-transform duration-300"
                    >
                      {feature.action}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Emergency Support - Minimal */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="border-0 shadow-xl bg-gradient-to-r from-red-50 to-pink-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-red-800 mb-3">Need Immediate Support?</h3>
              <p className="text-red-700 mb-6 max-w-xl mx-auto">
                If you're in crisis, help is available 24/7. You are never alone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveSection('emergency')}
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  Emergency Resources
                </Button>
                <Button 
                  onClick={() => setActiveSection('ai')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Talk to AI Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Learn More Modal */}
      <Dialog open={showLearnMore} onOpenChange={setShowLearnMore}>
        <DialogContent className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl text-purple-700 flex items-center justify-center gap-3">
              <Heart className="w-8 h-8" />
              About CalmCircle
            </DialogTitle>
            <DialogDescription className="text-center text-lg text-purple-600 mt-2">
              Your comprehensive mental wellness companion for students
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-8 p-6">
            {/* Mission Statement */}
            <div className="text-center bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                CalmCircle is dedicated to supporting students in higher education by providing accessible, 
                stigma-free mental health resources. We combine cutting-edge AI technology with evidence-based 
                wellness practices to create a safe space for emotional growth and healing.
              </p>
            </div>

            {/* Key Features Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">AI-Powered Support</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Our advanced AI companion provides 24/7 emotional support with therapeutic responses, 
                  emotion detection, and personalized guidance tailored to your needs.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">Smart Mood Tracking</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Track your emotional journey with our intelligent mood tracking system that provides 
                  insights and patterns to help you understand your mental health better.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">Anonymous Community</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Connect with fellow students in a safe, anonymous environment where you can share 
                  experiences, support each other, and know you're not alone.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-pink-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">Stress-Relief Games</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Engage with our MindMaze collection of therapeutic games including meditation exercises, 
                  zen gardens, pattern drawing, and mindfulness activities.
                </p>
              </div>
            </div>

            {/* Why Choose CalmCircle */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Why Choose CalmCircle?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">100% Private & Secure</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">24/7 Availability</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Evidence-Based Approaches</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">Student-Focused Design</span>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ready to Start Your Wellness Journey?</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of students who are already improving their mental health with CalmCircle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setShowLearnMore(false);
                    setActiveSection('mood');
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full"
                >
                  Track Your Mood
                </Button>
                <Button 
                  onClick={() => {
                    setShowLearnMore(false);
                    setActiveSection('ai');
                  }}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-full"
                >
                  Chat with AI
                </Button>
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <h4 className="text-lg font-semibold text-red-800 mb-2">Important Note</h4>
              <p className="text-red-700 text-sm">
                CalmCircle is designed to complement, not replace, professional mental health care. 
                If you're experiencing a mental health crisis, please reach out to a mental health 
                professional or emergency services immediately.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}