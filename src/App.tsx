import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import {
  useFirebaseAuthStore,
  useInitializeAuthListener,
} from './store/useFirebaseAuthStore';
import { useEffect } from 'react';

function App() {
  const { authUser, initialized } = useFirebaseAuthStore();
  useInitializeAuthListener();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [authUser]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className='app'>
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <footer className='footer'>
        <p>Firebase 인증 테스트 앱 &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
