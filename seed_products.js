import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from backend .env
dotenv.config({ path: path.join('C:', 'Projects', 'EcomX-backend', '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ecomx_db:Dd35BR3zwQaqVSzS@cluster0.4rgvatj.mongodb.net/ecomx?appName=Cluster0';

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  rating: { type: Number, default: 0 },
  location: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Item = mongoose.model('Item', ItemSchema);

const products = [
  // 4 Featured Products (Premium/High-End)
  {
    title: "Apple Vision Pro",
    description: "The era of spatial computing is here. Experience an infinite canvas that transforms how you use the apps you love.",
    price: 3499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "Global"
  },
  {
    title: "Herman Miller Embody",
    description: "Designed with physicians and PhDs in ergonomics. Embody set a new benchmark for pressure distribution and spinal alignment.",
    price: 1895,
    category: "Home & Office",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop",
    rating: 4.8,
    location: "USA"
  },
  {
    title: "Sony A7R V Mirrorless",
    description: "Packed with pro features. A new AI processing unit delivers next-generation autofocus for high-resolution photography.",
    price: 3899,
    category: "Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "Japan"
  },
  {
    title: "Rolex Submariner Date",
    description: "The reference among divers' watches. A masterpiece of engineering that combines function and style effortlessly.",
    price: 12500,
    category: "Watch",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595dd?w=800&auto=format&fit=crop",
    rating: 5.0,
    location: "Swiss"
  },
  {
    title: "M2 Ultra Mac Studio",
    description: "Personal computer engineering at its peak. Designed to handle the most complex creative workflows ever conceived.",
    price: 3999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1662916668700-1126ca108f9f?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "USA"
  },
  {
    title: "Tesla Cyberquad",
    description: "An all-electric four-wheel ride-on inspired by our iconic Cybertruck design for the next generation of riders.",
    price: 1900,
    category: "Automotive",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop",
    rating: 4.8,
    location: "USA"
  },
  {
    title: "Beolab 90 Speaker",
    description: "The ultimate loudspeaker for acoustic performance. A truly powerful digital loudspeaker with unmatched precision.",
    price: 85000,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1589003077984-894efc33bb72?w=800&auto=format&fit=crop",
    rating: 5.0,
    location: "Denmark"
  },
  {
    title: "Omega Speedmaster Moonwatch",
    description: "The first watch worn on the moon. A legendary chronograph that represents the pioneering spirit of Omega.",
    price: 6400,
    category: "Watch",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "Swiss"
  },

  // Explore Items
  {
    title: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation. Crystal-clear hands-free calling and up to 30 hours of battery life.",
    price: 398,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1644794106607-a14704f7622d?w=800&auto=format&fit=crop",
    rating: 4.7,
    location: "Japan"
  },
  {
    title: "Nike Air Max 270",
    description: "Nike's first lifestyle Air Max brings you style, comfort and big attitude with every step you take.",
    price: 160,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
    rating: 4.5,
    location: "USA"
  },
  {
    title: "MacBook Pro M3 Max",
    description: "The most advanced chips ever built for a personal computer. Liquid Retina XDR display is the best ever in a laptop.",
    price: 3299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714460-4c5042699f14?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "USA"
  },
  {
    title: "Leica Q3 Camera",
    description: "A uniquely powerful full-frame camera that delivers extraordinary image quality in a compact build.",
    price: 5995,
    category: "Camera",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop",
    rating: 4.8,
    location: "Germany"
  },
  {
    title: "Dyson V15 Detect",
    description: "The most powerful, intelligent cordless vacuum. Laser reveals microscopic dust you can't see on hard floors.",
    price: 749,
    category: "Home Appliances",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop",
    rating: 4.6,
    location: "UK"
  },
  {
    title: "Nintendo Switch OLED",
    description: "Featuring a vibrant 7-inch OLED screen, a wide adjustable stand, and enhanced audio for immersive gaming.",
    price: 349,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1578303372216-814157bc92d7?w=800&auto=format&fit=crop",
    rating: 4.7,
    location: "Japan"
  },
  {
    title: "Samsung S24 Ultra",
    description: "Welcome to the era of mobile AI. With Galaxy S24 Ultra, you can unleash whole new levels of creativity.",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945415295-d9b896472d7e?w=800&auto=format&fit=crop",
    rating: 4.8,
    location: "South Korea"
  },
  {
    title: "Fender Stratocaster",
    description: "The icon of electric guitars. Known for its versatile tone and comfortably body contoured for performance.",
    price: 1599,
    category: "Music",
    image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "USA"
  },
  {
    title: "DJI Mavic 3 Pro",
    description: "The most advanced camera drone for legendary content. Triple-camera system for multiple perspectives.",
    price: 2199,
    category: "Drone",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop",
    rating: 4.8,
    location: "China"
  },
  {
    title: "Bose Ultra Soundbar",
    description: "An incredibly immersive soundbar. Get hooked by the sound that surrounds you for every movie and song.",
    price: 899,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop",
    rating: 4.7,
    location: "USA"
  },
  {
    title: "Logitech MX Master 3S",
    description: "The iconic mouse remastered. Experience tactile quiet clicks and 8K DPI track-on-glass performance.",
    price: 99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "Switzerland"
  },
  {
    title: "Secretlab TITAN Evo",
    description: "Award-winning ergonomic comfort. Engineered with pro-grade materials for the maximum support.",
    price: 549,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1616531106034-585582a9344f?w=800&auto=format&fit=crop",
    rating: 4.8,
    location: "Singapore"
  },
  {
    title: "KitchenAid Artisan",
    description: "The legendary stand mixer. From pasta to pie crust, do it all with over 10 attachments.",
    price: 449,
    category: "Home Appliances",
    image: "https://images.unsplash.com/photo-1591140934059-0524ba3ae220?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "USA"
  },
  {
    title: "Ray-Ban Meta Smart",
    description: "Listen, call, and livestream with Ray-Ban Meta smart glasses. The ultimate wearable tech accessory.",
    price: 299,
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop",
    rating: 4.6,
    location: "Italy"
  },
  {
    title: "Rimowa Original Cabin",
    description: "The ultimate aluminum travel suitcase. Indestructible, timeless, and engineered for high-end travel.",
    price: 1430,
    category: "Travel",
    image: "https://images.unsplash.com/photo-1581553670359-a39b0dcaee7d?w=800&auto=format&fit=crop",
    rating: 4.9,
    location: "Germany"
  },
  {
    title: "Eames Lounge Chair",
    description: "The pinnacle of lounge seating. A masterpiece of mid-century design that offers unmatched comfort.",
    price: 6995,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&auto=format&fit=crop",
    rating: 5.0,
    location: "USA"
  },
  {
    title: "Peloton Bike+",
    description: "A cardio experience like no other. Integrated with a rotating screen and auto-resistance technology.",
    price: 2495,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop",
    rating: 4.7,
    location: "USA"
  },
  {
    title: "GoPro Hero 12 Black",
    description: "High-end action footage with incredible stability and cinematic quality. The rugged outdoor companion.",
    price: 399,
    category: "Camera",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&auto=format&fit=crop",
    rating: 4.8,
    location: "USA"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing products to avoid duplicates when re-seeding
    await Item.deleteMany({}); 
    
    // Add real images and data
    const result = await Item.insertMany(products);
    console.log(`Successfully added ${result.length} products to database.`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
