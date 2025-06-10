
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Calendar, Users, Home, Baby, Star, MessagesSquare, Coffee, Utensils, UserRound } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

interface ComboMenu {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  popular?: boolean;
}

interface EventType {
  id: string;
  name: string;
  icon: React.ElementType;
  price: string;
  basePrice: number;
  description: string;
  features: string[];
  addons: Addon[];
  image: string;
  rating: number;
  reviews: number;
  popular?: boolean;
  staffPick?: boolean;
  comboMenus: ComboMenu[];
}

interface Addon {
  id: string;
  name: string;
  icon: React.ElementType;
  price: number;
  description: string;
}

const addons: Addon[] = [
  {
    id: "live-counter",
    name: "Live Counters",
    icon: Coffee,
    price: 150,
    description: "Interactive food stations with chefs preparing dishes on-demand"
  },
  {
    id: "premium-menu",
    name: "Premium Menu",
    icon: Utensils,
    price: 200,
    description: "Upgraded menu selections with premium ingredients"
  },
  {
    id: "waitstaff",
    name: "Additional Wait Staff",
    icon: UserRound,
    price: 100,
    description: "Extra service staff to ensure smoother experience"
  }
];

const events: EventType[] = [
  {
    id: "wedding",
    name: "Wedding Catering",
    icon: Heart,
    price: "Starting at ₹799 per head",
    basePrice: 799,
    description: "Make your special day memorable with our exquisite wedding catering services. From elegant appetizers to grand buffets.",
    features: ["Customized Menu Planning", "Professional Staff", "Complete Setup", "Live Counters"],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2070",
    rating: 4.8,
    reviews: 156,
    popular: true,
    addons,
    comboMenus: [
      {
        id: "wedding-basic",
        name: "Classic Wedding Menu",
        price: 799,
        description: "Traditional wedding feast with authentic flavors",
        items: ["Welcome Drink", "2 Starters", "3 Main Courses", "Dal & Rice", "2 Breads", "Raita", "Dessert", "Paan"]
      },
      {
        id: "wedding-premium",
        name: "Royal Wedding Menu",
        price: 1299,
        description: "Luxurious spread fit for royalty",
        items: ["Welcome Drink", "Live Chaat Counter", "4 Starters", "5 Main Courses", "Biryani", "3 Breads", "Special Dal", "Dessert Counter", "Kulfi", "Paan Corner"],
        popular: true
      },
      {
        id: "wedding-deluxe",
        name: "Grand Wedding Menu",
        price: 1799,
        description: "Ultimate wedding dining experience",
        items: ["Welcome Drinks", "Live Stations", "6 Starters", "8 Main Courses", "Special Biryani", "Live Pasta Counter", "4 Breads", "Dessert Buffet", "Ice Cream Counter", "Beverages"]
      }
    ]
  },
  {
    id: "birthday",
    name: "Birthday Parties",
    icon: Gift,
    price: "Starting at ₹599 per head",
    basePrice: 599,
    description: "Celebrate your birthday in style with our themed catering packages and custom cake options.",
    features: ["Theme-based Setup", "Custom Birthday Cake", "Kids Special Menu", "Party Games Setup"],
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2069",
    rating: 4.7,
    reviews: 124,
    addons,
    comboMenus: [
      {
        id: "birthday-kids",
        name: "Kids Birthday Special",
        price: 599,
        description: "Fun menu designed for children's parties",
        items: ["Mini Burgers", "Pizza Slices", "Chicken Nuggets", "French Fries", "Fruit Platter", "Birthday Cake", "Juice & Soft Drinks"]
      },
      {
        id: "birthday-adult",
        name: "Adult Birthday Menu",
        price: 799,
        description: "Sophisticated menu for grown-up celebrations",
        items: ["Cocktail Snacks", "2 Starters", "3 Main Courses", "Rice & Bread", "Salad", "Birthday Cake", "Beverages"],
        popular: true
      },
      {
        id: "birthday-family",
        name: "Family Birthday Feast",
        price: 999,
        description: "Perfect for multi-generational celebrations",
        items: ["Mixed Starters", "Kids Corner", "4 Main Courses", "Biryani", "Live Counter", "Dessert Selection", "Custom Cake", "All Beverages"]
      }
    ]
  },
  {
    id: "corporate",
    name: "Corporate Events",
    icon: Calendar,
    price: "Starting at ₹699 per head",
    basePrice: 699,
    description: "Professional catering solutions for meetings, conferences, and corporate gatherings.",
    features: ["Business Lunch Options", "Coffee Breaks", "Executive Dining", "Dietary Accommodations"],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069",
    rating: 4.6,
    reviews: 98,
    staffPick: true,
    addons,
    comboMenus: [
      {
        id: "corporate-lunch",
        name: "Business Lunch",
        price: 699,
        description: "Professional lunch menu for corporate meetings",
        items: ["Welcome Refreshments", "2 Starters", "3 Main Courses", "Rice & Bread", "Salad", "Tea/Coffee", "Dessert"]
      },
      {
        id: "corporate-conference",
        name: "Conference Package",
        price: 899,
        description: "Full day corporate catering solution",
        items: ["Morning Tea/Coffee", "Breakfast Items", "Lunch Menu", "Evening Snacks", "High Tea", "All Beverages"],
        popular: true
      },
      {
        id: "corporate-gala",
        name: "Corporate Gala Dinner",
        price: 1299,
        description: "Elegant dinner for corporate celebrations",
        items: ["Welcome Cocktails", "Canapés", "4 Starters", "5 Main Courses", "Live Counters", "Premium Desserts", "Bar Service"]
      }
    ]
  },
  {
    id: "social",
    name: "Social Gatherings",
    icon: Users,
    price: "Starting at ₹549 per head",
    basePrice: 549,
    description: "Perfect for family reunions, get-togethers, and social celebrations with diverse menu options.",
    features: ["Flexible Menu Options", "Buffet Setup", "Service Staff", "Cleanup Service"],
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070",
    rating: 4.5,
    reviews: 87,
    addons,
    comboMenus: [
      {
        id: "social-casual",
        name: "Casual Get-Together",
        price: 549,
        description: "Simple and delicious menu for informal gatherings",
        items: ["Snacks Platter", "2 Main Courses", "Rice & Bread", "Beverages", "Simple Dessert"]
      },
      {
        id: "social-family",
        name: "Family Reunion Special",
        price: 749,
        description: "Hearty menu bringing families together",
        items: ["Mixed Starters", "3 Main Courses", "Biryani", "2 Breads", "Pickle & Raita", "Dessert", "Tea/Coffee"],
        popular: true
      },
      {
        id: "social-celebration",
        name: "Social Celebration Menu",
        price: 949,
        description: "Festive menu for special social occasions",
        items: ["Welcome Drinks", "3 Starters", "4 Main Courses", "Live Counter", "Special Rice", "Dessert Selection", "All Beverages"]
      }
    ]
  },
  {
    id: "housewarming",
    name: "Housewarming",
    icon: Home,
    price: "Starting at ₹649 per head",
    basePrice: 649,
    description: "Welcome guests to your new home with our specially curated housewarming catering packages.",
    features: ["Traditional Menu", "Modern Fusion", "Decor Elements", "Complete Setup"],
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=2070",
    rating: 4.7,
    reviews: 65,
    addons,
    comboMenus: [
      {
        id: "housewarming-traditional",
        name: "Traditional Housewarming",
        price: 649,
        description: "Authentic traditional menu for your new home",
        items: ["Coconut Water", "Traditional Starters", "Homestyle Curries", "Sambar & Rice", "Chapati", "Payasam", "Filter Coffee"]
      },
      {
        id: "housewarming-modern",
        name: "Modern Housewarming",
        price: 849,
        description: "Contemporary menu with traditional touches",
        items: ["Welcome Drinks", "Fusion Starters", "3 Main Courses", "Flavored Rice", "Breads", "Modern Desserts", "Beverages"],
        popular: true
      },
      {
        id: "housewarming-grand",
        name: "Grand Housewarming",
        price: 1149,
        description: "Elaborate spread for grand celebrations",
        items: ["Multiple Welcome Drinks", "Live Stations", "4 Starters", "5 Main Courses", "Special Biryani", "Dessert Counter", "Traditional Sweets", "All Beverages"]
      }
    ]
  },
  {
    id: "babyshower",
    name: "Baby Shower",
    icon: Baby,
    price: "Starting at ₹749 per head",
    basePrice: 749,
    description: "Celebrate new beginnings with our specialized baby shower catering and themed setups.",
    features: ["Theme Decoration", "Custom Menu", "Dessert Station", "Games Setup"],
    image: "https://images.unsplash.com/photo-1544767687-21db63566e55?q=80&w=2069",
    rating: 4.9,
    reviews: 78,
    popular: true,
    addons,
    comboMenus: [
      {
        id: "babyshower-classic",
        name: "Classic Baby Shower",
        price: 749,
        description: "Sweet and elegant menu for celebrating new life",
        items: ["Mocktails", "Light Starters", "Healthy Main Courses", "Fresh Salads", "Baby-themed Desserts", "Herbal Teas"]
      },
      {
        id: "babyshower-premium",
        name: "Premium Baby Shower",
        price: 999,
        description: "Luxurious celebration for the special day",
        items: ["Signature Drinks", "Gourmet Starters", "4 Main Courses", "Organic Options", "Live Dessert Station", "Custom Baby Cake", "Premium Beverages"],
        popular: true
      },
      {
        id: "babyshower-deluxe",
        name: "Deluxe Baby Shower",
        price: 1299,
        description: "Ultimate baby shower dining experience",
        items: ["Cocktail Hour", "Live Stations", "5 Starters", "6 Main Courses", "International Cuisine", "Dessert Buffet", "Baby-themed Treats", "Full Beverage Service"]
      }
    ]
  }
];

