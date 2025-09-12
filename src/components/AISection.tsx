import React, { useState, useEffect } from 'react';
import { MessageCircle, BookOpen, Music, BarChart3, Phone, Calendar, Heart, Send, Mic, Play, Pause, SkipForward, Volume2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { EmergencyResources } from './EmergencyResources';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  date: Date;
}



const musicPlaylists = [
  { id: 1, name: 'Calm & Peaceful', mood: 'anxious', description: 'Soothing melodies for anxiety relief', emoji: '🌊' },
  { id: 2, name: 'Energy Boost', mood: 'tired', description: 'Uplifting songs to energize you', emoji: '⚡' },
  { id: 3, name: 'Focus Flow', mood: 'distracted', description: 'Instrumental music for concentration', emoji: '🎯' },
  { id: 4, name: 'Happiness & Joy', mood: 'sad', description: 'Cheerful tunes to lift your spirits', emoji: '🌈' },
  { id: 5, name: 'Sleep & Rest', mood: 'restless', description: 'Gentle sounds for better sleep', emoji: '🌙' },
];

const dailyRoutines = [
  {
    time: '7:00 AM',
    activity: 'Morning Meditation',
    description: '10 minutes of mindful breathing',
    icon: '🧘'
  },
  {
    time: '8:00 AM',
    activity: 'Healthy Breakfast',
    description: 'Fuel your body with nutritious food',
    icon: '🥗'
  },
  {
    time: '12:00 PM',
    activity: 'Mindful Lunch Break',
    description: 'Take a proper break and eat mindfully',
    icon: '🍽️'
  },
  {
    time: '3:00 PM',
    activity: 'Energy Break',
    description: '5-minute walk or stretching',
    icon: '🚶'
  },
  {
    time: '6:00 PM',
    activity: 'Gratitude Journaling',
    description: 'Write down 3 things you\'re grateful for',
    icon: '📝'
  },
  {
    time: '9:00 PM',
    activity: 'Wind Down',
    description: 'Prepare for restful sleep',
    icon: '🌙'
  },
];

