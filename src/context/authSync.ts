import type { User } from 'firebase/auth';
import api from '../api/axios';

type SyncUser = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
};

type SetAuth = (user: SyncUser, token: string) => void;

const normalizeRole = (role?: string): 'user' | 'admin' => (String(role || '').toLowerCase() === 'admin' ? 'admin' : 'user');

const buildAvatarUrl = (name?: string, email?: string, photoURL?: string) => {
  if (photoURL) return photoURL;

  const seed = encodeURIComponent((name || email || 'User').trim());
  return `https://ui-avatars.com/api/?name=${seed}&background=0B0F1A&color=fff&bold=true`;
};

export async function syncFirebaseUser(user: User, setAuth: SetAuth, fallbackToken?: string) {
  const idToken = fallbackToken || (await user.getIdToken());

  try {
    let syncResponse;

    try {
      syncResponse = await api.post('/api/auth/login', {
        email: user.email,
        password: 'firebase-auth-social',
        firebaseUid: user.uid,
      });
    } catch (error: unknown) {
      const loginError = error as { response?: { status?: number; data?: { message?: string } } };
      const status = loginError.response?.status;
      const message = String(loginError.response?.data?.message || '').toLowerCase();

      if (status === 404 || status === 401 || message.includes('not found')) {
        syncResponse = await api.post('/api/auth/register', {
          name: user.displayName || 'Google User',
          email: user.email,
          password: 'firebase-auth-social',
          firebaseUid: user.uid,
          role: 'user',
        });
      } else {
        throw error;
      }
    }

    const userData = syncResponse.data;
    setAuth(
      {
        _id: userData._id || user.uid,
        name: userData.name || user.displayName || 'User',
        email: userData.email || user.email || '',
        role: normalizeRole(userData.role),
        image: buildAvatarUrl(userData.name || user.displayName || 'User', userData.email || user.email || '', user.photoURL || undefined),
      },
      userData.token || idToken,
    );
  } catch {
    setAuth(
      {
        _id: user.uid,
        name: user.displayName || 'Firebase User',
        email: user.email || '',
        role: 'user',
        image: buildAvatarUrl(user.displayName || 'Firebase User', user.email || '', user.photoURL || undefined),
      },
      idToken,
    );
  }
}