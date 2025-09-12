import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Heart, MessageCircle, Share, Plus, Users, Sparkles } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  category: 'motivation' | 'achievement' | 'support' | 'gratitude' | 'tip';
  likes: number;
  comments: number;
  timeAgo: string;
  liked: boolean;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: 'Sarah M.',
    avatar: 'SM',
    content: "Just finished my first week of meditation! 🧘‍♀️ It's amazing how 10 minutes a day can make such a difference. To anyone thinking about starting - you got this! Small steps lead to big changes. 💚",
    category: 'achievement',
    likes: 24,
    comments: 8,
    timeAgo: '2 hours ago',
    liked: false,
  },
  {
    id: '2',
    author: 'Alex K.',
    avatar: 'AK',
    content: "Feeling overwhelmed with finals coming up. But I remembered what my therapist said - 'You can't pour from an empty cup.' Taking breaks isn't lazy, it's necessary. Sending love to everyone going through tough times. 🤗",
    category: 'support',
    likes: 31,
    comments: 12,
    timeAgo: '4 hours ago',
    liked: true,
  },
  {
    id: '3',
    author: 'Jamie L.',
    avatar: 'JL',
    content: "Gratitude post: I'm thankful for my morning coffee, supportive friends, and this amazing community that reminds me I'm not alone. What are you grateful for today? ☕️✨",
    category: 'gratitude',
    likes: 18,
    comments: 15,
    timeAgo: '6 hours ago',
    liked: false,
  },
  {
    id: '4',
    author: 'Morgan R.',
    avatar: 'MR',
    content: "Pro tip: I started keeping a 'wins jar' where I write down small victories each day. Reading them when I'm down reminds me how far I've come! Try it! 🏆",
    category: 'tip',
    likes: 42,
    comments: 6,
    timeAgo: '1 day ago',
    liked: true,
  },
];

const categoryColors = {
  motivation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  achievement: 'bg-green-100 text-green-800 border-green-200',
  support: 'bg-blue-100 text-blue-800 border-blue-200',
  gratitude: 'bg-purple-100 text-purple-800 border-purple-200',
  tip: 'bg-orange-100 text-orange-800 border-orange-200',
};

const categoryEmojis = {
  motivation: '💪',
  achievement: '🎉',
  support: '🤗',
  gratitude: '🙏',
  tip: '💡',
};

export function Community() {
  // Load posts from localStorage, but merge with sample posts for first-time users
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('calmcircle_community_posts');
    if (saved) {
      const savedPosts = JSON.parse(saved);
      // Only return saved posts if there are user posts, otherwise show samples
      const userPosts = savedPosts.filter((post: Post) => post.author === 'You');
      if (userPosts.length > 0) {
        return savedPosts;
      }
    }
    return samplePosts;
  });
  
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Post['category']>('motivation');
  const [showNewPost, setShowNewPost] = useState(false);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calmcircle_community_posts', JSON.stringify(posts));
  }, [posts]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'You',
        avatar: 'YU',
        content: newPost,
        category: selectedCategory,
        likes: 0,
        comments: 0,
        timeAgo: 'Just now',
        liked: false,
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Community Support 🤝
        </h1>
        <p className="text-xl text-gray-600">
          Share your journey, spread positivity, and support each other
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-purple-700">2,847</h3>
            <p className="text-sm text-gray-600">Active Members</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-700">12,493</h3>
            <p className="text-sm text-gray-600">Hearts Given</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-gradient-to-br from-green-50 to-teal-50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700">Today</h3>
            <p className="text-sm text-gray-600">Spread Kindness</p>
          </CardContent>
        </Card>
      </div>

      {/* New Post Section */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Share with the Community</CardTitle>
              <CardDescription>Your voice matters. Share your story, tips, or encouragement.</CardDescription>
            </div>
            <Button
              onClick={() => setShowNewPost(!showNewPost)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </CardHeader>
        
        {showNewPost && (
          <CardContent className="border-t">
            <div className="space-y-4">
              {/* Category Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(categoryEmojis).map(([category, emoji]) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category as Post['category'])}
                      className="capitalize"
                    >
                      {emoji} {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Post Content */}
              <Textarea
                placeholder="What would you like to share with the community?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-24"
              />
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handlePost}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Share Post
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                💾 Your posts are automatically saved and will appear when you return
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {/* Show indicator for user's saved posts */}
        {posts.filter(post => post.author === 'You').length > 0 && (
          <div className="text-center py-2">
            <p className="text-sm text-blue-600 bg-blue-50 rounded-lg py-2 px-4 inline-flex items-center gap-2">
              💬 {posts.filter(post => post.author === 'You').length} of your posts loaded from saved data
            </p>
          </div>
        )}
        
        {posts.map((post) => (
          <Card key={post.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-gray-900">{post.author}</h4>
                    <p className="text-sm text-gray-500">{post.timeAgo}</p>
                  </div>
                </div>
                <Badge variant="outline" className={categoryColors[post.category]}>
                  {categoryEmojis[post.category]} {post.category}
                </Badge>
              </div>
              
              {/* Post Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
              
              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1 ${
                      post.liked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                    <span>{post.likes}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                    <Share className="w-4 h-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-700">Community Guidelines 📋</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Be kind, respectful, and supportive to all members</li>
            <li>• Share experiences and encouragement, not medical advice</li>
            <li>• Respect privacy - no personal information sharing</li>
            <li>• Use trigger warnings when discussing sensitive topics</li>
            <li>• Report any concerning content to moderators</li>
            <li>• Remember: We're all here to support each other 💚</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}