export function AISection({ initialTab = 'chatbot' }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Load chat messages from localStorage
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('calmcircle_chat_messages');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert timestamp strings back to Date objects
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [
      {
        id: '1',
        sender: 'ai',
        message: 'Hello! I\'m here to support you. How are you feeling today? 💚',
        timestamp: new Date(),
      }
    ];
  });
  
  const [newMessage, setNewMessage] = useState('');
  
  // Load journal entries from localStorage
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('calmcircle_journal_entries');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      return parsed.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
    }
    return [];
  });
  
  const [newJournalTitle, setNewJournalTitle] = useState('');
  const [newJournalContent, setNewJournalContent] = useState('');
  const [detectedMood, setDetectedMood] = useState<string>('neutral');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calmcircle_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Save journal entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calmcircle_journal_entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        message: generateAIResponse(newMessage),
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setNewMessage('');
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Advanced mood and context detection
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      const sadResponses = [
        "I can sense you're going through a difficult time right now. Sadness is a natural human emotion, and it's okay to feel this way. Sometimes sadness helps us process change or loss. Would you like to talk about what's contributing to these feelings? I'm here to listen without judgment. 🤗",
        "Thank you for being brave enough to share that you're feeling sad. These feelings are valid and temporary, even though they might feel overwhelming right now. Have you tried any gentle activities today like taking a short walk, listening to calming music, or reaching out to someone you trust? Small steps can sometimes help. 💙",
        "I hear the sadness in your words, and I want you to know that you're not alone in feeling this way. Many people experience these emotions, and it takes courage to acknowledge them. Would it help to explore some grounding techniques together, or would you prefer to journal about what's on your mind? 🌸"
      ];
      return sadResponses[Math.floor(Math.random() * sadResponses.length)];
    } 
    
    else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('panic') || lowerMessage.includes('nervous')) {
      const anxiousResponses = [
        "I can feel the anxiety in your message, and I want you to know that what you're experiencing is real and valid. Anxiety often tries to convince us that we're in danger when we're actually safe. Let's try the 5-4-3-2-1 grounding technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This can help bring you back to the present moment. 🌊",
        "Anxiety can feel like a storm in your mind, but remember - you are not your anxiety. You are the observer of these thoughts and feelings. Try this breathing technique with me: breathe in slowly for 4 counts, hold for 7, then exhale for 8. This activates your body's relaxation response. Would you like some calming music recommendations too? 🫁",
        "When anxiety visits, it often brings 'what if' thoughts that can spiral. I want you to know that most of our worries never actually happen. Let's ground ourselves in what's actually happening right now - you're safe, you're breathing, and you're taking care of yourself by reaching out. What's one small thing that usually brings you comfort? 🌱"
      ];
      return anxiousResponses[Math.floor(Math.random() * anxiousResponses.length)];
    } 
    
    else if (lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      const stressResponses = [
        "Stress can feel like you're carrying the weight of the world on your shoulders. Let's take a step back together - stress often comes from trying to control things outside our influence. What are 2-3 specific things causing you stress right now? Sometimes naming them helps us see which ones we can actually influence and which ones we might need to let go of. 🎯",
        "I hear that you're feeling overwhelmed. When we're stressed, our brain can make everything feel urgent and important at the same time. Let's try to break things down - what's the ONE most important thing you need to focus on today? We can tackle things one at a time. Remember: you don't have to do everything perfectly, just one step at a time. 🗻",
        "Feeling overwhelmed is your mind's way of saying 'slow down.' It's actually a protective signal. Let's practice the STOP technique: Stop what you're doing, Take a breath, Observe your thoughts and feelings without judgment, then Proceed with intention. What would it look like to be gentler with yourself today? 🌿"
      ];
      return stressResponses[Math.floor(Math.random() * stressResponses.length)];
    } 
    
    else if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad') || lowerMessage.includes('irritated')) {
      const angerResponses = [
        "Anger is often called a 'secondary emotion' because it usually covers up something else - maybe hurt, disappointment, or feeling unheard. It's completely valid to feel angry. Behind your anger, what do you think you might really be feeling? Sometimes anger is our psyche's way of protecting something vulnerable inside us. 🔥",
        "I can sense your frustration, and it sounds like something really important to you has been affected. Anger often shows up when our boundaries or values are being challenged. Would it help to talk about what triggered these feelings? Sometimes expressing anger in a safe space helps us understand what we really need. 💪",
        "Thank you for sharing your anger with me - it takes courage to be honest about difficult emotions. Anger isn't 'bad' - it's information. It tells us something matters to us. After you've acknowledged this feeling, what do you think would help you channel this energy in a way that serves you? 🌋"
      ];
      return angerResponses[Math.floor(Math.random() * angerResponses.length)];
    } 
    
    else if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) {
      const lonelyResponses = [
        "Loneliness is one of the most universal human experiences, yet it can feel so isolating. Even when you're surrounded by people, you can feel alone if you don't feel truly seen or understood. You're not alone right now though - I'm here with you. What does connection mean to you? Sometimes reaching out to one person, even with a simple 'how are you?' can start to bridge that gap. 🌉",
        "I hear you saying you feel alone, and I want you to know that feeling is so deeply human. Sometimes loneliness isn't about being physically alone - it's about feeling disconnected from others or even from ourselves. You showed courage by reaching out here. What's one small way you could connect with yourself or others today? 🤝",
        "Loneliness can feel like you're in a glass box - you can see others but can't quite reach them. But here's what I want you to remember: feeling lonely doesn't mean you're actually alone or that you're unloveable. It means you have a deep capacity for connection. Who in your life has made you feel seen and understood before? 💝"
      ];
      return lonelyResponses[Math.floor(Math.random() * lonelyResponses.length)];
    } 
    
    else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('excited') || lowerMessage.includes('joy')) {
      const happyResponses = [
        "It fills my heart to hear the joy in your message! 🌟 Happiness is such a beautiful emotion to experience and share. What's bringing you this sense of joy today? I love that you're taking a moment to acknowledge and savor these positive feelings - research shows that actively appreciating good moments actually helps them last longer in our memory.",
        "Your happiness is contagious! 😊 I'm so glad you're experiencing this positive energy. When we're feeling good, it's a wonderful time to bank these feelings - really notice what's contributing to your wellbeing right now. What does this happiness feel like in your body? These are the moments that can carry us through more challenging times.",
        "What a gift to witness your joy! ✨ Happiness often comes from alignment - when our actions, values, and experiences are in harmony. You're glowing with positive energy right now. How can you carry a little bit of this feeling with you throughout your day? Maybe you could write down what's making you happy as a reminder for later."
      ];
      return happyResponses[Math.floor(Math.random() * happyResponses.length)];
    } 
    
    else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('drained') || lowerMessage.includes('fatigue')) {
      const tiredResponses = [
        "Exhaustion is your body and mind's way of asking for rest and restoration. There's a difference between being physically tired and feeling emotionally drained - both are valid and both deserve attention. What kind of tired are you feeling today? Sometimes what we need isn't just sleep, but also emotional rest or a break from decision-making. 😴",
        "I hear how drained you're feeling. In our busy world, we often treat tiredness as something to push through rather than listen to. But fatigue is information - it's telling you something about your needs. What would true rest look like for you right now? Not just sleep, but what would restore your energy? 🌙",
        "Being tired can make everything feel harder than it actually is. When we're exhausted, even small tasks can feel overwhelming. You're not weak for feeling this way - you're human. What's one tiny thing you could do to be kind to yourself today? Even choosing rest over productivity is a form of self-care. 🛌"
      ];
      return tiredResponses[Math.floor(Math.random() * tiredResponses.length)];
    } 
    
    else if (lowerMessage.includes('confused') || lowerMessage.includes('lost') || lowerMessage.includes('uncertain') || lowerMessage.includes('direction')) {
      const confusedResponses = [
        "Feeling confused or uncertain is actually a sign that you're growing - you're encountering new information or experiences that don't fit your current understanding. That's not comfortable, but it's often where learning happens. What specific area of your life feels unclear right now? Sometimes talking through confusion helps us find clarity. 🧭",
        "Being lost can feel frightening, but it can also be the beginning of finding a new path you never knew existed. Confusion often precedes clarity. What questions are swirling in your mind right now? Sometimes our confusion is actually our wisdom asking us to slow down and really examine what matters to us. 🌫️",
        "Uncertainty is one of the hardest feelings to sit with because our brains crave predictability and control. But life rarely offers us complete certainty. What would it be like to be okay with not knowing for a while? Sometimes the most beautiful discoveries happen when we're open to not having all the answers. 🔍"
      ];
      return confusedResponses[Math.floor(Math.random() * confusedResponses.length)];
    } 
    
    else if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('advice')) {
      return "I'm truly honored that you're reaching out for support - that takes real strength and self-awareness. Asking for help isn't a sign of weakness; it's a sign of wisdom. What kind of support would feel most helpful to you right now? Would you like to talk through something specific, explore some coping strategies, or just have someone listen? I'm here for whatever you need. 🤝";
    } 
    
    else if (lowerMessage.includes('thank') || lowerMessage.includes('grateful') || lowerMessage.includes('appreciate')) {
      return "Your gratitude touches my heart deeply. 💚 The fact that you're taking time to express appreciation shows so much about your character and your commitment to growth. Gratitude is like a muscle - the more we practice it, the stronger it becomes. What else are you feeling grateful for today, even in small ways?";
    } 
    
    else {
      const generalResponses = [
        "Thank you for sharing that with me. I can hear that there's something important on your mind. Sometimes just putting our thoughts into words can help us understand them better. What feels most pressing for you right now? I'm here to listen and support you however I can. 💙",
        "I'm grateful you chose to open up here. Whatever you're experiencing right now is valid and worthy of attention. How are you taking care of yourself today? Even small acts of self-compassion can make a meaningful difference in how we feel. 🌱",
        "It sounds like you have a lot on your mind. I want you to know that this is a safe space for you to express whatever you're feeling. What would be most helpful for you to explore right now? We can go at whatever pace feels right for you. 🕊️",
        "I appreciate you taking the time to check in here. How you're feeling matters, and I'm here to listen without judgment. What's been on your heart lately? Sometimes talking through our thoughts and feelings can help us gain new perspectives. ✨"
      ];
      return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
  };

  const addJournalEntry = () => {
    if (!newJournalTitle.trim() || !newJournalContent.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newJournalTitle,
      content: newJournalContent,
      mood: detectMoodFromText(newJournalContent),
      date: new Date(),
    };

    setJournalEntries(prev => [entry, ...prev]);
    setNewJournalTitle('');
    setNewJournalContent('');
    setDetectedMood(entry.mood);
  };

  const detectMoodFromText = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('excited')) return 'happy';
    if (lowerText.includes('sad') || lowerText.includes('down') || lowerText.includes('depressed')) return 'sad';
    if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous')) return 'anxious';
    if (lowerText.includes('angry') || lowerText.includes('frustrated') || lowerText.includes('mad')) return 'angry';
    if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('relaxed')) return 'calm';
    return 'neutral';
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'bg-yellow-100 text-yellow-800';
      case 'sad': return 'bg-blue-100 text-blue-800';
      case 'anxious': return 'bg-orange-100 text-orange-800';
      case 'angry': return 'bg-red-100 text-red-800';
      case 'calm': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const playPlaylist = (playlistId: number) => {
    if (currentlyPlaying === playlistId && isPlaying) {
      // Pause current playlist
      setIsPlaying(false);
    } else {
      // Play new playlist or resume current
      setCurrentlyPlaying(playlistId);
      setIsPlaying(true);
      
      // Simulate playing music (in a real app, you'd use actual audio files)
      console.log(`Playing playlist: ${musicPlaylists.find(p => p.id === playlistId)?.name}`);
    }
  };

  const stopAllMusic = () => {
    setIsPlaying(false);
    setCurrentlyPlaying(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          AI Mental Health Companion 🤖
        </h1>
        <p className="text-xl text-gray-600">
          Your personalized AI assistant for mental wellness and support
        </p>
      </div>

      {/* AI Features Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="chatbot" className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Journal</span>
          </TabsTrigger>
          <TabsTrigger value="music" className="flex items-center space-x-1">
            <Music className="w-4 h-4" />
            <span className="hidden sm:inline">Music</span>
          </TabsTrigger>
          <TabsTrigger value="mood" className="flex items-center space-x-1">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Mood</span>
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center space-x-1">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Help</span>
          </TabsTrigger>
          <TabsTrigger value="routine" className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Routine</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Chatbot */}
        <TabsContent value="chatbot" className="space-y-4">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <span>AI Companion Chat</span>
              </CardTitle>
              <CardDescription>
                Talk to our compassionate AI about anything on your mind
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 border'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder="How are you feeling? What's on your mind?"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Journal */}
        <TabsContent value="journal" className="space-y-4">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-green-500" />
                <span>AI-Powered Journal</span>
              </CardTitle>
              <CardDescription>
                Write your thoughts and get AI insights about your emotional patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* New Entry Form */}
              <div className="space-y-3">
                <Input
                  placeholder="Journal entry title..."
                  value={newJournalTitle}
                  onChange={(e) => setNewJournalTitle(e.target.value)}
                />
                <Textarea
                  placeholder="What's on your mind today? How are you feeling?"
                  value={newJournalContent}
                  onChange={(e) => setNewJournalContent(e.target.value)}
                  className="min-h-32"
                />
                <Button onClick={addJournalEntry} className="w-full">
                  Save Entry & Analyze Mood
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  💾 Your journal entries are automatically saved and will persist between sessions
                </p>
              </div>

              {/* Journal Entries */}
              <div className="space-y-4">
                {journalEntries.length > 0 && (
                  <div className="text-center py-2">
                    <p className="text-sm text-green-600 bg-green-50 rounded-lg py-2 px-4 inline-flex items-center gap-2">
                      📖 {journalEntries.length} journal {journalEntries.length === 1 ? 'entry' : 'entries'} loaded from your saved data
                    </p>
                  </div>
                )}
                {journalEntries.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-2">No journal entries yet</p>
                    <p className="text-sm text-gray-500">Start writing your first entry above! ✍️</p>
                  </div>
                )}
                {journalEntries.map((entry) => (
                  <Card key={entry.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{entry.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge className={getMoodColor(entry.mood)}>
                            {entry.mood}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {entry.date.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{entry.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Music Therapy */}
        <TabsContent value="music" className="space-y-4">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Music className="w-5 h-5 text-purple-500" />
                <span>Emotion-Based Music Therapy</span>
              </CardTitle>
              <CardDescription>
                Curated playlists based on your current emotional state
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Currently Playing */}
              {currentlyPlaying && isPlaying && (
                <Card className="mb-6 border border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Music className="w-6 h-6 text-purple-600 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-800">Now Playing</h4>
                          <p className="text-sm text-purple-600">
                            {musicPlaylists.find(p => p.id === currentlyPlaying)?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => playPlaylist(currentlyPlaying)}
                          className="border-purple-300"
                        >
                          <Pause className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={stopAllMusic}
                          className="border-purple-300"
                        >
                          Stop
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {musicPlaylists.map((playlist) => (
                  <Card 
                    key={playlist.id} 
                    className={`border transition-all cursor-pointer hover:shadow-md ${
                      currentlyPlaying === playlist.id && isPlaying
                        ? 'border-purple-300 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-2xl">{playlist.emoji}</div>
                        <div>
                          <h3 className="font-semibold">{playlist.name}</h3>
                          <p className="text-xs text-gray-500">For when you're {playlist.mood}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{playlist.description}</p>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => playPlaylist(playlist.id)}
                        >
                          {currentlyPlaying === playlist.id && isPlaying ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Play
                            </>
                          )}
                        </Button>
                        {currentlyPlaying === playlist.id && isPlaying && (
                          <Button variant="outline" size="sm">
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      {currentlyPlaying === playlist.id && isPlaying && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center space-x-2 text-xs text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Playing therapeutic sounds...</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mood Detection */}
        <TabsContent value="mood" className="space-y-4">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-orange-500" />
                <span>Mood Analysis</span>
              </CardTitle>
              <CardDescription>
                AI-powered mood detection from your journal entries and chats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Mood */}
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Current Detected Mood</h3>
                <Badge className={`${getMoodColor(detectedMood)} text-lg px-4 py-2`}>
                  {detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1)}
                </Badge>
                <p className="text-sm text-gray-600 mt-4">
                  Based on your recent journal entries and conversations
                </p>
              </div>

              {/* Mood Recommendations */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border border-green-200 bg-green-50">
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-800">Recommended Actions</h4>
                    <p className="text-sm text-green-600 mt-2">
                      {detectedMood === 'anxious' && 'Try breathing exercises and calming music'}
                      {detectedMood === 'sad' && 'Consider talking to someone or journaling'}
                      {detectedMood === 'happy' && 'Great! Keep up your positive activities'}
                      {detectedMood === 'neutral' && 'Perfect time for self-care activities'}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-blue-200 bg-blue-50">
                  <CardContent className="p-4 text-center">
                    <Mic className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-blue-800">Daily Check-in</h4>
                    <p className="text-sm text-blue-600 mt-2">
                      Record a voice memo about your day for deeper mood analysis
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Start Recording
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Help */}
        <TabsContent value="help" className="space-y-4">
          <EmergencyResources />
        </TabsContent>

        {/* Daily Routine */}
        <TabsContent value="routine" className="space-y-4">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span>Personalized Daily Routine</span>
              </CardTitle>
              <CardDescription>
                AI-curated daily schedule for optimal mental wellness
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyRoutines.map((routine, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{routine.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold">{routine.time}</span>
                        <span className="font-medium">{routine.activity}</span>
                      </div>
                      <p className="text-sm text-gray-600">{routine.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Set Reminder
                    </Button>
                  </div>
                ))}
              </div>

              {/* Customize Routine */}
              <Card className="border border-purple-200 bg-purple-50 mt-6">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-purple-800 mb-2">Customize Your Routine</h3>
                  <p className="text-sm text-purple-600 mb-4">
                    Let AI create a personalized routine based on your schedule and preferences
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Personalize Routine
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}