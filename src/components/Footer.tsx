import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl text-primary mb-4">EcomX</h3>
          <p className="text-muted-foreground text-sm">
            Your ultimate destination for quality items. Experience the best products curated just for you.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/explore" className="hover:text-primary">Explore</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-muted-foreground">
            {/* Using text links as social icons placeholder */}
            <a href="https://facebook.com" className="hover:text-primary" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://twitter.com" className="hover:text-primary" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://instagram.com" className="hover:text-primary" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} EcomX. All rights reserved.
      </div>
    </footer>
  );
}