import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useFirebaseAuthStore } from '../store/useFirebaseAuthStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authUser, loading, initialized } = useFirebaseAuthStore();

  // 초기화되지 않았거나 로딩 중일 때는 로딩 표시
  if (!initialized || loading) {
    return <div className='loading'>로딩 중...</div>;
  }

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!authUser) {
    return <Navigate to='/login' replace />;
  }

  // 로그인한 사용자는 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
