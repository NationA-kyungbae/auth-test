import { useFirebaseAuthStore } from '../store/useFirebaseAuthStore';
import { Link } from 'react-router-dom';

const Home = () => {
  const { authUser, signOut } = useFirebaseAuthStore();

  return (
    <div className='container'>
      <h1>홈 페이지</h1>

      {authUser ? (
        <div>
          <p>환영합니다, {authUser.displayName || authUser.email}님!</p>
          <div className='profile-info'>
            {authUser.photoURL && (
              <img
                src={authUser.photoURL}
                alt='프로필 사진'
                className='profile-image'
              />
            )}
            <div>
              <p>이메일: {authUser.email}</p>
              <p>계정 생성일: {authUser.metadata.creationTime}</p>
            </div>
          </div>
          <button onClick={signOut} className='btn btn-logout'>
            로그아웃
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p>로그인이 필요합니다.</p>
          <Link to='/login' className='btn btn-login'>
            로그인 페이지로 이동
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
