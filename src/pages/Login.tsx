import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { getRedirectResult } from 'firebase/auth';
import { auth } from '../services/firebase';

const Login = () => {
  const { currentUser, signInWithGoogle } = useAuthStore();
  const navigate = useNavigate();

  // 이미 로그인한 사용자는 홈으로 리다이렉트
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // 로그인 성공
          const user = result.user;
          navigate('/');
          console.log('로그인 성공:', user);
        }
      })
      .catch((error) => {
        // 오류 처리
        console.error('로그인 오류:', error);
      });
  }, [currentUser, navigate]);

  return (
    <div className='container'>
      <div className='login-container'>
        <h1>로그인</h1>
        <div className='login-options'>
          <button onClick={signInWithGoogle} className='btn btn-google'>
            Google로 로그인
          </button>
        </div>
        <div className='login-footer'>
          <Link to='/' className='btn btn-back'>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
