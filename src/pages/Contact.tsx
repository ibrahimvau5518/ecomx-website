import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Custom icons to avoid version conflicts in lucide-react
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-1 2.17-2 2.51c0 0-1 0-1.5 0-.5 0-1 .5-1.5 1S16 10 16 10s.5 2 1.5 4 3 4 3 4-1 1-3 1-4-2-4-2-2 1-4 1-4-2-4-2c0 0-1-1-1.5-2S3 12 3 12s1-1 2-1c.5 0 1-.5 1-1S5 8 5 8s1-1 2-1c.5 0 1-.5 1-1S8 4 8 4s1-1 2-1c.5 0 1-.5 1-1S11 0 11 0s1.5 1 3 3c0 0 2 0 3-1 1-1 2-2 2-2z"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter text-white uppercase italic">
            Get In <span className="text-primary-purple">Touch</span>
          </h1>
          <p className="text-xl text-foreground-secondary leading-relaxed">
            Have a question or want to collaborate? Our team is standing by to help you.
            Expect a response within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-container p-8 border border-border/50 bg-[#111827]/40 backdrop-blur-md rounded-2xl h-full">
              <h3 className="text-2xl font-bold mb-8 uppercase italic border-b border-border/50 pb-4">Our HQ</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-purple/10 rounded-lg text-primary-purple">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Address</h4>
                    <p className="text-foreground-secondary">123 Digital Avenue, Tech Hub<br />Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-cyan/10 rounded-lg text-primary-cyan">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Email</h4>
                    <p className="text-foreground-secondary">jibonm676@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">Phone</h4>
                    <p className="text-foreground-secondary">+880 1827-195518<br />Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>
              </div>

              <div className="pt-12">
                <h4 className="font-bold text-white mb-4 uppercase text-xs tracking-[0.2em]">Follow Us</h4>
                <div className="flex gap-4">
                   <div className="p-2 bg-muted rounded-full hover:bg-primary transition-colors cursor-pointer"><InstagramIcon className="w-5 h-5" /></div>
                   <div className="p-2 bg-muted rounded-full hover:bg-primary transition-colors cursor-pointer"><TwitterIcon className="w-5 h-5" /></div>
                   <div className="p-2 bg-muted rounded-full hover:bg-primary transition-colors cursor-pointer"><FacebookIcon className="w-5 h-5" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card-container p-8 md:p-12 border border-border/50 bg-[#111827]/40 backdrop-blur-md rounded-2xl h-full">
              <h3 className="text-2xl font-bold mb-8 uppercase italic">Send a Message</h3>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="input-field py-3" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="input-field py-3" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Subject</label>
                  <select className="input-field py-3">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Business Collaboration</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Your Message</label>
                  <textarea placeholder="Tell us what's on your mind..." className="input-field py-3 h-32" />
                </div>

                <button className="btn-primary w-full h-14 text-lg flex items-center justify-center gap-2 group shadow-glow-purple">
                  Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
