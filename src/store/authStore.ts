import { create } from 'zustand';
import {
  User,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { useEffect } from 'react';

// 인증 스토어 상태 타입 정의
interface AuthState {
  currentUser: User | null;
  loading: boolean;
  initialized: boolean;
  signInWithGoogle: (
    provider: 'google' | 'apple' | 'facebook',
  ) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

const env = import.meta.env.MODE;

// Zustand 스토어 생성
export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  loading: true,
  initialized: false,

  // 사용자 설정 함수
  setUser: (user) => set({ currentUser: user }),

  // 로딩 상태 설정 함수
  setLoading: (loading) => set({ loading }),

  // 초기화 상태 설정 함수
  setInitialized: (initialized) => set({ initialized }),

  // 구글 로그인 함수
  signInWithGoogle: async (provider) => {
    try {
      set({ loading: true });
      const providers = {
        google: googleProvider,
        apple: googleProvider,
        facebook: googleProvider,
      };
      if (env === 'development') {
        await signInWithPopup(auth, providers[provider]);
        // if (user) {
        //   if (user) {
        //     const providerData = user.providerData[0];
        //     // providerData에서 이메일을 가져와 사용자 이메일 업데이트
        //     if (providerData && providerData.email && !user.email) {
        //       await updateEmail(user, providerData.email);
        //     }
        //   }
        // }
      } else {
        await signInWithRedirect(auth, providers[provider]);
        // const user = await getRedirectResult(auth);
        // if (user?.user) {
        //   const providerData = user.user.providerData[0];
        //   if (providerData && providerData.email && !user.user.email) {
        //     console.log('providerData', providerData);
        //     await updateEmail(user.user, providerData.email);
        //   }
        // }
      }

      console.log({ env: env, status: 'success' });
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
}));

// Firebase 인증 상태 변경 감지 초기화 함수
export const useInitializeAuthListener = () => {
  const { setUser, setLoading, setInitialized } = useAuthStore.getState();

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
