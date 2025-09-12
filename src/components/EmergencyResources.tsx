import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { kvAPI } from '../utils/api';
import { 
  Phone, 
  MessageCircle, 
  Globe, 
  Heart, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  ExternalLink,
  Shield,
  Users,
  Headphones,
  Mail,
  Plus,
  Save
} from 'lucide-react';

const emergencyContacts = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "Free, confidential support 24/7",
    type: "crisis",
    available: "24/7",
    methods: ["phone", "chat"]
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Free, 24/7 crisis support via text",
    type: "crisis", 
    available: "24/7",
    methods: ["text"]
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    description: "Treatment referral and information service",
    type: "support",
    available: "24/7",
    methods: ["phone"]
  },
  {
    name: "Campus Safety",
    number: "Emergency: 911",
    description: "Immediate emergency response",
    type: "emergency",
    available: "24/7", 
    methods: ["phone"]
  }
];

const onlineResources = [
  {
    name: "National Alliance on Mental Illness (NAMI)",
    url: "https://nami.org",
    description: "Mental health education, support groups, and advocacy",
    icon: Users
  },
  {
    name: "Mental Health America",
    url: "https://mhanational.org",
    description: "Mental health screening tools and resources",
    icon: Heart
  },
  {
    name: "Crisis Text Line",
    url: "https://crisistextline.org",
    description: "Free crisis counseling via text message",
    icon: MessageCircle
  },
  {
    name: "SAMHSA Treatment Locator",
    url: "https://findtreatment.samhsa.gov",
    description: "Find mental health and substance abuse treatment",
    icon: MapPin
  }
];

const campusResources = [
  {
    title: "Counseling Center",
    description: "Free counseling services for students",
    icon: Heart,
    action: "Contact your campus counseling center"
  },
  {
    title: "Student Health Services",
    description: "Medical and mental health support on campus",
    icon: Shield,
    action: "Visit student health center"
  },
  {
    title: "Academic Advisor",
    description: "Help with academic stress and planning",
    icon: Users,
    action: "Schedule appointment with advisor"
  },
  {
    title: "Residential Life",
    description: "Support from residence hall staff",
    icon: MapPin,
    action: "Contact your RA or residence hall director"
  }
];

