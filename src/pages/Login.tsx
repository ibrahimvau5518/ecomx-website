import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      setSuccess('Logging in successfully...');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await googleLogin();
      // AuthContext will handle the backend sync, then we navigate
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    }
  };

  const handleDemoLogin = (role: 'user' | 'admin') => {
    const demoEmail = role === 'user' ? 'user@example.com' : 'admin@example.com';
    const demoPassword = '123456';
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    // Auto-submit after setting state
    setTimeout(() => {
      const loginButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
      loginButton?.click();
    }, 100);
  };

  return (
    <div className="section-padding bg-muted/20 min-h-screen flex items-center justify-center">
      <div className="card-container max-w-md w-full p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8">Login to your EcomX account</p>

        {error && <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-md border border-red-200">{error}</div>}
        {success && <div className="p-3 mb-4 text-sm text-green-600 bg-green-100 rounded-md border border-green-200">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary w-full h-12 text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full h-12 flex items-center justify-center gap-2 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          Sign in with Google
        </button>
        <div className="my-6 flex items-center gap-4 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-sm text-muted-foreground">OR DEMO</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button onClick={() => handleDemoLogin('user')} className="btn-outline text-xs">
            User Demo
          </button>
          <button onClick={() => handleDemoLogin('admin')} className="btn-outline text-xs">
            Admin Demo
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account? <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>
      </div>
    </div>
  );
}