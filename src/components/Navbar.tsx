import { Link } from 'react-router-dom';
import { useFirebaseAuthStore } from '../store/useFirebaseAuthStore';

const Navbar = () => {
  const { authUser, signOut } = useFirebaseAuthStore();

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link to='/'>Firebase 인증 테스트</Link>
      </div>
      <div className='navbar-menu'>
        <Link to='/' className='navbar-item'>
          홈
        </Link>

        {authUser ? (
          <>
            <Link to='/profile' className='navbar-item'>
              프로필
            </Link>
            <button onClick={signOut} className='navbar-item btn-link'>
              로그아웃
            </button>
            <div className='navbar-user'>
              {authUser.photoURL && (
                <img
                  src={authUser.photoURL}
                  alt='프로필'
                  className='navbar-avatar'
                />
              )}
              <span>{authUser.displayName || authUser.email}</span>
            </div>
          </>
        ) : (
          <Link to='/login' className='navbar-item'>
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