const EventPriceEstimator = ({ event }: { event: EventType }) => {
  const [guests, setGuests] = useState<number>(50);
  const [mealType, setMealType] = useState<string>("veg");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const calculateTotal = () => {
    let basePrice = event.basePrice;
    
    if (mealType === "nonveg") {
      basePrice += 150;
    } else if (mealType === "mixed") {
      basePrice += 100;
    }
    
    const addonsCost = selectedAddons.reduce((total, addonId) => {
      const addon = event.addons.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    
    return (basePrice + addonsCost) * guests;
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6 mt-4">
      <h3 className="text-xl font-semibold text-forest">Price Estimator</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="guests">Number of Guests: {guests}</Label>
            <span className="text-sm font-medium text-forest">{guests} people</span>
          </div>
          <Slider 
            id="guests"
            min={25} 
            max={500} 
            step={25} 
            value={[guests]} 
            onValueChange={(value) => setGuests(value[0])}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="meal-type">Meal Type</Label>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger id="meal-type" className="w-full">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="veg">Vegetarian</SelectItem>
              <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
              <SelectItem value="mixed">Mixed (Veg & Non-Veg)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Additional Services</Label>
          <div className="grid grid-cols-1 gap-2">
            {event.addons.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <div 
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3 border rounded-md cursor-pointer flex justify-between items-center transition-colors ${
                    isSelected ? 'border-gold bg-gold/10' : 'border-gray-200 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <addon.icon className="w-4 h-4 text-gold" />
                    <span>{addon.name}</span>
                  </div>
                  <span className="text-sm font-medium">+₹{addon.price}/person</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-cream rounded-md">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Estimated Total:</span>
          <span className="text-2xl font-bold text-forest">₹{calculateTotal().toLocaleString()}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Final price may vary based on specific requirements and customizations.
        </p>
      </div>
      
      <Button className="w-full bg-gold hover:bg-gold/90 text-white mt-4">
        Request Detailed Quote
      </Button>
    </div>
  );
};

const EventCard = ({ event }: { event: EventType }) => {
  const Icon = event.icon;
  
  return (
    <Link to="/menu" className="block">
      <Card className="relative group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer border-gold/20 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        
        <div className="absolute top-2 left-2 z-20 flex gap-2">
          {event.popular && (
            <Badge className="bg-gold text-white">Most Booked</Badge>
          )}
          {event.staffPick && (
            <Badge className="bg-forest text-white">Staff Pick</Badge>
          )}
        </div>
        
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" className="rounded-full w-8 h-8 p-0 bg-green-500 hover:bg-green-600">
            <MessagesSquare className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            srcSet={`${event.image}&w=640 640w, ${event.image}&w=1024 1024w, ${event.image}&w=2048 2048w`}
          />
        </div>
        
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-gold/10">
              <Icon className="w-6 h-6 text-gold" />
            </div>
            <h3 className="text-xl font-bold font-playfair">{event.name}</h3>
          </div>
          <p className="text-forest font-semibold">{event.price}</p>
          
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(event.rating) ? 'text-gold fill-gold' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({event.reviews})</span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-gray-600">{event.description}</p>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button className="w-full bg-gold hover:bg-gold/90 text-white">
            Explore Packages
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

const ComboMenuSelector = ({ event }: { event: EventType }) => {
  const [selectedCombo, setSelectedCombo] = useState<string>("");
  const [guests, setGuests] = useState<number>(50);

  const selectedComboMenu = event.comboMenus.find(combo => combo.id === selectedCombo);

  const calculateComboTotal = () => {
    if (!selectedComboMenu) return 0;
    return selectedComboMenu.price * guests;
  };

  const handleBookCombo = () => {
    // Scroll to contact form section
    const contactSection = document.getElementById('booking');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h3 className="text-xl font-semibold text-forest">Combo Menu Packages</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="guests">Number of Guests: {guests}</Label>
            <span className="text-sm font-medium text-forest">{guests} people</span>
          </div>
          <Slider 
            id="guests"
            min={25} 
            max={500} 
            step={25} 
            value={[guests]} 
            onValueChange={(value) => setGuests(value[0])}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {event.comboMenus.map((combo) => (
            <Card 
              key={combo.id}
              className={`cursor-pointer transition-all ${
                selectedCombo === combo.id ? 'ring-2 ring-gold bg-gold/5' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedCombo(combo.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg">{combo.name}</h4>
                  {combo.popular && (
                    <Badge className="bg-gold text-white">Popular</Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-forest">₹{combo.price}</p>
                <p className="text-sm text-gray-600">{combo.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  <h5 className="font-medium text-sm">Includes:</h5>
                  <ul className="space-y-1">
                    {combo.items.slice(0, 4).map((item, idx) => (
                      <li key={idx} className="text-xs flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                    {combo.items.length > 4 && (
                      <li className="text-xs text-gray-500">
                        +{combo.items.length - 4} more items
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedComboMenu && (
          <div className="mt-6 p-4 bg-cream rounded-md">
            <h4 className="font-semibold mb-3">{selectedComboMenu.name} - Complete Menu:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {selectedComboMenu.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-lg font-semibold">Total for {guests} guests:</span>
              <span className="text-2xl font-bold text-forest">₹{calculateComboTotal().toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
      
      <Button 
        className="w-full bg-gold hover:bg-gold/90 text-white mt-4"
        disabled={!selectedCombo}
        onClick={handleBookCombo}
      >
        {selectedCombo ? 'Book This Combo Menu' : 'Select a Combo Menu'}
      </Button>
    </div>
  );
};

const EventsSection = () => {
  const [sortOption, setSortOption] = useState("default");
  const [filterType, setFilterType] = useState("all");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [activeView, setActiveView] = useState("grid");
  const [selectedEventForCombo, setSelectedEventForCombo] = useState<string>("wedding");

  const sortEvents = (eventsToSort: EventType[]) => {
    switch (sortOption) {
      case "price-low":
        return [...eventsToSort].sort((a, b) => a.basePrice - b.basePrice);
      case "price-high":
        return [...eventsToSort].sort((a, b) => b.basePrice - a.basePrice);
      case "popularity":
        return [...eventsToSort].sort((a, b) => b.reviews - a.reviews);
      default:
        return eventsToSort;
    }
  };

  const filterEvents = (eventsToFilter: EventType[]) => {
    if (filterType === "all") return eventsToFilter;
    if (filterType === "popular") return eventsToFilter.filter(event => event.popular);
    if (filterType === "staff-pick") return eventsToFilter.filter(event => event.staffPick);
    return eventsToFilter;
  };

  const processedEvents = sortEvents(filterEvents(events));

  const toggleEventSelection = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      if (selectedEvents.length < 3) {
        setSelectedEvents([...selectedEvents, eventId]);
      }
    }
  };

  const handleComboMenuView = () => {
    setActiveView("combo");
    if (selectedEvents.length === 0) {
      setSelectedEventForCombo("wedding");
    } else {
      setSelectedEventForCombo(selectedEvents[0]);
    }
  };

  const handleEstimatorView = () => {
    setActiveView("estimator");
    if (selectedEvents.length === 0) {
      setSelectedEvents(["wedding"]);
      setSelectedEventForCombo("wedding");
    }
  };

  return (
    <section id="events" className="py-16 md:py-24 bg-cream">
      <div className="container-section">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Event Services</h2>
          <p className="section-subheading mx-auto">
            Discover our specialized catering packages for every occasion
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={activeView === "grid" ? "default" : "outline"}
              onClick={() => setActiveView("grid")}
              className={activeView === "grid" ? "bg-gold text-white" : ""}
            >
              Gallery View
            </Button>
            <Button 
              variant={activeView === "comparison" ? "default" : "outline"}
              onClick={() => setActiveView("comparison")}
              className={activeView === "comparison" ? "bg-gold text-white" : ""}
              disabled={selectedEvents.length < 2}
            >
              Compare ({selectedEvents.length}/3)
            </Button>
            <Button 
              variant={activeView === "estimator" ? "default" : "outline"}
              onClick={handleEstimatorView}
              className={activeView === "estimator" ? "bg-gold text-white" : ""}
            >
              Price Estimator
            </Button>
            <Button 
              variant={activeView === "combo" ? "default" : "outline"}
              onClick={handleComboMenuView}
              className={activeView === "combo" ? "bg-forest text-white" : ""}
            >
              Combo Menus
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="staff-pick">Staff Picks</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="block md:hidden mb-8">
          {activeView === "grid" && (
            <Carousel className="w-full">
              <CarouselContent>
                {processedEvents.map((event, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="relative" onClick={() => toggleEventSelection(event.id)}>
                            <EventCard event={event} />
                            {selectedEvents.includes(event.id) && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-white z-30">
                                ✓
                              </div>
                            )}
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm p-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-lg">{event.name} Features</h4>
                            <ul className="space-y-1">
                              {event.features.map((feature, idx) => (
                                <li key={idx} className="text-sm flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-gold" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1" />
              <CarouselNext className="right-1" />
            </Carousel>
          )}
        </div>
        
        {activeView === "grid" && (
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedEvents.map((event, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <div className="relative" onClick={() => toggleEventSelection(event.id)}>
                    <EventCard event={event} />
                    {selectedEvents.includes(event.id) && (
                      <div className="absolute top-2 right-12 w-6 h-6 bg-gold rounded-full flex items-center justify-center text-white z-30">
                        ✓
                      </div>
                    )}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-white/95 backdrop-blur-sm p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg">{event.name} Features</h4>
                    <ul className="space-y-1">
                      {event.features.map((feature, idx) => (
                        <li key={idx} className="text-sm flex items-center gap-2 justify-center">
                          <span className="w-1 h-1 rounded-full bg-gold" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        )}
        
        {activeView === "comparison" && selectedEvents.length >= 2 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-forest text-white">
                  <th className="p-4 text-left">Features</th>
                  {selectedEvents.map(eventId => {
                    const event = events.find(e => e.id === eventId);
                    return (
                      <th key={eventId} className="p-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 rounded-full bg-white/20 inline-block">
                            {event && <event.icon className="w-6 h-6 text-white" />}
                          </div>
                          {event?.name}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Base Price</td>
                  {selectedEvents.map(eventId => {
                    const event = events.find(e => e.id === eventId);
                    return (
                      <td key={eventId} className="p-4 text-center font-bold text-forest">
                        ₹{event?.basePrice} per person
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Rating</td>
                  {selectedEvents.map(eventId => {
                    const event = events.find(e => e.id === eventId);
                    return (
                      <td key={eventId} className="p-4 text-center">
                        <div className="flex justify-center items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${event && i < Math.floor(event.rating) ? 'text-gold fill-gold' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm">({event?.reviews})</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-semibold">Features</td>
                  {selectedEvents.map(eventId => {
                    const event = events.find(e => e.id === eventId);
                    return (
                      <td key={eventId} className="p-4">
                        <ul className="space-y-1">
                          {event?.features.map((feature, idx) => (
                            <li key={idx} className="text-sm flex items-center gap-2 justify-center">
                              <span className="w-1 h-1 rounded-full bg-gold" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Action</td>
                  {selectedEvents.map(eventId => (
                    <td key={eventId} className="p-4 text-center">
                      <Button className="bg-gold hover:bg-gold/90 text-white">
                        Book Now
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
        {activeView === "estimator" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {selectedEvents.length === 0 && (
              <div className="mb-6">
                <Label htmlFor="event-select">Select Event Type</Label>
                <Select value={selectedEventForCombo} onValueChange={(value) => {
                  setSelectedEventForCombo(value);
                  setSelectedEvents([value]);
                }}>
                  <SelectTrigger id="event-select" className="w-full">
                    <SelectValue placeholder="Choose an event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold font-playfair mb-4">
                  {events.find(e => e.id === (selectedEvents[0] || selectedEventForCombo))?.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {events.find(e => e.id === (selectedEvents[0] || selectedEventForCombo))?.description}
                </p>
                <div className="aspect-video rounded-md overflow-hidden mb-4">
                  <img 
                    src={events.find(e => e.id === (selectedEvents[0] || selectedEventForCombo))?.image} 
                    alt={events.find(e => e.id === (selectedEvents[0] || selectedEventForCombo))?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Included in Package:</h4>
                  <ul className="space-y-1">
                    {events.find(e => e.id === (selectedEvents[0] || selectedEventForCombo))?.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:w-2/3">
                <EventPriceEstimator event={events.find(e => e.id === (selectedEvents[0] || selectedEventForCombo))!} />
              </div>
            </div>
          </div>
        )}
        
        {activeView === "combo" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <Label htmlFor="combo-event-select">Select Event Type for Combo Menus</Label>
              <Select value={selectedEventForCombo} onValueChange={setSelectedEventForCombo}>
                <SelectTrigger id="combo-event-select" className="w-full">
                  <SelectValue placeholder="Choose an event type" />
                </SelectTrigger>
                <SelectContent>
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      <div className="flex items-center gap-2">
                        <event.icon className="w-4 h-4" />
                        {event.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-2xl font-bold font-playfair mb-4">
                  {events.find(e => e.id === selectedEventForCombo)?.name} Combo Menus
                </h3>
                <p className="text-gray-600 mb-4">
                  Choose from our specially curated combo menu packages designed for {events.find(e => e.id === selectedEventForCombo)?.name.toLowerCase()}.
                </p>
                <div className="aspect-video rounded-md overflow-hidden mb-4">
                  <img 
                    src={events.find(e => e.id === selectedEventForCombo)?.image} 
                    alt={events.find(e => e.id === selectedEventForCombo)?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Why Choose Combo Menus?</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      Pre-planned balanced meals
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      Cost-effective packages
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      Hassle-free selection
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      Guaranteed satisfaction
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:w-2/3">
                <ComboMenuSelector event={events.find(e => e.id === selectedEventForCombo)!} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
