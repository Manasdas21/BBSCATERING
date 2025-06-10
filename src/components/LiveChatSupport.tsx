
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ChatMessage {
  id: number;
  sender: 'support' | 'user';
  text: string;
  time: string;
}

const LiveChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'support',
      text: 'Hello! How can I help you with your catering needs today?',
      time: '10:30 AM'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [noAnswerCount, setNoAnswerCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'I need catering for a wedding',
    'What are your menu options?',
    'I want pricing information',
    'Book a corporate event',
    'Contact human support'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || message.trim();
    if (textToSend) {
      const newMessage: ChatMessage = {
        id: Date.now(),
        sender: 'user',
        text: textToSend,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      setMessage('');
      setShowQuickReplies(false);
      
      // Show typing indicator
      setIsTyping(true);
      
      // Get smart response
      setTimeout(() => {
        setIsTyping(false);
        const responseText = getSmartResponse(textToSend);
        const responseMessage: ChatMessage = {
          id: Date.now() + 1,
          sender: 'support',
          text: responseText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, responseMessage]);
        
        // Check if it's a generic response (indicates no specific answer)
        if (responseText.includes('Thank you for your message!')) {
          setNoAnswerCount(prev => prev + 1);
        }
        
        // Show contact support after 2 generic responses
        if (noAnswerCount >= 1) {
          setTimeout(() => {
            const contactMessage: ChatMessage = {
              id: Date.now() + 2,
              sender: 'support',
              text: 'It seems you might need more detailed assistance. Would you like to speak with our human support team? You can call us at 9611906084 or email alekh0253@gmail.com for immediate help.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setChatMessages(prev => [...prev, contactMessage]);
          }, 1000);
        }
      }, 2000);
    }
  };

  const getSmartResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('wedding') || msg.includes('marriage')) {
      return 'Perfect! Our wedding packages start from ₹350 per person and include authentic Indian cuisine, decoration, and service staff. We handle everything from intimate ceremonies to grand celebrations. Would you like me to share our wedding menu options?';
    } else if (msg.includes('booking') || msg.includes('book')) {
      return 'I can help you with booking! You can use our Smart Recommendations section on the website to choose the perfect package for your event, or I can connect you with our booking specialist at 9611906084.';
    } else if (msg.includes('menu') || msg.includes('food')) {
      return 'Our menu features authentic Indian cuisine with both vegetarian and non-vegetarian options including starters, main courses, breads, rice dishes, and desserts. You can view our complete menu gallery on the website or I can send you our detailed catalog.';
    } else if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing')) {
      return 'Our pricing starts from ₹220 per person and varies based on the package and guest count. Use our Price Calculator on the website for instant quotes, or let me know your requirements for a custom quote.';
    } else if (msg.includes('corporate') || msg.includes('office') || msg.includes('business')) {
      return 'We specialize in corporate catering! Our business packages include breakfast meetings, lunch conferences, team parties, and office celebrations. We offer both buffet and plated service options with professional setup.';
    } else if (msg.includes('contact') || msg.includes('call') || msg.includes('phone') || msg.includes('human support')) {
      return 'Connecting you to human support! You can reach us directly at 9611906084 or email us at alekh0253@gmail.com. Our team is available 24/7 for personalized assistance.';
    } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! Welcome to DelishDine Catering. I\'m here to help you plan the perfect event. What type of catering service are you looking for today?';
    } else {
      return 'Thank you for your message! I\'m here to help with any questions about our catering services. Feel free to ask about our packages, menu, pricing, or booking process.';
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleCall = () => {
    window.open('tel:9611906084', '_self');
  };

  const handleEmail = () => {
    window.open('mailto:alekh0253@gmail.com', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919611906084?text=Hello! I need help with catering services.', '_blank');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowQuickReplies(true);
      setNoAnswerCount(0);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <Button
            onClick={toggleChat}
            className="bg-gold hover:bg-gold/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
            aria-label="Open live chat"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Badge className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 animate-pulse">
            Live
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50" id="live-chat-container">
      <Card className="w-80 h-96 shadow-2xl border-gold/20 bg-white">
        <CardHeader className="bg-gradient-to-r from-gold to-gold/80 text-white p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">Live Support</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Online - We typically reply instantly</span>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 max-h-48">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gold text-white ml-auto'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="break-words">{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-gold-100' : 'text-gray-500'
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 px-3 py-2 rounded-lg text-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showQuickReplies && (
            <div className="p-3 border-t bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Quick replies:</p>
              <div className="space-y-1">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-8 justify-start border-gold/30 hover:bg-gold hover:text-white transition-colors"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2 mb-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs hover:bg-gold hover:text-white transition-colors border-gold/30"
                onClick={handleCall}
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs hover:bg-gold hover:text-white transition-colors border-gold/30"
                onClick={handleEmail}
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-xs hover:bg-green-500 hover:text-white transition-colors border-green-500/30"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                WhatsApp
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm border-gold/30 focus:border-gold"
                maxLength={500}
              />
              <Button 
                onClick={() => handleSendMessage()} 
                className="bg-gold hover:bg-gold/90 px-3"
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveChatSupport;
