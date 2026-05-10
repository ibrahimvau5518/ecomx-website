import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Truck, ShieldCheck, Headphones, Smartphone, Shirt, Home as HomeIcon, Zap } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      bounce: 0.4,
      duration: 0.8
    } as any
  }
};

const FEATURES = [
  {
    title: 'Fast Delivery',
    desc: 'Swift door-to-door shipping across the country within 24-48 hours.',
    icon: <Truck className="w-6 h-6" />,
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    title: 'Secure Payments',
    desc: 'Encrypted transactions with all major cards and mobile banking support.',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'bg-green-500/10 text-green-500'
  },
  {
    title: '24/7 Support',
    desc: 'Dedicated support team and smart AI chatbot available around the clock.',
    icon: <Headphones className="w-6 h-6" />,
    color: 'bg-purple-500/10 text-purple-500'
  }
];

const CATEGORIES = [
  { name: 'Electronics', icon: <Smartphone className="w-6 h-6 mb-2" />, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop' },
  { name: 'Fashion', icon: <Shirt className="w-6 h-6 mb-2" />, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop' },
  { name: 'Home', icon: <HomeIcon className="w-6 h-6 mb-2" />, image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=800&auto=format&fit=crop' },
  { name: 'Gadgets', icon: <Zap className="w-6 h-6 mb-2" />, image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop' }
];

const POPULAR_PRODUCTS = [
  { id: '1', title: 'Apple Vision Pro', price: 3499, desc: 'The era of spatial computing is here.', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&auto=format&fit=crop', category: 'Electronics' },
  { id: '2', title: 'Herman Miller Embody', price: 1895, desc: 'Advanced spinal alignment for peak performance.', image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop', category: 'Home & Office' },
  { id: '3', title: 'Sony A7R V Mirrorless', price: 3899, desc: 'Next-gen AI autofocus for elite photography.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop', category: 'Camera' },
  { id: '4', title: 'Rolex Submariner Date', price: 12500, desc: 'The reference among luxury divers watches.', image: 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?w=800&auto=format&fit=crop', category: 'Watch' },
  { id: '5', title: 'M2 Ultra Mac Studio', price: 3999, desc: 'Personal computer engineering at its peak.', image: 'https://images.unsplash.com/photo-1662916668700-1126ca108f9f?w=800&auto=format&fit=crop', category: 'Electronics' },
  { id: '6', title: 'Tesla Cyberquad', price: 1900, desc: 'An all-electric four-wheel ride-on.', image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&auto=format&fit=crop', category: 'Automotive' },
  { id: '7', title: 'Beolab 90 Speaker', price: 85000, desc: 'The ultimate loudspeaker for acoustics.', image: 'https://images.unsplash.com/photo-1589003077984-894efc33bb72?w=800&auto=format&fit=crop', category: 'Audio' },
  { id: '8', title: 'Omega Speedmaster', price: 6400, desc: 'The first watch worn on the moon.', image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop', category: 'Watch' }
];

export default function Home() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="flex flex-col min-h-screen"
    >
      {/* 1. Highly Modern Animated Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 border-b border-border bg-background">
        
        {/* Floating Background Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-purple/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary-cyan/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

        <motion.div variants={containerVariants} className="container mx-auto relative z-10 text-center max-w-5xl">
          
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-[#1F2937]/50 backdrop-blur-sm text-sm text-primary-cyan font-medium">
              <Sparkles className="w-4 h-4" />
              Introducing EcomX Design System 2.0
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-[1.1]">
            Experience Commerce <br className="hidden md:block"/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan via-primary to-primary-purple">
              Redesigned for the Future
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-foreground-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            A premium, ultra-fast shopping experience wrapped in a highly modern, glassmorphic UI. Engineered for absolute performance and fluid interaction.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/explore" className="btn-primary w-full text-lg h-14 px-8 flex items-center justify-center gap-2 shadow-glow-purple">
                Start Exploring <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/about" className="btn-outline bg-transparent w-full text-lg h-14 px-8 border-[#2D3748] hover:border-foreground-muted text-white">
                View Components
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Features */}
      <section className="section-padding bg-background relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose EcomX</h2>
          <p className="text-muted-foreground text-lg">We provide a seamless and premium shopping experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="card-container p-8 text-center shadow-xl border border-border/50 bg-[#111827]/40 backdrop-blur-md rounded-2xl"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-white">{feature.title}</h3>
              <p className="text-foreground-secondary leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Categories - Redesigned UI */}
      <section className="section-padding bg-muted/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-purple/5 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-white uppercase italic">
                The <span className="text-primary-cyan">Collections</span>
              </h2>
              <p className="text-foreground-secondary text-lg border-l-2 border-primary-cyan pl-6">
                Curated selections of premium goods across our most popular categories. Engineered for quality and style.
              </p>
            </div>
            <div className="hidden lg:block text-[10rem] font-black opacity-5 absolute right-0 top-0 select-none">
              CATX
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2">
            {CATEGORIES.map((cat, idx) => (
              <Link 
                to="/explore" 
                key={cat.name} 
                className={`group relative h-[500px] overflow-hidden transition-all duration-700 ${
                  idx % 2 === 0 ? 'md:mt-8' : 'md:mb-8'
                }`}
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0" 
                />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/20 to-transparent opacity-80" />
                <div className="absolute inset-0 border border-white/5 group-hover:border-primary-cyan/30 transition-colors duration-500 m-4" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="overflow-hidden">
                    <p className="text-primary-cyan text-xs font-bold tracking-[0.3em] uppercase mb-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      Explore Series
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-3xl text-white uppercase tracking-tighter italic scale-95 group-hover:scale-100 origin-left transition-transform duration-500">
                      {cat.name}
                    </h3>
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-primary-cyan group-hover:text-black transition-all duration-500">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Decorative line */}
                  <div className="h-1 w-0 group-hover:w-full bg-primary-cyan transition-all duration-700 mt-6" />
                </div>
                
                {/* Bottom background text for flair */}
                <div className="absolute top-10 right-10 text-white/5 font-black text-6xl select-none group-hover:text-primary-cyan/10 transition-colors">
                  0{idx + 1}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Popular Items */}
      <section className="section-padding bg-background">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Featured Products</h2>
            <p className="text-foreground-secondary text-lg">A handpicked selection of our most trending items right now.</p>
          </div>
          <Link to="/explore" className="group flex items-center gap-2 text-primary-cyan hover:text-white transition-colors font-semibold text-lg">
            Browse Entire Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {POPULAR_PRODUCTS.map((product) => (
            <motion.div 
              key={product.id} 
              whileHover={{ y: -8 }}
              className="card-container overflow-hidden group bg-[#111827]/40 border border-border/50 rounded-2xl flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 right-4 translate-y-[-100%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full shadow-lg">NEW</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-primary-cyan transition-colors line-clamp-1">{product.title}</h3>
                  <span className="font-extrabold text-primary-cyan">${product.price}</span>
                </div>
                <p className="text-foreground-secondary text-sm mb-6 line-clamp-2">
                  {product.desc}
                </p>
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                   <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{product.category}</span>
                   <Link to={`/explore`} className="text-xs font-bold text-white hover:text-primary-cyan transition-colors uppercase tracking-widest">
                    Quick View
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Services */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-xl font-bold mb-2">Fast Delivery</h3>
            <p className="opacity-90">Get your items delivered within 24 hours.</p>
          </div>
          <div>
            <h3 className="font-xl font-bold mb-2">24/7 Support</h3>
            <p className="opacity-90">Our team and AI Chatbot are always here to help.</p>
          </div>
          <div>
            <h3 className="font-xl font-bold mb-2">Secure Payments</h3>
            <p className="opacity-90">100% secure checkout experience.</p>
          </div>
        </div>
      </section>

      {/* 6. Statistics */}
      <section className="section-padding bg-background border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Customers', val: '10k+' },
            { label: 'Products', val: '500+' },
            { label: 'Brands', val: '50+' },
            { label: 'Reviews', val: '25k+' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-primary mb-2">{stat.val}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="section-padding bg-muted/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
             <div key={item} className="card-container p-6">
               <div className="flex text-accent-500 mb-4">★★★★★</div>
               <p className="italic text-muted-foreground mb-6">"This platform has completely changed how I shop. The AI recommendations are spot on and the delivery is incredibly fast."</p>
               <div className="flex items-center gap-4 mt-auto">
                 <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                 <div>
                   <h4 className="font-medium text-sm">Customer {item}</h4>
                   <span className="text-xs text-muted-foreground">Verified Buyer</span>
                 </div>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days.' },
            { q: 'What is your return policy?', a: 'We accept returns within 30 days of purchase.' },
            { q: 'How does the AI Chatbot work?', a: 'Our AI Chatbot acts as a 24/7 assistant, recommending products based on your preferences.' },
          ].map((faq, i) => (
             <div key={i} className="border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
               <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
               <p className="text-muted-foreground text-sm">{faq.a}</p>
             </div>
          ))}
        </div>
      </section>

      {/* 9. CTA / Newsletter */}
      <section className="section-padding bg-primary/10 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className="text-muted-foreground mb-8 text-lg">Get the latest updates, AI recommendations, and exclusive offers directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" className="input-field flex-1" required />
            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe Now</button>
          </form>
        </div>
      </section>
    </motion.div>
  );
}