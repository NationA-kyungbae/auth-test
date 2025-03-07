import { create } from 'zustand';
import { 
  User, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithRedirect
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

// 인증 스토어 상태 타입 정의
interface AuthState {
  currentUser: User | null;
  loading: boolean;
  initialized: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
}

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
  signInWithGoogle: async () => {
    try {
      set({ loading: true });
      await signInWithRedirect(auth, googleProvider);
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
  }
}));

// Firebase 인증 상태 변경 감지 초기화 함수
export const initializeAuthListener = () => {
  const { setUser, setLoading, setInitialized } = useAuthStore.getState();
  
  // 인증 상태 변경 감지
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
    setInitialized(true);
  });
  
  return unsubscribe;
}; 