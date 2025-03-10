import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useAuthStore();
  console.log(currentUser);

  return (
    <div className='container profile-container'>
      <h1>프로필 페이지</h1>
      <p>이 페이지는 로그인한 사용자만 볼 수 있습니다.</p>

      {currentUser && (
        <div className='profile-details'>
          <h2>{currentUser.displayName || '사용자'}</h2>
          {currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              alt='프로필 사진'
              className='profile-image-large'
            />
          )}
          <div className='profile-info-detailed'>
            <p>
              <strong>이메일:</strong> {currentUser.email}
            </p>
            <p>
              <strong>UID:</strong> {currentUser.uid}
            </p>
            <p>
              <strong>이메일 인증:</strong>{' '}
              {currentUser.emailVerified ? '완료' : '미완료'}
            </p>
            <p>
              <strong>계정 생성일:</strong> {currentUser.metadata.creationTime}
            </p>
            <p>
              <strong>마지막 로그인:</strong>{' '}
              {currentUser.metadata.lastSignInTime}
            </p>
          </div>
        </div>
      )}

      <div className='navigation-links'>
        <Link to='/' className='btn btn-back'>
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Profile;
