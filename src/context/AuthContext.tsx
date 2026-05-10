import React, { useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  type User
} from 'firebase/auth';
import { auth, googleProvider } from '../api/firebase';
import { useAuthStore } from '../store/authStore';
import { AuthContext } from './authContext';
import { syncFirebaseUser } from './authSync';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { setAuth, logout: clearAuth } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          await syncFirebaseUser(user, setAuth);
        } catch (error) {
          console.error("Error syncing Firebase user:", error);
        }
      } else {
        clearAuth();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setAuth, clearAuth]);

  const login = async (email:string, password:string) => {
    // Demo bypass logic
    if (email === 'admin@example.com' && password === '123456') {
      setAuth({
        _id: 'demo-admin-id',
        name: 'Demo Admin',
        email: 'admin@example.com',
        role: 'admin',
        image: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
      }, 'demo-admin-token');
      return;
    }
    
    if (email === 'user@example.com' && password === '123456') {
      setAuth({
        _id: 'demo-user-id',
        name: 'Demo User',
        email: 'user@example.com',
        role: 'user',
        image: 'https://ui-avatars.com/api/?name=Demo+User&background=7F9CF5&color=fff'
      }, 'demo-user-token');
      return;
    }

    const credential = await signInWithEmailAndPassword(auth, email, password);
    await syncFirebaseUser(credential.user, setAuth);
  };
  
  const signup = async (email:string, password:string, name:string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name });
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      if (user) {
        await syncFirebaseUser(user, setAuth);
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    signOut(auth);
    clearAuth();
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    googleLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
