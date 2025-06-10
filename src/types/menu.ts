
export interface MenuItem {
  name: string;
  description: string;
  image: string;
  pricePerHead: number;
  category: 'veg' | 'non-veg' | 'bread' | 'rice' | 'dessert' | 'salad' | 'beverage' | 'soup' | 'starter';
  type?: 'starter' | 'main' | 'bread' | 'rice' | 'dessert' | 'soup' | 'beverage' | 'salad';
  course?: 'starters' | 'main' | 'desserts' | 'beverages';
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface PaginationOptions {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
