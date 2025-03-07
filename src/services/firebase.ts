// Firebase 설정 파일
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase 설정 정보
// 실제 프로젝트에서는 환경 변수를 사용하는 것이 좋습니다
const firebaseConfig = {
  apiKey: "AIzaSyClteaEGIK0uMAuO3Eenolg5SZO6NuAvio",
  authDomain: "auth-test-1e84a.firebaseapp.com",
  projectId: "auth-test-1e84a",
  storageBucket: "auth-test-1e84a.firebasestorage.app",
  messagingSenderId: "422648395130",
  appId: "1:422648395130:web:43adc2084d9e5fe32b12c3"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider }; 