export function EmergencyResources({ setActiveSection }: { setActiveSection?: (section: string) => void }) {
  const [showContactDetails, setShowContactDetails] = useState<string | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [personalContacts, setPersonalContacts] = useState<any[]>([]);
  const [newContact, setNewContact] = useState({ name: '', number: '', relationship: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Load user's personal emergency contacts on component mount
  useEffect(() => {
    loadPersonalContacts();
  }, []);

  const loadPersonalContacts = async () => {
    try {
      const userId = 'demo_user'; // In a real app, get this from authentication
      const result = await kvAPI.get(`personal_emergency_contacts_${userId}`);
      if (result?.value) {
        setPersonalContacts(result.value);
      }
    } catch (error) {
      console.log('No personal contacts found or error loading:', error);
    }
  };

  const savePersonalContact = async () => {
    if (!newContact.name || !newContact.number) {
      alert('Please fill in name and number');
      return;
    }

    setIsLoading(true);
    try {
      const userId = 'demo_user'; // In a real app, get this from authentication
      const contactWithId = {
        ...newContact,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      const updatedContacts = [...personalContacts, contactWithId];
      
      await kvAPI.set(`personal_emergency_contacts_${userId}`, updatedContacts);
      
      setPersonalContacts(updatedContacts);
      setNewContact({ name: '', number: '', relationship: '' });
      setShowAddContact(false);
      
      alert('Emergency contact saved successfully! 💾');
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCall = (number: string) => {
    if (number.includes('741741')) {
      // For text-based services, show instructions
      alert('To text Crisis Text Line:\n\nText HOME to 741741\n\nA crisis counselor will respond quickly.');
    } else {
      // For phone numbers, open phone dialer
      window.open(`tel:${number.replace(/[^\d]/g, '')}`);
    }
  };

  const getContactIcon = (methods: string[]) => {
    if (methods.includes('phone')) return <Phone className="w-4 h-4" />;
    if (methods.includes('text')) return <MessageCircle className="w-4 h-4" />;
    if (methods.includes('chat')) return <MessageCircle className="w-4 h-4" />;
    return <Phone className="w-4 h-4" />;
  };

  const getContactBadgeColor = (type: string) => {
    switch (type) {
      case 'crisis': return 'bg-red-100 text-red-800 border-red-200';
      case 'emergency': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'support': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Critical Alert */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>If you are in immediate danger or having thoughts of suicide, please call 911 or go to your nearest emergency room immediately.</strong>
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Shield className="w-10 h-10 text-red-600" />
          Emergency Resources
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          You are not alone. Help is available 24/7. These resources are here to support you through any crisis or difficult time.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Button 
          onClick={() => handleCall('988')}
          className="h-16 bg-red-600 hover:bg-red-700 text-white text-lg"
        >
          <Phone className="w-6 h-6 mr-3" />
          Call 988 - Suicide Prevention
        </Button>
        <Button 
          onClick={() => handleCall('741741')}
          variant="outline"
          className="h-16 border-red-300 text-red-700 hover:bg-red-50 text-lg"
        >
          <MessageCircle className="w-6 h-6 mr-3" />
          Text HOME to 741741
        </Button>
      </div>

      {/* Emergency Contacts */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-2xl text-red-700 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Crisis & Emergency Contacts
          </CardTitle>
          <CardDescription>
            These services provide immediate support and are available when you need them most
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                      <Badge className={getContactBadgeColor(contact.type)}>
                        {contact.type}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{contact.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {contact.available}
                      </div>
                      <div className="flex items-center gap-1">
                        {getContactIcon(contact.methods)}
                        {contact.methods.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={() => handleCall(contact.number)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {contact.methods.includes('phone') ? 'Call' : 'Text'}
                    </Button>
                    <div className="text-sm font-mono text-gray-600 text-center">
                      {contact.number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Online Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Online Mental Health Resources
          </CardTitle>
          <CardDescription>
            Trusted websites and online tools for mental health support and information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {onlineResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{resource.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(resource.url, '_blank')}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Visit Website
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Personal Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-purple-700 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Your Personal Emergency Contacts
          </CardTitle>
          <CardDescription>
            Add your own emergency contacts - family, friends, or trusted individuals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {personalContacts.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">No personal emergency contacts added yet</p>
                <Button 
                  onClick={() => setShowAddContact(true)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Contact
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-3">
                  {personalContacts.map((contact) => (
                    <div key={contact.id} className="p-4 border rounded-lg bg-purple-50 border-purple-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-purple-900">{contact.name}</h3>
                          <p className="text-purple-700 text-sm">{contact.relationship}</p>
                          <p className="text-purple-600 text-sm mt-1">Added {new Date(contact.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-lg font-semibold text-purple-800">{contact.number}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2 border-purple-300 text-purple-700 hover:bg-purple-100"
                            onClick={() => handleCall(contact.number)}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => setShowAddContact(true)}
                  variant="outline"
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Contact
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Campus Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Campus Resources
          </CardTitle>
          <CardDescription>
            Support services available at your college or university
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {campusResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <p className="text-green-600 text-sm font-medium">{resource.action}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Self-Care Reminder */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-8 text-center">
          <Heart className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-purple-800 mb-3">
            Remember: Seeking help is a sign of strength
          </h3>
          <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
            Taking care of your mental health is just as important as taking care of your physical health. 
            You deserve support, and there are people who want to help you through difficult times.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setActiveSection?.('ai')}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Talk to AI Companion
            </Button>
            <Button 
              onClick={() => setActiveSection?.('mood')}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Track Your Mood
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Important Notice */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Disclaimer:</strong> These resources are provided for informational purposes. 
          If you are experiencing a medical or psychiatric emergency, please call 911 or go to your nearest emergency room immediately.
        </AlertDescription>
      </Alert>

      {/* Add Personal Contact Modal */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-purple-50 to-pink-50">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-purple-700 flex items-center justify-center gap-2">
              <Plus className="w-6 h-6" />
              Add Emergency Contact
            </DialogTitle>
            <DialogDescription className="text-center text-purple-600">
              Add someone you trust to your emergency contact list
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-purple-700 block mb-2">
                  Name *
                </label>
                <Input
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="e.g., Mom, John Smith, Dr. Johnson"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-purple-700 block mb-2">
                  Phone Number *
                </label>
                <Input
                  value={newContact.number}
                  onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
                  placeholder="e.g., (555) 123-4567"
                  type="tel"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-purple-700 block mb-2">
                  Relationship (Optional)
                </label>
                <Input
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="e.g., Mother, Best Friend, Family Doctor"
                  className="border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-700 mb-2">🔒 Privacy & Storage</h4>
              <p className="text-sm text-purple-600">
                Your emergency contacts are stored securely and privately. This data helps you 
                quickly access important phone numbers during stressful situations.
              </p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={savePersonalContact}
                disabled={isLoading || !newContact.name || !newContact.number}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Contact
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddContact(false)}
                disabled={isLoading}
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