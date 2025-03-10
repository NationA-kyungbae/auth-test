import { useFirebaseAuthStore } from '../store/useFirebaseAuthStore';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { authUser } = useFirebaseAuthStore();
  console.log(authUser);

  return (
    <div className='container profile-container'>
      <h1>프로필 페이지</h1>
      <p>이 페이지는 로그인한 사용자만 볼 수 있습니다.</p>

      {authUser && (
        <div className='profile-details'>
          <h2>{authUser.displayName || '사용자'}</h2>
          {authUser.photoURL && (
            <img
              src={authUser.photoURL}
              alt='프로필 사진'
              className='profile-image-large'
            />
          )}
          <div className='profile-info-detailed'>
            <p>
              <strong>이메일:</strong> {authUser.email}
            </p>
            <p>
              <strong>UID:</strong> {authUser.uid}
            </p>
            <p>
              <strong>이메일 인증:</strong>{' '}
              {authUser.emailVerified ? '완료' : '미완료'}
            </p>
            <p>
              <strong>계정 생성일:</strong> {authUser.metadata.creationTime}
            </p>
            <p>
              <strong>마지막 로그인:</strong> {authUser.metadata.lastSignInTime}
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
