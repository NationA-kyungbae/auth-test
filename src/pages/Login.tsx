import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const { signInWithGoogle } = useAuthStore();

  return (
    <div className='container'>
      <div className='login-container'>
        <h1>로그인</h1>
        <div className='login-options'>
          <button
            onClick={() => signInWithGoogle('google')}
            className='btn btn-google'
          >
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
