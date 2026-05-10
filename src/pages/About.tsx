import { motion } from "framer-motion";
import { Globe, Zap, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white uppercase italic">
            Defining <span className="text-primary-cyan">EcomX</span>
          </h1>
          <p className="text-xl text-foreground-secondary leading-relaxed">
            We are not just a marketplace. We are a digital ecosystem engineered to redefine how you experience commerce. 
            Blending cutting-edge technology with premium curation, we bring the future of shopping to your fingertips.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden aspect-video relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" 
              alt="Our Team" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Our Mission</h2>
            <p className="text-foreground-secondary leading-relaxed text-lg">
              To empower every individual with access to premium, authentic products through a fluid and high-performance platform. 
              We believe in transparency, speed, and absolute quality.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div>
                <h4 className="text-primary-cyan font-bold text-3xl">10K+</h4>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mt-1">Active Users</p>
              </div>
              <div>
                <h4 className="text-primary-purple font-bold text-3xl">24/7</h4>
                <p className="text-muted-foreground text-sm uppercase tracking-widest mt-1">Smart Support</p>
              </div>
            </div>
          </motion.div>
        </div>

        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold uppercase tracking-widest italic">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Authenticity", desc: "Every product on our platform is verified for 100% authenticity.", icon: <Globe className="w-8 h-8" /> },
              { title: "Performance", desc: "Our platform is optimized for speed, providing a zero-lag experience.", icon: <Zap className="w-8 h-8" /> },
              { title: "Innovation", desc: "Integration of AI and modern tech to personalize your journey.", icon: <Sparkles className="w-8 h-8" /> }
            ].map((v, i) => (
              <div key={i} className="card-container p-8 border border-border/50 bg-[#111827]/40 backdrop-blur-md rounded-2xl">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase italic">{v.title}</h3>
                <p className="text-foreground-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
