
import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { ContactForm } from '@/components/contact/ContactForm';
import { MenuItem, CartItem, PaginationOptions } from '@/types/menu';
import { menuItems } from '@/data/menuItems';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from 'react-router-dom';

const MenuPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();
  const contactFormRef = React.useRef<HTMLDivElement>(null);
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationOptions>({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0
  });
  const [activeFilter, setActiveFilter] = useState<string>(categoryFromUrl);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [courseFilter, setCourseFilter] = useState<'all' | 'starters' | 'main' | 'desserts' | 'beverages'>('all');

  // Filter menu items based on both category and course filters
  const filteredItems = React.useMemo(() => {
    return menuItems.filter(item => {
      // Category filter (veg/non-veg)
      const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
      
      // Course filter
      const courseMatch = courseFilter === 'all' || item.course === courseFilter;
      
      return categoryMatch && courseMatch;
    });
  }, [categoryFilter, courseFilter]);

  // Update total items count when filtered items change
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      totalItems: filteredItems.length
    }));
  }, [filteredItems]);

  // Get current page items
  const currentItems = React.useMemo(() => {
    const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
    return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredItems, pagination.currentPage, pagination.itemsPerPage]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set filters based on URL parameter
    if (categoryFromUrl === 'veg') {
      setCategoryFilter('veg');
    } else if (categoryFromUrl === 'non-veg') {
      setCategoryFilter('non-veg');
    }
  }, [categoryFromUrl]);

  const addToCart = (item: MenuItem) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.name === item.name);
      
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.name === itemName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemName: string) => {
    setCart(currentCart => currentCart.filter(item => item.name !== itemName));
    toast({
      title: "Removed from cart",
      description: `${itemName} has been removed from your cart.`,
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.pricePerHead * item.quantity * guestCount), 0);
  };

  // Updated function to scroll to contact form when proceed button is clicked
  const scrollToContactForm = () => {
    if (contactFormRef.current) {
      // Close the cart first
      setIsCartOpen(false);
      
      // Add a small delay to ensure the cart is closed before scrolling
      setTimeout(() => {
        contactFormRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  };

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
    window.scrollTo(0, 0);
  };

  // Generate page numbers for pagination
  const pageNumbers = () => {
    const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    let pages = [];

    if (totalPages <= 7) {
      // Show all pages if there are 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination for many pages
      if (pagination.currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (pagination.currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push('ellipsis');
        for (let i = pagination.currentPage - 1; i <= pagination.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Filter options
  const categoryFilters = [
    { key: 'all', label: 'All Items' },
    { key: 'veg', label: 'Vegetarian' },
    { key: 'non-veg', label: 'Non-Vegetarian' }
  ];

  const courseFilters = [
    { key: 'all', label: 'All Courses' },
    { key: 'starters', label: 'Starters' },
    { key: 'main', label: 'Main Course' },
    { key: 'desserts', label: 'Desserts' },
    { key: 'beverages', label: 'Beverages' }
  ];

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-forest mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600 mb-6">
            Explore our authentic Indian cuisine, carefully crafted with traditional recipes
          </p>
          
          {/* Guest count and cart */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <label htmlFor="guests" className="font-medium">Number of Guests:</label>
              <Input
                type="number"
                id="guests"
                min="1"
                value={guestCount}
                onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24"
              />
            </div>
            
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-gold text-white">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle>Your Cart ({cart.length} items)</SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col h-full overflow-hidden">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1">
                      <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">Your cart is empty</p>
                      <Button 
                        className="mt-4" 
                        variant="outline"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <>
                      {/* Scrollable container for cart items - takes remaining space */}
                      <div className="flex-1 overflow-hidden">
                        <ScrollArea className="h-full pr-4">
                          <div className="space-y-4 pb-4">
                            {cart.map((item) => (
                              <div key={item.name} className="flex items-center gap-3 border-b pb-4">
                                <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-medium truncate">{item.name}</h3>
                                  <p className="text-sm text-gray-500">₹{item.pricePerHead} per person</p>
                                </div>
                                
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(item.name, item.quantity - 1)}
                                    className="h-8 w-8"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => updateQuantity(item.name, item.quantity + 1)}
                                    className="h-8 w-8"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(item.name)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                      
                      {/* Fixed footer with totals and button */}
                      <div className="flex-shrink-0 pt-4 border-t bg-background">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>₹{calculateTotal()}</span>
                          </div>
                          <div className="flex justify-between font-medium text-lg">
                            <span>Total for {guestCount} {guestCount === 1 ? 'guest' : 'guests'}</span>
                            <span>₹{calculateTotal()}</span>
                          </div>
                          <Button 
                            className="w-full bg-gold hover:bg-gold/90 text-white h-12"
                            onClick={scrollToContactForm}
                          >
                            Proceed to Contact Us
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="mb-8 space-y-6">
          {/* Category Filters (Veg/Non-Veg) */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-forest">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {categoryFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={categoryFilter === filter.key ? 'default' : 'outline'}
                  onClick={() => {
                    setCategoryFilter(filter.key as 'all' | 'veg' | 'non-veg');
                    setPagination(prev => ({ ...prev, currentPage: 1 }));
                  }}
                  className={categoryFilter === filter.key ? 'bg-gold hover:bg-gold/90' : ''}
                >
                  {filter.label}
                  <Badge variant="secondary" className="ml-2">
                    {filter.key === 'all' 
                      ? menuItems.length
                      : menuItems.filter(item => item.category === filter.key).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Course Filters */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-forest">Filter by Course</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {courseFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={courseFilter === filter.key ? 'default' : 'outline'}
                  onClick={() => {
                    setCourseFilter(filter.key as 'all' | 'starters' | 'main' | 'desserts' | 'beverages');
                    setPagination(prev => ({ ...prev, currentPage: 1 }));
                  }}
                  className={courseFilter === filter.key ? 'bg-forest hover:bg-forest/90' : ''}
                >
                  {filter.label}
                  <Badge variant="secondary" className="ml-2">
                    {filter.key === 'all' 
                      ? menuItems.length
                      : menuItems.filter(item => item.course === filter.key).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Display filtered items count */}
        <div className="text-center mb-6">
          <p className="text-md text-forest">
            Showing {currentItems.length} of {filteredItems.length} items
            {categoryFilter !== 'all' && ` (${categoryFilter})`}
            {courseFilter !== 'all' && ` - ${courseFilter}`}
          </p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <Card key={item.name} className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <Badge className={`absolute top-2 right-2 ${
                    item.category === 'veg' ? 'bg-green-500' : 
                    item.category === 'non-veg' ? 'bg-red-500' : 
                    'bg-amber-500'
                  }`}>
                    {item.category === 'veg' ? '🌱 Veg' : 
                     item.category === 'non-veg' ? '🍖 Non-Veg' : 
                     item.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 h-12 overflow-hidden">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-forest font-semibold">₹{item.pricePerHead}</p>
                    <Button 
                      onClick={() => addToCart(item)}
                      className="bg-gold hover:bg-gold/90"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-lg text-gray-500">No items found for this selection.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalItems > pagination.itemsPerPage && (
          <div className="my-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
                    className={pagination.currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {pageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        isActive={page === pagination.currentPage}
                        onClick={() => handlePageChange(page as number)}
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(
                      Math.ceil(pagination.totalItems / pagination.itemsPerPage),
                      pagination.currentPage + 1
                    ))}
                    className={
                      pagination.currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage)
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <div 
          ref={contactFormRef}
          id="contact-form" 
          className="mt-16 pt-16 scroll-m-20"
        >
          <h2 className="text-2xl font-bold text-forest mb-6 text-center">Contact Us to Place Your Order</h2>
          <Card className="max-w-xl mx-auto">
            <CardContent className="p-6">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
