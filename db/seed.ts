import { getDb } from "../api/queries/connection";
import { menuItems } from "./schema";

async function seed() {
  const db = getDb();

  const existing = await db.select().from(menuItems);
  if (existing.length > 0) {
    console.log("Menu items already seeded.");
    return;
  }

  const items = [
    // Chinese
    { name: "Crispy Paneer", description: "Golden fried cottage cheese cubes tossed in special sauce", price: "189.00", category: "chinese" as const, image: "/images/chilli-paneer.jpg", isSpecial: false },
    { name: "Paneer Chilli", description: "Indo-Chinese style paneer with bell peppers and onions", price: "209.00", category: "chinese" as const, image: "/images/chilli-paneer.jpg", isSpecial: true },
    { name: "Veg Manchurian", description: "Mixed vegetable balls in spicy Manchurian gravy", price: "169.00", category: "chinese" as const, isSpecial: false },
    { name: "Chicken Chilli", description: "Tender chicken pieces stir-fried with chillies and capsicum", price: "219.00", category: "chinese" as const, isSpecial: true },
    { name: "Chicken Manchurian", description: "Crispy chicken in rich Manchurian sauce", price: "209.00", category: "chinese" as const, isSpecial: false },
    { name: "Schezwan Fried Rice", description: "Spicy Schezwan style fried rice with vegetables", price: "159.00", category: "chinese" as const, isSpecial: false },

    // Tandoor
    { name: "Paneer Malai Tikka", description: "Creamy marinated cottage cheese grilled to perfection", price: "219.00", category: "tandoor" as const, isSpecial: false },
    { name: "Paneer Achari Tikka", description: "Pickle-flavoured paneer tikka with aromatic spices", price: "169.00", category: "tandoor" as const, isSpecial: false },
    { name: "Paneer Kali Mirch Tikka", description: "Black pepper crusted paneer, smoky and flavourful", price: "245.00", category: "tandoor" as const, isSpecial: true },
    { name: "Tandoori Platter", description: "Assorted tandoori delicacies for the ultimate feast", price: "449.00", category: "tandoor" as const, image: "/images/menu-starters.jpg", isSpecial: true },
    { name: "Paneer Haryali Tikka", description: "Herb-marinated green paneer tikka", price: "199.00", category: "tandoor" as const, isSpecial: false },

    // Thali
    { name: "Maharaja Thali", description: "Butter roti, kadhai paneer, mix veg, dal, papad, pickle, pulao, sweets, salad", price: "299.00", category: "thali" as const, image: "/images/menu-thalis.jpg", isSpecial: false },
    { name: "Deluxe Thali", description: "Butter roti, paneer lababdar, mix veg, dal makhani, papad, pickle, rice, sweets, salad", price: "339.00", category: "thali" as const, isSpecial: false },
    { name: "Awadh Thali", description: "Rumali roti, chicken korma, roasted chicken, rice, sweets, pickle, papad, salad", price: "349.00", category: "thali" as const, isSpecial: false },
    { name: "Mughlai Thali", description: "Lachha paratha, chicken lababdar, biryani rice, sweet, pickle, papad, salad", price: "399.00", category: "thali" as const, isSpecial: false },
    { name: "Blessings Special Thali", description: "Paneer angara, shahi paneer, mix veg, aloo gobhi, dal fry, dal makhani, butter naan, lacha paratha, pulao, salad, gulab jamun, ice cream", price: "499.00", category: "thali" as const, image: "/images/menu-thalis.jpg", isSpecial: true },
    { name: "Plain Thali", description: "Tandoori roti, dal, vegetable sabzi, papad, pickle, salad, plain rice", price: "159.00", category: "thali" as const, isSpecial: false },

    // Bakery
    { name: "Chocolate Drip Cake", description: "Two-tier chocolate cake with macarons and candy decorations", price: "899.00", category: "bakery" as const, image: "/images/chocolate-cake.jpg", isSpecial: true },
    { name: "Custom Birthday Cake", description: "Personalized birthday cake with your choice of design and flavour", price: "649.00", category: "bakery" as const, image: "/images/chocolate-cake.jpg", isSpecial: false },
    { name: "Fresh Cream Pastry", description: "Light and fluffy fresh cream pastry with fruit toppings", price: "89.00", category: "bakery" as const, isSpecial: false },
    { name: "Chocolate Truffle", description: "Rich chocolate truffle with ganache filling", price: "129.00", category: "bakery" as const, isSpecial: false },

    // Cafe
    { name: "Cappuccino", description: "Classic Italian cappuccino with heart latte art", price: "129.00", category: "cafe" as const, image: "/images/cappuccino.jpg", isSpecial: false },
    { name: "Latte Art Coffee", description: "Beautifully crafted latte with intricate foam art", price: "149.00", category: "cafe" as const, image: "/images/coffee-art.jpg", isSpecial: true },
    { name: "Freak Shake", description: "Loaded milkshake with whipped cream, sprinkles and chocolate", price: "249.00", category: "cafe" as const, image: "/images/freak-shake.jpg", isSpecial: true },
    { name: "Cold Coffee", description: "Chilled coffee blend topped with ice cream", price: "179.00", category: "cafe" as const, isSpecial: false },

    // Desserts
    { name: "Gulab Jamun", description: "Warm milk dumplings soaked in rose-flavoured sugar syrup", price: "79.00", category: "desserts" as const, isSpecial: false },
    { name: "Rasmalai", description: "Soft cottage cheese patties in saffron milk", price: "99.00", category: "desserts" as const, isSpecial: false },
    { name: "Ice Cream Sundae", description: "Triple scoop ice cream with chocolate sauce and nuts", price: "149.00", category: "desserts" as const, isSpecial: false },
    { name: "Chocolate Brownie", description: "Warm chocolate brownie with vanilla ice cream", price: "179.00", category: "desserts" as const, isSpecial: true },
  ];

  for (const item of items) {
    await db.insert(menuItems).values(item);
  }

  console.log(`Seeded ${items.length} menu items.`);
}

seed().catch(console.error);
