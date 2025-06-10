import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Calculator, Filter, Sparkles, TrendingUp, Star, Clock, Users, ChefHat, Utensils, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MenuItem } from '@/types/menu';
import { menuItems } from '@/data/menuItems';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type MenuCategory = 'all' | 'veg' | 'non-veg';
type CourseType = 'all' | 'starters' | 'main' | 'desserts' | 'beverages';

const MenuGallery = () => {
  const [guestCount, setGuestCount] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedCourse, setSelectedCourse] = useState<CourseType>('all');
  const [eventType, setEventType] = useState<string>('casual');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Filter menu items based on selected category and course
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const courseMatch = selectedCourse === 'all' || item.course === selectedCourse;
      return categoryMatch && courseMatch;
    });
  }, [selectedCategory, selectedCourse]);

  // Group items by course for display
  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      const course = item.course || 'main';
      if (!acc[course]) {
        acc[course] = [];
      }
      acc[course].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  }, [filteredItems]);

  // Count vegetarian items
  const vegItemsCount = useMemo(() => {
    return menuItems.filter(item => item.category === 'veg').length;
  }, []);

  // Count non-vegetarian items
  const nonVegItemsCount = useMemo(() => {
    return menuItems.filter(item => item.category === 'non-veg').length;
  }, []);

  // Calculate popular items (items with price between 49-89)
  const popularItems = useMemo(() => {
    return menuItems.filter(item => item.pricePerHead >= 49 && item.pricePerHead <= 89).slice(0, 6);
  }, []);

  // Calculate budget-friendly items (under 50)
  const budgetItems = useMemo(() => {
    return menuItems.filter(item => item.pricePerHead < 50).slice(0, 6);
  }, []);

  // Enhanced budget calculation with updated pricing range
  const budgetAnalysis = useMemo(() => {
    // Get recommended items based on event type and guest count
    const getRecommendedItems = () => {
      const eventTypeItems = {
        casual: ['starters', 'main', 'beverages'],
        formal: ['starters', 'main', 'desserts', 'beverages'],
        wedding: ['starters', 'main', 'desserts', 'beverages'],
        corporate: ['starters', 'main', 'beverages'],
        festival: ['starters', 'main', 'desserts', 'beverages']
      };

      const recommendedCourses = eventTypeItems[eventType as keyof typeof eventTypeItems] || ['main'];
      
      // If user has selected items, use those; otherwise use recommended items
      if (selectedItems.size > 0) {
        return menuItems.filter(item => selectedItems.has(item.name));
      }

      // Get recommended items from each course
      const recommended: MenuItem[] = [];
      recommendedCourses.forEach(course => {
        const courseItems = menuItems.filter(item => item.course === course);
        if (courseItems.length > 0) {
          // Add 2-3 items per course based on guest count
          const itemCount = guestCount > 50 ? 3 : guestCount > 20 ? 2 : 1;
          const sortedItems = courseItems.sort((a, b) => a.pricePerHead - b.pricePerHead);
          recommended.push(...sortedItems.slice(0, itemCount));
        }
      });

      return recommended.length > 0 ? recommended : filteredItems.slice(0, 5);
    };

    const recommendedItems = getRecommendedItems();
    const itemsToCalculate = recommendedItems.length > 0 ? recommendedItems : filteredItems.slice(0, 5);
    
    // Base price calculation with updated range (200-300)
    const basePrice = 250; // Base price in the middle of 200-300 range
    
    // Event type multipliers to adjust the base price
    const eventMultipliers = {
      casual: 0.8,      // 200 (250 * 0.8)
      formal: 1.0,      // 250 (250 * 1.0)
      wedding: 1.2,     // 300 (250 * 1.2)
      corporate: 0.9,   // 225 (250 * 0.9)
      festival: 1.1     // 275 (250 * 1.1)
    };
    
    // Guest count multipliers for bulk pricing
    const guestMultiplier = guestCount > 100 ? 0.95 : guestCount > 50 ? 0.97 : guestCount > 20 ? 0.98 : 1;
    
    const eventMultiplier = eventMultipliers[eventType as keyof typeof eventMultipliers] || 1;
    let adjustedAvgPrice = basePrice * eventMultiplier * guestMultiplier;
    
    // Ensure the price stays within 200-300 range
    adjustedAvgPrice = Math.max(200, Math.min(300, adjustedAvgPrice));
    
    const totalCost = adjustedAvgPrice * guestCount;
    
    // Calculate savings based on guest count
    const originalPrice = basePrice * eventMultiplier;
    const savings = guestCount > 20 ? Math.round((originalPrice - adjustedAvgPrice) * guestCount) : 0;
    
    return {
      avgPricePerHead: Math.round(adjustedAvgPrice),
      totalEstimate: Math.round(totalCost),
      costPerGuest: Math.round(adjustedAvgPrice),
      budgetLevel: totalCost < 5000 ? 'Budget-Friendly' : totalCost < 15000 ? 'Moderate' : 'Premium',
      recommendedItems: itemsToCalculate.length,
      savings: savings
    };
  }, [filteredItems, guestCount, eventType, selectedItems]);

  // Toggle item selection
  const toggleItemSelection = (itemName: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemName)) {
      newSelected.delete(itemName);
    } else {
      newSelected.add(itemName);
    }
    setSelectedItems(newSelected);
  };

  // Course display order and labels
  const courseOrder = [
    { key: 'starters', label: 'Appetizers & Starters', icon: '🥗', color: 'bg-orange-100 text-orange-800' },
    { key: 'main', label: 'Main Course', icon: '🍛', color: 'bg-red-100 text-red-800' },
    { key: 'beverages', label: 'Beverages', icon: '🥤', color: 'bg-blue-100 text-blue-800' },
    { key: 'desserts', label: 'Desserts', icon: '🍰', color: 'bg-pink-100 text-pink-800' }
  ];

  const stats = [
    { icon: Star, label: 'Total Items', value: menuItems.length, color: 'text-yellow-600' },
    { icon: TrendingUp, label: 'Popular Items', value: popularItems.length, color: 'text-green-600' },
    { icon: Clock, label: 'Quick Bites', value: menuItems.filter(item => item.course === 'starters').length, color: 'text-blue-600' },
    { icon: Sparkles, label: 'Desserts', value: menuItems.filter(item => item.course === 'desserts').length, color: 'text-purple-600' }
  ];

  const eventTypes = [
    { value: 'casual', label: 'Casual Dining', icon: '🍽️' },
    { value: 'formal', label: 'Formal Event', icon: '🥂' },
    { value: 'wedding', label: 'Wedding', icon: '💒' },
    { value: 'corporate', label: 'Corporate', icon: '🏢' },
    { value: 'festival', label: 'Festival', icon: '🎉' }
  ];

  const guestRanges = [
    { min: 1, max: 10, label: 'Intimate (1-10)', icon: '👨‍👩‍👧‍👦' },
    { min: 11, max: 25, label: 'Small (11-25)', icon: '👥' },
    { min: 26, max: 50, label: 'Medium (26-50)', icon: '👨‍👩‍👧‍👦👥' },
    { min: 51, max: 100, label: 'Large (51-100)', icon: '🏛️' },
    { min: 101, max: 500, label: 'Grand (100+)', icon: '🎪' }
  ];

  const getCurrentGuestRange = () => {
    return guestRanges.find(range => guestCount >= range.min && guestCount <= range.max) || guestRanges[guestRanges.length - 1];
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-gradient-to-br from-cream via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg">
            <Sparkles className="h-5 w-5 text-gold animate-pulse" />
            <span className="text-gold font-semibold">Authentic Indian Cuisine</span>
            <Sparkles className="h-5 w-5 text-gold animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-forest via-green-600 to-gold bg-clip-text text-transparent mb-6">
            Our Complete Menu
          </h2>
          <p className="text-xl text-gray-700 mx-auto max-w-3xl mb-6 leading-relaxed">
            Explore our authentic Indian cuisines crafted with traditional recipes and fresh ingredients
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Category Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
              🌱 {vegItemsCount} Vegetarian Items
            </div>
            {nonVegItemsCount > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-lg">
                🍖 {nonVegItemsCount} Non-Vegetarian Items
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Guest Planning Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-forest to-green-600 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-3">
                <Calculator className="h-8 w-8 text-gold" />
                Smart Event Planner
                <ChefHat className="h-8 w-8 text-gold" />
              </h3>
              <p className="text-lg text-gray-600">Plan your perfect event with our intelligent cost calculator</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Event Type Selection */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-forest mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Event Type
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setEventType(type.value)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl transition-all duration-300 text-left",
                        eventType === type.value
                          ? "bg-gradient-to-r from-gold to-yellow-500 text-white shadow-lg scale-105"
                          : "bg-white/70 hover:bg-white/90 border border-gray-200 hover:shadow-md"
                      )}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <span className="font-semibold">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count and Analysis */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-forest mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Guest Count
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <input
                      type="number"
                      id="guests"
                      min="1"
                      max="1000"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="px-6 py-4 border-2 border-gold/30 rounded-2xl w-32 text-center text-2xl font-bold focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                    />
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-gray-700">
                        {getCurrentGuestRange().label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getCurrentGuestRange().icon} Perfect for this group size
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Guest Selection */}
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 25, 50, 100, 200, 500].map((count) => (
                      <button
                        key={count}
                        onClick={() => setGuestCount(count)}
                        className="px-4 py-2 bg-white/70 hover:bg-gold hover:text-white rounded-xl transition-all duration-300 text-sm font-medium border border-gray-200"
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Budget Analysis */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <h5 className="text-lg font-bold text-forest mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Smart Budget Analysis
                  </h5>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/80 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-gold">₹{budgetAnalysis.avgPricePerHead}</div>
                      <div className="text-sm text-gray-600">Smart avg per head</div>
                    </div>
                    <div className="bg-white/80 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-forest">₹{budgetAnalysis.totalEstimate.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total estimate</div>
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <Badge className={cn(
                      "text-white text-lg px-4 py-2",
                      budgetAnalysis.budgetLevel === 'Budget-Friendly' ? 'bg-green-500' :
                      budgetAnalysis.budgetLevel === 'Moderate' ? 'bg-yellow-500' : 'bg-purple-500'
                    )}>
                      {budgetAnalysis.budgetLevel} Event
                    </Badge>
                  </div>

                  {budgetAnalysis.savings > 0 && (
                    <div className="bg-green-100 border border-green-300 rounded-xl p-3 text-center">
                      <div className="text-green-800 font-semibold">💰 Group Discount!</div>
                      <div className="text-sm text-green-700">Save ₹{budgetAnalysis.savings.toLocaleString()} with bulk pricing</div>
                    </div>
                  )}

                  <div className="mt-4 text-xs text-gray-600 text-center">
                    Premium pricing (₹200-300 per head) for {eventType} events
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Planning Features */}
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div className="text-center p-4 bg-white/60 rounded-2xl">
                <Utensils className="h-8 w-8 text-gold mx-auto mb-2" />
                <div className="font-semibold text-forest">Menu Items</div>
                <div className="text-2xl font-bold text-gray-800">{filteredItems.length}</div>
                <div className="text-sm text-gray-600">Available dishes</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-2xl">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="font-semibold text-forest">Serving Size</div>
                <div className="text-2xl font-bold text-gray-800">{Math.ceil(guestCount * 1.2)}</div>
                <div className="text-sm text-gray-600">Recommended portions</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-2xl">
                <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="font-semibold text-forest">Prep Time</div>
                <div className="text-2xl font-bold text-gray-800">{Math.max(2, Math.ceil(guestCount / 50))}h</div>
                <div className="text-sm text-gray-600">Estimated preparation</div>
              </div>
            </div>

            {/* Menu Selection Helper */}
            {selectedItems.size > 0 && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <h6 className="font-semibold text-blue-800 mb-2">Selected Items ({selectedItems.size})</h6>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedItems).map((itemName) => (
                    <Badge key={itemName} className="bg-blue-500 text-white">
                      {itemName}
                      <button 
                        onClick={() => toggleItemSelection(itemName)}
                        className="ml-2 text-blue-200 hover:text-white"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <button 
                  onClick={() => setSelectedItems(new Set())}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all selections
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-6xl w-full">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 justify-center">
              <Filter className="h-6 w-6 text-gold" /> 
              <span className="bg-gradient-to-r from-forest to-green-600 bg-clip-text text-transparent">
                Filter Menu
              </span>
            </h3>
            
            {/* Category Filters */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-center text-gray-700">By Category</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge 
                  variant="outline"
                  className={cn(
                    "cursor-pointer px-6 py-3 text-base rounded-full transition-all duration-300 hover:scale-105",
                    selectedCategory === 'all' ? "bg-gradient-to-r from-gold to-yellow-500 text-white border-gold shadow-lg" : "bg-white hover:bg-gray-50"
                  )}
                  onClick={() => setSelectedCategory('all')}
                >
                  <span className="mr-2">🍽️</span>
                  All Items
                </Badge>
                <Badge 
                  variant="outline"
                  className={cn(
                    "cursor-pointer px-6 py-3 text-base rounded-full transition-all duration-300 hover:scale-105",
                    selectedCategory === 'veg' ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500 shadow-lg" : "bg-white hover:bg-gray-50"
                  )}
                  onClick={() => setSelectedCategory('veg')}
                >
                  <span className="mr-2">🌱</span>
                  Vegetarian
                </Badge>
                <Badge 
                  variant="outline"
                  className={cn(
                    "cursor-pointer px-6 py-3 text-base rounded-full transition-all duration-300 hover:scale-105",
                    selectedCategory === 'non-veg' ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-lg" : "bg-white hover:bg-gray-50"
                  )}
                  onClick={() => setSelectedCategory('non-veg')}
                >
                  <span className="mr-2">🍖</span>
                  Non-Vegetarian
                </Badge>
              </div>
            </div>

            {/* Course Filters */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-center text-gray-700">By Course</h4>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge 
                  variant="outline"
                  className={cn(
                    "cursor-pointer px-6 py-3 text-base rounded-full transition-all duration-300 hover:scale-105",
                    selectedCourse === 'all' ? "bg-gradient-to-r from-forest to-green-600 text-white border-forest shadow-lg" : "bg-white hover:bg-gray-50"
                  )}
                  onClick={() => setSelectedCourse('all')}
                >
                  <span className="mr-2">🍽️</span>
                  All Courses
                </Badge>
                {courseOrder.map((course) => (
                  <Badge 
                    key={course.key}
                    variant="outline"
                    className={cn(
                      "cursor-pointer px-6 py-3 text-base rounded-full transition-all duration-300 hover:scale-105",
                      selectedCourse === course.key ? 
                        "bg-gradient-to-r from-forest to-green-600 text-white border-forest shadow-lg" : 
                        "bg-white hover:bg-gray-50"
                    )}
                    onClick={() => setSelectedCourse(course.key === selectedCourse ? 'all' : course.key as CourseType)}
                  >
                    <span className="mr-2">{course.icon}</span>
                    {course.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filtered Results Display */}
        <div className="text-center mb-8">
          <p className="text-lg text-forest font-medium">
            Showing {filteredItems.length} items
            {selectedCategory !== 'all' && ` • ${selectedCategory === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}`}
            {selectedCourse !== 'all' && ` • ${courseOrder.find(c => c.key === selectedCourse)?.label}`}
          </p>
        </div>

        {/* Menu Preview with Enhanced Design */}
        <div className="mt-12 space-y-16">
          {courseOrder.map((course) => {
            const courseName = course.key as string;
            const items = groupedItems[courseName] || [];
            
            if (items.length === 0) return null;
            
            return (
              <div key={courseName} className="relative">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="text-4xl">{course.icon}</span>
                      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-forest to-green-600 bg-clip-text text-transparent">
                        {course.label}
                      </h3>
                      <span className="text-4xl">{course.icon}</span>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-gold to-yellow-500 mx-auto rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.slice(0, 6).map((item) => (
                      <Card key={item.name} className="overflow-hidden transition-all duration-500 hover:shadow-2xl border-0 bg-white/80 backdrop-blur-sm group hover:scale-105">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-3 right-3">
                            <div className="bg-gradient-to-r from-gold to-yellow-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                              ₹{item.pricePerHead}
                            </div>
                          </div>
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Badge className={`border-0 ${
                              item.category === 'veg' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              item.category === 'non-veg' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                              'bg-gradient-to-r from-amber-500 to-orange-500'
                            } text-white`}>
                              <span className="mr-1">
                                {item.category === 'veg' ? '🌱' : item.category === 'non-veg' ? '🍖' : '🍽️'}
                              </span>
                              {item.category === 'veg' ? 'Pure Veg' : 
                               item.category === 'non-veg' ? 'Non-Veg' : 
                               item.category}
                            </Badge>
                          </div>
                          <div className="absolute top-3 left-3">
                            <button
                              onClick={() => toggleItemSelection(item.name)}
                              className={cn(
                                "p-2 rounded-full transition-all duration-300",
                                selectedItems.has(item.name) 
                                  ? "bg-gold text-white shadow-lg" 
                                  : "bg-white/80 text-gray-600 hover:bg-white hover:text-gold"
                              )}
                            >
                              <Star className={cn(
                                "h-4 w-4",
                                selectedItems.has(item.name) ? "fill-current" : ""
                              )} />
                            </button>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h4 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-forest transition-colors duration-300">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600">Authentic</span>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500">Per person</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {items.length > 6 && (
                    <div className="text-center mt-8">
                      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-2xl p-4 inline-block">
                        <p className="text-lg font-semibold text-orange-800 mb-2">
                          <span className="text-2xl mr-2">✨</span>
                          {items.length - 6} more delicious {courseName} items available!
                        </p>
                        <p className="text-sm text-orange-600">
                          Explore our full collection on the menu page
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-forest via-green-600 to-emerald-600 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Experience Authentic Flavors?
            </h3>
            <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
              Discover our complete collection of traditional dishes crafted with love and authentic spices
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-gold hover:bg-yellow-500 text-forest text-xl px-10 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Link to="/menu?category=veg">
                  <Sparkles className="mr-2 h-6 w-6" />
                  View Vegetarian Menu
                  <Sparkles className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white text-xl px-10 py-6 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Link to="/menu">
                  <Star className="mr-2 h-6 w-6" />
                  View Complete Menu
                  <Star className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuGallery;
