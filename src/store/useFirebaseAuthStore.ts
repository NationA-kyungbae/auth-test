import { useEffect } from 'react';
import {
  User,
  signOut as firebaseSignOut,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  updateEmail,
} from 'firebase/auth';
import { create } from 'zustand';
import { auth, providers, FBProviders } from '../services/firebase';

interface AuthState {
  authUser: User | null;
  loading: boolean;
  initialized: boolean;
  signInWithGoogle: (provider: FBProviders) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

const env = import.meta.env.MODE;

export const useFirebaseAuthStore = create<AuthState>((set) => ({
  authUser: null,
  loading: true,
  initialized: false,

  // 사용자 설정 함수
  setUser: (user) => set({ authUser: user }),

  // 로딩 상태 설정 함수
  setLoading: (loading) => set({ loading }),

  // 초기화 상태 설정 함수
  setInitialized: (initialized) => set({ initialized }),

  // 구글 로그인 함수
  signInWithGoogle: async (provider) => {
    try {
      set({ loading: true });

      if (env === 'development') {
        const { user } = await signInWithPopup(auth, providers[provider]);
        if (!user) return;
        set({ authUser: user });
        const providerData = user.providerData[0];
        if (providerData && providerData.email && !user.email) {
          await updateEmail(user, providerData.email);
        }
      } else {
        await signInWithRedirect(auth, providers[provider]);
      }
    } catch (error) {
      console.error('Google 로그인 에러:', error);
    } finally {
      set({ loading: false });
    }
  },

  // 로그아웃 함수
  signOut: async () => {
    try {
      set({ loading: true });
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('로그아웃 에러:', error);
    } finally {
      set({ loading: false });
    }
  },

  // 리다이렉트 결과 가져오기
  getRedirectResult: async () => {
    const user = await getRedirectResult(auth);
    if (!user?.user) return;
    const providerData = user.user.providerData[0];
    if (providerData && providerData.email && !user.user.email) {
      await updateEmail(user.user, providerData.email);
    }
    set({ authUser: user.user });
  },
}));

// Firebase 인증 상태 변경 감지 초기화 함수
export const useInitializeAuthListener = () => {
  const { setUser, setLoading, setInitialized } =
    useFirebaseAuthStore.getState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setInitialized(true);
      console.log('user', user);
    });
    return () => unsubscribe();
  }, []);
};

export default useFirebaseAuthStore;
