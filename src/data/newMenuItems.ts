
import { MenuItem } from '@/types/menu';

export const newMenuItems: MenuItem[] = [
  // Rice and Biryani Items
  {
    name: "Chicken Biryani",
    description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs",
    image: "/lovable-uploads/49fb70c2-f213-45cb-9811-b00211b82e59.png",
    pricePerHead: 189,
    category: "non-veg",
    type: "rice",
    course: "main"
  },
  {
    name: "Mutton Biryani",
    description: "Traditional slow-cooked mutton biryani with saffron and whole spices",
    image: "/lovable-uploads/c2b1f777-7ba7-4329-b2da-2a9aa88c3544.png",
    pricePerHead: 229,
    category: "non-veg",
    type: "rice",
    course: "main"
  },
  
  // Starters
  {
    name: "Paneer Tikka",
    description: "Grilled cottage cheese cubes marinated in spices, served with mint chutney",
    image: "/lovable-uploads/65825dfb-1524-404c-b09e-7038bbfa8eea.png",
    pricePerHead: 149,
    category: "veg",
    type: "starter",
    course: "starters"
  },
  {
    name: "Tandoori Chicken",
    description: "Succulent chicken pieces marinated in yogurt and spices, grilled to perfection",
    image: "/lovable-uploads/b82a23ab-a0f5-424f-9b6a-8026a7a0c366.png",
    pricePerHead: 179,
    category: "non-veg",
    type: "starter",
    course: "starters"
  },
  
  // Bread Items
  {
    name: "Puri (Deep Fried Bread)",
    description: "Crispy deep-fried bread, perfect with curries and vegetables",
    image: "/lovable-uploads/274138e3-44ec-4fc2-81a6-c94b27758774.png",
    pricePerHead: 39,
    category: "veg",
    type: "bread",
    course: "main"
  },
  
  // Main Course - changed from "curry" to "main"
  {
    name: "Dal Tadka Special",
    description: "Yellow lentils tempered with aromatic spices and fresh herbs",
    image: "/lovable-uploads/0e5581d0-00a3-4186-ae22-c4a753b97fee.png",
    pricePerHead: 89,
    category: "veg",
    type: "main",
    course: "main"
  },
  
  // Pasta/Continental - changed from "pasta" to "main"
  {
    name: "Penne Arrabbiata",
    description: "Italian pasta in spicy tomato sauce with sun-dried tomatoes and herbs",
    image: "/lovable-uploads/9aaf8acb-f78f-4f5d-81cf-0024938f7567.png",
    pricePerHead: 159,
    category: "veg",
    type: "main",
    course: "main"
  }
];
