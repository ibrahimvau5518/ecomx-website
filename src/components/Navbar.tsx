import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const { logout } = useAuth();

  const displayName = user?.name?.trim() || user?.email?.split('@')[0] || 'Account';

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const loggedInLinks = [
    ...links,
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const activeLinks = isAuthenticated ? loggedInLinks : links;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-[#0B0F1A]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0B0F1A]/60">
      <div className="container flex h-20 items-center mx-auto px-6 md:px-12 justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-bp flex items-center justify-center shadow-glow"
            >
              <span className="font-bold text-white text-xl">X</span>
            </motion.div>
            <span className="font-bold text-2xl tracking-tight text-white group-hover:text-primary-cyan transition-colors">EcomX</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 relative">
            {activeLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`relative text-sm font-medium transition-colors hover:text-white pb-1 ${
                  location.pathname === link.path ? 'text-white' : 'text-foreground-secondary'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-sm font-semibold text-foreground-secondary hover:text-white transition-colors">Log in</Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register" className="btn-primary">Sign up</Link>
              </motion.div>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-border bg-muted/50 hover:bg-muted transition-colors pr-3 overflow-hidden"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-bp flex items-center justify-center overflow-hidden">
                  {user?.image ? (
                    <img 
                      src={user.image} 
                      alt="Profile" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.onerror = null; // prevents looping
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0B0F1A&color=fff&bold=true`;
                      }}
                    />
                  ) : (
                    <span className="text-xs font-bold text-white">{displayName[0]?.toUpperCase()}</span>
                  )}
                </div>
                <span className="text-sm font-medium">{displayName}</span>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-[#111827] border border-border rounded-xl shadow-xl z-20 overflow-hidden"
                    >
                      <div className="p-3 border-b border-border bg-muted/30">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Account</p>
                      </div>
                      <div className="py-1">
                        <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground-secondary hover:bg-muted hover:text-white transition-colors">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground-secondary hover:bg-muted hover:text-white transition-colors">
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                        <button 
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Log out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-[#111827]/95 backdrop-blur-xl border-b border-border shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
               {activeLinks.map(link => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground-secondary hover:text-white"
                  >
                    {link.name}
                  </Link>
               ))}
               <div className="h-px w-full bg-border my-2" />
               {!isAuthenticated ? (
                 <>
                   <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-medium text-white">Log in</Link>
                   <Link to="/register" onClick={() => setIsOpen(false)} className="btn-primary w-full mt-2 text-center">Sign up</Link>
                 </>
               ) : (
                 <>
                   <div className="flex items-center gap-3 mb-2">
                     <div className="w-10 h-10 rounded-full bg-gradient-bp flex items-center justify-center overflow-hidden">
                       {user?.image ? (
                         <img 
                           src={user.image} 
                           alt="Profile" 
                           className="w-full h-full object-cover" 
                           onError={(e) => {
                             e.currentTarget.onerror = null;
                             e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0B0F1A&color=fff&bold=true`;
                           }}
                         />
                       ) : (
                         <span className="text-sm font-bold text-white">{displayName[0]?.toUpperCase()}</span>
                       )}
                     </div>
                     <div>
                       <p className="font-bold text-white">{displayName}</p>
                       <p className="text-xs text-muted-foreground">{user?.email}</p>
                     </div>
                   </div>
                   <button 
                     onClick={() => {
                       logout();
                       setIsOpen(false);
                     }} 
                     className="flex items-center gap-2 text-lg font-medium text-red-400"
                   >
                     <LogOut className="w-5 h-5" /> Log out
                   </button>
                 </>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}