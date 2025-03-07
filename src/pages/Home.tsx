import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const Home = () => {
  const { currentUser, signOut } = useAuthStore();

  return (
    <div className="container">
      <h1>홈 페이지</h1>
      
      {currentUser ? (
        <div>
          <p>환영합니다, {currentUser.displayName || currentUser.email}님!</p>
          <div className="profile-info">
            {currentUser.photoURL && (
              <img 
                src={currentUser.photoURL} 
                alt="프로필 사진" 
                className="profile-image" 
              />
            )}
            <div>
              <p>이메일: {currentUser.email}</p>
              <p>계정 생성일: {currentUser.metadata.creationTime}</p>
            </div>
          </div>
          <button onClick={signOut} className="btn btn-logout">
            로그아웃
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p>로그인이 필요합니다.</p>
          <Link to="/login" className="btn btn-login">
            로그인 페이지로 이동
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home; 